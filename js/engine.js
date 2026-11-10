// Scoring, wheel placement and report assembly for the Boussole des Énergies
// Jungiennes. No profile text lives here: the report text comes from
// window.JungTexts (texts/profile-texts.fr.js, or js/texts-fallback.js).

const APP_NAME = "Boussole des Énergies Jungiennes";
const ENERGY_ORDER = ["blue", "green", "yellow", "red"];
const RANK_ORDER = [4, 3, 2, 1];
const QUESTIONS_PER_BLOCK = 18;
const QUESTION_LAYOUTS = [
  ["blue", "yellow", "green", "red"],
  ["green", "red", "yellow", "blue"],
  ["red", "blue", "green", "yellow"],
  ["yellow", "green", "red", "blue"],
  ["blue", "green", "red", "yellow"],
  ["yellow", "red", "blue", "green"]
];

const ENERGY_LIBRARY = {
  blue: { key: "blue", label: "Bleu", emoji: "🔵", color: "#2f69c9", keyword: "Analyse" },
  green: { key: "green", label: "Vert", emoji: "🟢", color: "#4c8a5a", keyword: "Soutien" },
  yellow: { key: "yellow", label: "Jaune", emoji: "🟡", color: "#dca42c", keyword: "Expression" },
  red: { key: "red", label: "Rouge", emoji: "🔴", color: "#c34a2c", keyword: "Décision" }
};

// The eight types, clockwise from the top of the wheel. Each type covers 45°.
// Mixed types (two colours) have two regular half-positions plus two
// "créatif" positions on their outer edges; pure types have two half-positions.
// `numbers` = the outer-ring position numbers [leaning to previous type,
// leaning to next type]; the classique ring adds 20, the accommodant ring 40,
// and créatif positions add 100.
const TYPE_ORDER = [
  "reformateur",
  "directeur",
  "motivateur",
  "inspirateur",
  "conseiller",
  "supporteur",
  "coordinateur",
  "observateur"
];

const TYPE_LIBRARY = {
  reformateur: { label: "Réformateur", colours: ["blue", "red"], jung: "Pensée", numbers: [16, 1], bandFill: "#7764c4", labelColor: "#ffffff" },
  directeur: { label: "Directeur", colours: ["red"], jung: "Pensée extravertie", numbers: [2, 3], bandFill: "#c34a2c", labelColor: "#ffffff" },
  motivateur: { label: "Motivateur", colours: ["red", "yellow"], jung: "Intuition", numbers: [4, 5], bandFill: "#ef8a2f", labelColor: "#1f1a14" },
  inspirateur: { label: "Inspirateur", colours: ["yellow"], jung: "Sentiment extraverti", numbers: [6, 7], bandFill: "#dca42c", labelColor: "#1f1a14" },
  conseiller: { label: "Conseiller", colours: ["yellow", "green"], jung: "Sentiment", numbers: [8, 9], bandFill: "#a9cc45", labelColor: "#1f1a14" },
  supporteur: { label: "Supporteur", colours: ["green"], jung: "Sentiment introverti", numbers: [10, 11], bandFill: "#4c8a5a", labelColor: "#ffffff" },
  coordinateur: { label: "Coordinateur", colours: ["green", "blue"], jung: "Sensation", numbers: [12, 13], bandFill: "#2f9faa", labelColor: "#1f1a14" },
  observateur: { label: "Observateur", colours: ["blue"], jung: "Pensée introvertie", numbers: [14, 15], bandFill: "#2f69c9", labelColor: "#ffffff" }
};

TYPE_ORDER.forEach((key, index) => {
  TYPE_LIBRARY[key].key = key;
  TYPE_LIBRARY[key].index = index;
  TYPE_LIBRARY[key].centerAngle = index * 45;
  TYPE_LIBRARY[key].mixed = TYPE_LIBRARY[key].colours.length === 2;
});

// Rings, from the centre outwards. Intensity = length of the profile vector
// on the 0–6 scale. Thresholds calibrated on one PDF report (length 3,64 =
// Classique); revisit them when more reports are available.
const RINGS = [
  { key: "accommodant", label: "Accommodant", offset: 40, minLength: 0 },
  { key: "classique", label: "Classique", offset: 20, minLength: 2 },
  { key: "focalise", label: "Focalisé", offset: 0, minLength: 5 }
];

const WHEEL_LAYOUT = {
  center: 200,
  hubColorRadius: 22,
  hubShellRadius: 36,
  ringBounds: [44, 84, 124, 164],
  ringCenters: [64, 104, 144],
  outerRadius: 164,
  bandInnerRadius: 170,
  bandOuterRadius: 198,
  labelRadius: 184
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toSentence(items) {
  if (items.length === 0) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function roundTo(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function roundPercent(value) {
  return roundTo(value, 1);
}

function hasFiniteNumber(value) {
  return value !== null && value !== "" && Number.isFinite(Number(value));
}

function markerTextColor(colorKey) {
  return colorKey === "yellow" ? "#3b2d0d" : "#ffffff";
}

function neighbourType(typeKey, step) {
  const index = TYPE_LIBRARY[typeKey].index;
  return TYPE_ORDER[(index + step + 8) % 8];
}

function getOppositeType(typeKey) {
  return TYPE_LIBRARY[neighbourType(typeKey, 4)];
}

// The colour that tells a neighbour apart from the current type: for a pure
// type next to a mixed one, the mixed type's other colour; for a mixed type
// next to a pure one, the pure colour itself.
function distinguishingColour(typeKey, otherKey) {
  const own = TYPE_LIBRARY[typeKey].colours;
  const other = TYPE_LIBRARY[otherKey].colours;
  return other.find((colour) => !own.includes(colour)) || other[0];
}

function normaliseAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

// Places a 0–6 colour profile on the 72-position wheel.
// Direction: extraversion (red + yellow) against introversion (blue + green)
// on the horizontal axis, thinking (blue + red) against feeling (green +
// yellow) on the vertical axis. The main type comes from that direction; the
// half-type from the stronger of the two neighbouring colours; the ring from
// the vector's length.
function resolvePosition(scores) {
  const x = (scores.red + scores.yellow) - (scores.blue + scores.green);
  const y = (scores.blue + scores.red) - (scores.green + scores.yellow);
  const length = Math.hypot(x, y);
  const angle = length < 1e-9 ? 0 : normaliseAngle(Math.atan2(x, y) * 180 / Math.PI);

  const typeIndex = Math.round(angle / 45) % 8;
  const typeKey = TYPE_ORDER[typeIndex];
  const type = TYPE_LIBRARY[typeKey];
  let offset = angle - type.centerAngle;
  if (offset > 180) offset -= 360;
  if (offset < -180) offset += 360;

  const previousKey = neighbourType(typeKey, -1);
  const nextKey = neighbourType(typeKey, 1);
  const previousStrength = scores[distinguishingColour(typeKey, previousKey)];
  const nextStrength = scores[distinguishingColour(typeKey, nextKey)];
  let side;
  if (Math.abs(previousStrength - nextStrength) > 1e-9) {
    side = nextStrength > previousStrength ? 1 : 0;
  } else {
    side = offset >= 0 ? 1 : 0;
  }
  const leanKey = side === 1 ? nextKey : previousKey;
  const creative = type.mixed && Math.abs(offset) > 11.25;

  let ring = RINGS[0];
  RINGS.forEach((candidate) => {
    if (length >= candidate.minLength) {
      ring = candidate;
    }
  });

  const position = type.numbers[side] + ring.offset + (creative ? 100 : 0);
  const halfLabel = `${type.label}/${TYPE_LIBRARY[leanKey].label.toLowerCase()}`;

  return {
    key: typeKey,
    lean: leanKey,
    label: halfLabel,
    typeLabel: type.label,
    shortLabel: type.label,
    jung: type.jung,
    ring: ring.key,
    ringLabel: creative ? "Créatif" : ring.label,
    creative,
    position,
    angle: roundTo(angle, 2),
    intensity: roundTo(length, 2)
  };
}

// Angular span and ring of a position number, for drawing.
function describePositionSlot(position) {
  const number = Math.round(Number(position));
  const creative = number > 100;
  const base = creative ? number - 100 : number;
  const ringIndex = base > 40 ? 0 : base > 20 ? 1 : 2;
  const outerNumber = base - (ringIndex === 0 ? 40 : ringIndex === 1 ? 20 : 0);

  const typeKey = TYPE_ORDER.find((key) => TYPE_LIBRARY[key].numbers.includes(outerNumber));
  if (!typeKey) {
    return null;
  }
  const type = TYPE_LIBRARY[typeKey];
  const side = type.numbers.indexOf(outerNumber);
  const c = type.centerAngle;
  let startAngle;
  let width;
  if (!type.mixed) {
    width = 22.5;
    startAngle = side === 0 ? c - 22.5 : c;
  } else {
    width = 11.25;
    if (creative) {
      startAngle = side === 0 ? c - 22.5 : c + 11.25;
    } else {
      startAngle = side === 0 ? c - 11.25 : c;
    }
  }
  return { typeKey, ringIndex, startAngle, endAngle: startAngle + width, creative };
}

function listAllPositions() {
  const positions = [];
  TYPE_ORDER.forEach((key) => {
    const type = TYPE_LIBRARY[key];
    [0, 20, 40].forEach((ringOffset) => {
      type.numbers.forEach((number) => {
        positions.push(number + ringOffset);
        if (type.mixed) {
          positions.push(100 + number + ringOffset);
        }
      });
    });
  });
  return positions;
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const radians = (angleInDegrees - 90) * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function positionToPoint(position) {
  const slot = describePositionSlot(position);
  if (!slot) {
    return { x: WHEEL_LAYOUT.center, y: WHEEL_LAYOUT.center };
  }
  const angle = (slot.startAngle + slot.endAngle) / 2;
  return polarToCartesian(WHEEL_LAYOUT.center, WHEEL_LAYOUT.center, WHEEL_LAYOUT.ringCenters[slot.ringIndex], angle);
}

// Raw totals run from 18 (always ranked 1) to 72 (always ranked 4) per
// colour; (raw - 18) / 9 maps that to 0–6, and the four scores add up to 12.
function rawToScore(raw) {
  return roundTo(clamp((raw - QUESTIONS_PER_BLOCK) / 9, 0, 6), 2);
}

function rankColours(values) {
  return [...ENERGY_ORDER].sort((left, right) => {
    if (values[right] === values[left]) {
      return ENERGY_ORDER.indexOf(left) - ENERGY_ORDER.indexOf(right);
    }
    return values[right] - values[left];
  });
}

function buildScoreProfile(scores) {
  const total = ENERGY_ORDER.reduce((sum, colour) => sum + scores[colour], 0) || 1;
  const shares = Object.fromEntries(
    ENERGY_ORDER.map((colour) => [colour, (scores[colour] / total) * 100])
  );
  const percentages = Object.fromEntries(
    ENERGY_ORDER.map((colour) => [colour, roundPercent(shares[colour])])
  );
  const outOfSix = Object.fromEntries(
    ENERGY_ORDER.map((colour) => [colour, Math.round((scores[colour] / 6) * 100)])
  );
  const ordered = rankColours(scores);
  return {
    scores,
    shares,
    percentages,
    outOfSix,
    dominant: ordered[0],
    secondary: ordered[1],
    tertiary: ordered[2],
    archetype: resolvePosition(scores)
  };
}

function resolveBlockScores(questionBank, answers, block) {
  const raw = { blue: 0, green: 0, yellow: 0, red: 0 };
  questionBank
    .filter((question) => question.block === block)
    .forEach((question) => {
      const ranks = answers[question.id];
      question.options.forEach((option, optionIndex) => {
        raw[option.color] += ranks[optionIndex];
      });
    });

  const scores = Object.fromEntries(ENERGY_ORDER.map((colour) => [colour, rawToScore(raw[colour])]));
  return { raw, ...buildScoreProfile(scores) };
}

function buildCompassSlices(point, radius, opacity = 1) {
  return [
    { key: "blue", path: describePieSlice(point.x, point.y, radius, 270, 360), fill: ENERGY_LIBRARY.blue.color, opacity },
    { key: "red", path: describePieSlice(point.x, point.y, radius, 0, 90), fill: ENERGY_LIBRARY.red.color, opacity },
    { key: "yellow", path: describePieSlice(point.x, point.y, radius, 90, 180), fill: ENERGY_LIBRARY.yellow.color, opacity },
    { key: "green", path: describePieSlice(point.x, point.y, radius, 180, 270), fill: ENERGY_LIBRARY.green.color, opacity }
  ];
}

function buildWheelBaseGeometry() {
  const c = WHEEL_LAYOUT.center;
  const segments = TYPE_ORDER.map((key) => {
    const type = TYPE_LIBRARY[key];
    const startAngle = type.centerAngle - 22.5;
    const endAngle = type.centerAngle + 22.5;
    const reverseLabel = type.centerAngle > 90 && type.centerAngle < 270;
    return {
      key,
      shortLabel: type.label.toUpperCase(),
      fullLabel: `${type.label} · ${type.jung}`,
      bandFill: type.bandFill,
      labelColor: type.labelColor,
      bandPath: describeArc(c, c, WHEEL_LAYOUT.bandInnerRadius, WHEEL_LAYOUT.bandOuterRadius, startAngle + 0.8, endAngle - 0.8),
      labelPath: describeOpenArc(c, c, WHEEL_LAYOUT.labelRadius, startAngle + 2, endAngle - 2, reverseLabel),
      centerAngle: type.centerAngle,
      startAngle,
      endAngle
    };
  });

  const cells = [];
  const positionLabels = [];
  listAllPositions().forEach((position) => {
    const slot = describePositionSlot(position);
    const innerRadius = WHEEL_LAYOUT.ringBounds[slot.ringIndex];
    const outerRadius = WHEEL_LAYOUT.ringBounds[slot.ringIndex + 1];
    const point = positionToPoint(position);
    cells.push({
      key: `cell-${position}`,
      position,
      path: describeArc(c, c, innerRadius, outerRadius, slot.startAngle + 0.4, slot.endAngle - 0.4),
      fill: slot.creative ? "#e6e1f2" : (TYPE_LIBRARY[slot.typeKey].index + slot.ringIndex) % 2 === 0 ? "#f4f5f7" : "#d6dae0"
    });
    positionLabels.push({ key: `position-${position}`, position, x: point.x, y: point.y, small: slot.creative || slot.ringIndex === 0 });
  });

  const segmentLines = [];
  const subdivisionLines = [];
  const guideLines = [];
  TYPE_ORDER.forEach((key) => {
    const type = TYPE_LIBRARY[key];
    segmentLines.push({ key: `segment-line-${key}`, ...buildPolarLine(type.centerAngle - 22.5, WHEEL_LAYOUT.hubShellRadius, WHEEL_LAYOUT.outerRadius) });
    guideLines.push({ key: `guide-${key}`, ...buildPolarLine(type.centerAngle, WHEEL_LAYOUT.hubShellRadius, WHEEL_LAYOUT.outerRadius) });
    if (type.mixed) {
      [-11.25, 11.25].forEach((delta) => {
        subdivisionLines.push({ key: `subdivision-${key}-${delta}`, ...buildPolarLine(type.centerAngle + delta, WHEEL_LAYOUT.ringBounds[0], WHEEL_LAYOUT.outerRadius) });
      });
    }
  });

  const hubCrossLines = [
    { key: "hub-cross-horizontal", x1: c - WHEEL_LAYOUT.hubColorRadius, y1: c, x2: c + WHEEL_LAYOUT.hubColorRadius, y2: c },
    { key: "hub-cross-vertical", x1: c, y1: c - WHEEL_LAYOUT.hubColorRadius, x2: c, y2: c + WHEEL_LAYOUT.hubColorRadius }
  ];

  return {
    center: c,
    outerRadius: WHEEL_LAYOUT.outerRadius,
    hubShellRadius: WHEEL_LAYOUT.hubShellRadius,
    hubColorRadius: WHEEL_LAYOUT.hubColorRadius,
    ringCircles: [...WHEEL_LAYOUT.ringBounds],
    segments,
    cells,
    positionLabels,
    segmentLines,
    subdivisionLines,
    guideLines,
    hubSlices: buildCompassSlices({ x: c, y: c }, WHEEL_LAYOUT.hubColorRadius),
    hubCrossLines
  };
}

const PUBLIC_WORD_POOLS = {
  blue: ["Analytique", "Méthodique", "Rigoureux", "Précis", "Structuré", "Réfléchi", "Prudent", "Formel", "Concentré", "Factuel", "Logique", "Organisé", "Mesuré", "Discipliné", "Fiable", "Observateur", "Technique", "Contrôlé"],
  green: ["Attentionné", "Patient", "Calme", "Coopératif", "Loyal", "Diplomate", "Bienveillant", "Stable", "Disponible", "Chaleureux", "Prévenant", "Soutenant", "Constant", "Empathique", "Serviable", "À l’écoute", "Tolérant", "Apaisant"],
  yellow: ["Enthousiaste", "Expressif", "Créatif", "Sociable", "Spontané", "Inspirant", "Optimiste", "Vivant", "Curieux", "Imaginatif", "Ouvert", "Bavard", "Dynamique", "Aventurier", "Rayonnant", "Flexible", "Amusant", "Chaleureux"],
  red: ["Décidé", "Direct", "Exigeant", "Rapide", "Ambitieux", "Ferme", "Courageux", "Compétitif", "Orienté résultats", "Tranchant", "Entrepreneur", "Impatient", "Assertif", "Volontaire", "Audacieux", "Persuasif", "Énergique", "Résolu"]
};

const PRIVATE_WORD_POOLS = {
  blue: ["Réservé", "Critique", "Perfectionniste", "Vigilant", "Distant", "Exigeant sur la qualité", "Sceptique", "Cérébral", "Contrôlé", "Minutieux", "Silencieux", "Sélectif", "Rationnel", "Stable", "Prévisible", "Discret", "Formel", "Inflexible"],
  green: ["Protecteur", "Conciliant", "Modeste", "Patient", "Fidèle", "Sensible", "Rassurant", "Effacé", "Compréhensif", "Accommodant", "Constant", "Pacifique", "Tolérant", "Attaché aux autres", "Prévisible", "Attentionné", "Soutien discret", "Précautionneux"],
  yellow: ["Impulsif", "Volubile", "Rêveur", "Théâtral", "Enjoué", "Improvisateur", "Distrait", "Ludique", "Expressif", "Intuitif", "Séduisant", "Affectif", "Changeant", "Curieux", "Inspiré", "Bouillonnant", "Léger", "Extraverti"],
  red: ["Dur", "Pressant", "Dominant", "Intransigeant", "Urgent", "Confrontant", "Combatif", "Expéditif", "Autoritaire", "Franc", "Tranché", "Contrôlant", "Insistant", "Réactif", "Implacable", "Décisif", "Impérieux", "Brusque"]
};


// Each block contains 18 word sets with one option mapped to each color.
function buildQuestionBlock(block, startId, pools) {
  return Array.from({ length: 18 }, (_, index) => {
    const layout = QUESTION_LAYOUTS[index % QUESTION_LAYOUTS.length];
    return {
      id: startId + index,
      block,
      options: layout.map((color) => ({
        label: pools[color][index],
        color
      }))
    };
  });
}

function buildQuestionBank() {
  return [
    ...buildQuestionBlock("conscious", 1, PUBLIC_WORD_POOLS),
    ...buildQuestionBlock("lessConscious", 19, PRIVATE_WORD_POOLS)
  ];
}


function formatDateFr(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}


function fileNameToLabel(fileName) {
  const stem = String(fileName || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  return stem || "Profil importé";
}


function describeArc(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, startAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", startOuter.x, startOuter.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    "L", startInner.x, startInner.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 1, endInner.x, endInner.y,
    "Z"
  ].join(" ");
}

function describeOpenArc(cx, cy, radius, startAngle, endAngle, reverse = false) {
  const arcStart = reverse ? endAngle : startAngle;
  const arcEnd = reverse ? startAngle : endAngle;
  const start = polarToCartesian(cx, cy, radius, arcStart);
  const end = polarToCartesian(cx, cy, radius, arcEnd);
  const largeArcFlag = Math.abs(arcEnd - arcStart) > 180 ? 1 : 0;
  const sweepFlag = reverse ? 0 : 1;

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
  ].join(" ");
}

function describePieSlice(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const delta = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = delta > 180 ? 1 : 0;

  return [
    "M", cx, cy,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
    "Z"
  ].join(" ");
}


function buildPolarLine(angle, innerRadius, outerRadius) {
  const start = polarToCartesian(WHEEL_LAYOUT.center, WHEEL_LAYOUT.center, innerRadius, angle);
  const end = polarToCartesian(WHEEL_LAYOUT.center, WHEEL_LAYOUT.center, outerRadius, angle);
  return {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y
  };
}


function spreadPoint(point, index, total) {
  if (total <= 1) {
    return point;
  }

  const orbitRadius = total <= 3 ? 6 : total <= 6 ? 10 : 13;
  return polarToCartesian(point.x, point.y, orbitRadius, (index / total) * 360);
}

function buildImportedWheelMarkers(reports, block) {
  const groupedByPosition = new Map();

  reports.forEach((report, reportIndex) => {
    const profile = report[block];
    const position = Number(profile.archetype.position);
    const items = groupedByPosition.get(position) || [];
    items.push({ report, reportIndex, profile });
    groupedByPosition.set(position, items);
  });

  const markers = [];
  groupedByPosition.forEach((items, position) => {
    const basePoint = positionToPoint(position);

    items.forEach((item, itemIndex) => {
      const point = spreadPoint(basePoint, itemIndex, items.length);
      markers.push({
        key: `${item.report.id}-${block}`,
        index: item.reportIndex + 1,
        x: point.x,
        y: point.y,
        color: ENERGY_LIBRARY[item.profile.dominant].color,
        labelColor: markerTextColor(item.profile.dominant),
        title: `${item.report.fullName} · ${item.profile.archetype.label} · position ${item.profile.archetype.position}`
      });
    });
  });

  return markers.sort((left, right) => left.index - right.index);
}

function resolveMostCommonArchetype(reports, block) {
  if (reports.length === 0) {
    return null;
  }

  const counts = new Map();
  reports.forEach((report) => {
    const label = report[block].archetype.label;
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  let bestLabel = null;
  let bestCount = 0;
  counts.forEach((count, label) => {
    if (count > bestCount) {
      bestLabel = label;
      bestCount = count;
    }
  });

  return bestLabel ? { label: bestLabel, count: bestCount } : null;
}


function resolveShift(consciousPercentages, lessConsciousPercentages) {
  const shiftValue = roundPercent(
    ENERGY_ORDER.reduce((sum, color) => {
      return sum + Math.abs(consciousPercentages[color] - lessConsciousPercentages[color]);
    }, 0) / 2
  );

  const publicOuter = consciousPercentages.red + consciousPercentages.yellow;
  const privateOuter = lessConsciousPercentages.red + lessConsciousPercentages.yellow;
  const delta = roundPercent(privateOuter - publicOuter);

  if (delta > 2) {
    return {
      value: shiftValue,
      delta,
      arrow: "↗",
      label: "Votre dynamique moins consciente devient plus expressive et tournée vers l’extérieur.",
      description: "En situation relâchée ou sous tension, l’énergie d’action et de visibilité prend davantage de place."
    };
  }

  if (delta < -2) {
    return {
      value: shiftValue,
      delta,
      arrow: "↙",
      label: "Votre dynamique moins consciente devient plus retenue et intériorisée.",
      description: "Lorsque le contrôle baisse, l’analyse et la préservation du lien prennent davantage de place."
    };
  }

  return {
    value: shiftValue,
    delta,
    arrow: "→",
    label: "Votre équilibre global reste relativement stable entre les deux registres.",
    description: "Le style visible et la dynamique plus privée restent proches, avec des déplacements limités."
  };
}


// Older exports only carry percentages of 100; 12 is the sum of the 0–6
// scores, so percentage × 0,12 recovers the score.
function scoresFromImportedProfile(profile) {
  if (profile && profile.scores && ENERGY_ORDER.every((colour) => hasFiniteNumber(profile.scores[colour]))) {
    return Object.fromEntries(ENERGY_ORDER.map((colour) => [colour, Number(profile.scores[colour])]));
  }
  if (profile && profile.percentages && ENERGY_ORDER.every((colour) => hasFiniteNumber(profile.percentages[colour]))) {
    return Object.fromEntries(ENERGY_ORDER.map((colour) => [colour, roundTo(Number(profile.percentages[colour]) * 0.12, 2)]));
  }
  return null;
}

function normalizeImportedPayload(payload, fileName) {
  if (!payload || typeof payload !== "object") {
    throw new Error("contenu JSON non exploitable");
  }
  if (payload.appName && payload.appName !== APP_NAME) {
    throw new Error("fichier non reconnu pour cette application");
  }

  const source = payload.scores || {};
  const consciousScores = scoresFromImportedProfile(source.conscious);
  const lessConsciousScores = scoresFromImportedProfile(source.lessConscious);
  if (!consciousScores || !lessConsciousScores) {
    throw new Error("scores manquants ou incomplets");
  }

  const respondent = payload.respondent || {};
  const fullName = (
    typeof respondent.fullName === "string" && respondent.fullName.trim()
  ) || `${respondent.firstName || ""} ${respondent.lastName || ""}`.trim() || fileNameToLabel(fileName);

  const conscious = buildScoreProfile(consciousScores);
  const lessConscious = buildScoreProfile(lessConsciousScores);
  const shift = resolveShift(conscious.shares, lessConscious.shares);
  const generatedAt = typeof payload.generatedAt === "string" ? payload.generatedAt : new Date().toISOString();

  return {
    id: `${generatedAt}-${fullName}-${conscious.archetype.position}-${lessConscious.archetype.position}`,
    fileName,
    fullName,
    generatedAt,
    conscious,
    lessConscious,
    shift
  };
}

function textsInputFor(profile) {
  return {
    type: profile.archetype.key,
    lean: profile.archetype.lean,
    ring: profile.archetype.creative ? "creatif" : profile.archetype.ring,
    scores: { ...profile.scores }
  };
}

// The report text comes from texts/profile-texts.fr.js when it is present,
// otherwise from the fallback in js/texts-fallback.js.
function composeTexts(firstName, conscious, lessConscious) {
  const provider = (typeof window !== "undefined" && window.JungTexts && typeof window.JungTexts.compose === "function")
    ? window.JungTexts
    : (typeof window !== "undefined" ? window.JungTextsFallback : null);
  if (!provider) {
    return { texts: {}, typeSummaries: {} };
  }
  const texts = provider.compose({
    firstName,
    conscious: textsInputFor(conscious),
    lessConscious: textsInputFor(lessConscious)
  }) || {};
  const typeSummaries = {};
  TYPE_ORDER.forEach((key) => {
    const entry = provider.types && provider.types[key];
    typeSummaries[key] = entry && entry.summary ? entry.summary : "";
  });
  return { texts, typeSummaries };
}

function buildReport(questionBank, answers, firstName, lastName) {
  const conscious = resolveBlockScores(questionBank, answers, "conscious");
  const lessConscious = resolveBlockScores(questionBank, answers, "lessConscious");
  return buildReportFromProfiles(conscious, lessConscious, firstName, lastName);
}

function buildReportFromProfiles(conscious, lessConscious, firstName, lastName, generatedAt) {
  const shift = resolveShift(conscious.shares, lessConscious.shares);
  const oppositeType = getOppositeType(conscious.archetype.key);
  const { texts, typeSummaries } = composeTexts(firstName, conscious, lessConscious);

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    generatedAt: generatedAt || new Date().toISOString(),
    conscious,
    lessConscious,
    shift,
    opposite: { key: oppositeType.key, label: oppositeType.label, jung: oppositeType.jung },
    texts,
    typeSummaries
  };
}

const QUESTION_BANK = buildQuestionBank();
const WHEEL_BASE = buildWheelBaseGeometry();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ENERGY_ORDER,
    TYPE_ORDER,
    TYPE_LIBRARY,
    RINGS,
    QUESTION_BANK,
    WHEEL_BASE,
    resolvePosition,
    describePositionSlot,
    listAllPositions,
    buildScoreProfile,
    resolveBlockScores,
    resolveShift,
    rawToScore,
    getOppositeType,
    normalizeImportedPayload,
    buildReport,
    buildReportFromProfiles
  };
}
