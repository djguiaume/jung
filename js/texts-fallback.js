// Fallback report text, used only when texts/profile-texts.fr.js is not
// loaded. It exposes the same API as window.JungTexts, built from the app's
// original per-colour lists. The real text lives in texts/profile-texts.fr.js.
(function () {
  if (typeof window === "undefined") {
    return;
  }

  const FALLBACK_ENERGY = {
    blue: {
      key: "blue",
      label: "Bleu",
      emoji: "🔵",
      color: "#2f69c9",
      adjectives: ["analytique", "précis", "méthodique"],
      styleTone: "lucide, structurée et mesurée",
      relationNeed: "des échanges clairs, cohérents et respectueux du fond",
      decisionNeed: "du temps de réflexion, des faits solides et un cadre net",
      strengths: [
        "Capacité à clarifier un problème complexe",
        "Sens élevé de la précision et de la qualité",
        "Préparation méthodique avant l’action",
        "Calme dans les situations ambiguës",
        "Fiabilité dans le suivi des engagements"
      ],
      weaknesses: [
        "Risque de suranalyser avant de décider",
        "Tendance à corriger sans toujours rassurer",
        "Réserve émotionnelle pouvant créer de la distance",
        "Difficulté avec l’improvisation imprécise",
        "Exigence parfois perçue comme froide"
      ],
      teamValue: [
        "Met de l’ordre dans les sujets confus",
        "Sécurise la qualité des livrables",
        "Anticipe les risques et les incohérences",
        "Documente les décisions importantes",
        "Stabilise le rythme par une approche mesurée"
      ],
      communicationTips: [
        "Arriver avec des faits, des exemples et un objectif clair",
        "Laisser le temps de réflexion avant de conclure",
        "Préciser les critères de réussite",
        "Structurer le message étape par étape",
        "Être cohérent entre parole et exécution"
      ],
      barriers: [
        "Flou sur les responsabilités",
        "Promesses vagues ou non tenues",
        "Pression à décider sans éléments solides",
        "Bruit relationnel qui masque le fond",
        "Changements fréquents sans logique expliquée"
      ],
      blindSpots: [
        "Sous-estimer le besoin de reconnaissance émotionnelle",
        "Privilégier la logique au détriment du tempo collectif",
        "Supposer que la retenue est toujours un signe d’adhésion",
        "Négliger l’impact du ton utilisé",
        "Confondre prudence et lenteur des autres"
      ],
      growth: [
        "Verbaliser davantage son intention positive",
        "Tester une version simple avant d’optimiser",
        "Inviter plus tôt les parties prenantes",
        "Faire une place explicite aux ressentis",
        "Accepter qu’une bonne décision peut rester incomplète"
      ],
      environment: [
        "Cadre stable avec rôles clairs",
        "Temps de concentration protégé",
        "Niveau d’exigence élevé mais réaliste",
        "Décisions appuyées sur des données",
        "Espace pour améliorer les méthodes"
      ],
      needs: [
        "Des priorités explicites",
        "Des standards de qualité cohérents",
        "Une autonomie de réflexion",
        "Des retours argumentés",
        "Un rythme qui respecte la préparation"
      ],
      motivators: [
        "Résoudre un problème difficile",
        "Améliorer un système existant",
        "Faire progresser la qualité",
        "Comprendre le fond d’un sujet",
        "Être reconnu pour sa fiabilité"
      ],
      managementStyle: [
        "Cadre avec précision et méthode",
        "Suit les indicateurs et la qualité",
        "Prépare les décisions avant de les annoncer",
        "Protège le temps de travail sérieux",
        "Cherche des solutions durables plutôt que rapides"
      ]
    },
    green: {
      key: "green",
      label: "Vert",
      emoji: "🟢",
      color: "#4c8a5a",
      adjectives: ["attentif", "stable", "soutenant"],
      styleTone: "bienveillante, stable et attentive",
      relationNeed: "une atmosphère de confiance, de respect et de continuité",
      decisionNeed: "de la concertation, du temps et une prise en compte des personnes",
      strengths: [
        "Écoute sincère et présence rassurante",
        "Patience dans l’accompagnement du changement",
        "Capacité à stabiliser un groupe",
        "Loyauté et sens du collectif",
        "Diplomatie dans les tensions"
      ],
      weaknesses: [
        "Tendance à éviter les confrontations nécessaires",
        "Difficulté à dire non quand la charge augmente",
        "Risque de s’oublier pour préserver l’harmonie",
        "Décisions plus lentes sous pression",
        "Tolérance parfois excessive face aux écarts"
      ],
      teamValue: [
        "Maintient la cohésion quand la pression monte",
        "Repère les besoins non exprimés",
        "Soutient les rythmes durables",
        "Facilite la coopération entre profils différents",
        "Crée un climat de confiance"
      ],
      communicationTips: [
        "Commencer par établir un contact calme et respectueux",
        "Montrer l’impact humain des décisions",
        "Laisser un espace d’expression sans interrompre",
        "Donner de la visibilité sur la suite",
        "Valoriser ce qui fonctionne déjà"
      ],
      barriers: [
        "Ton abrupt ou trop pressant",
        "Conflit public imposé sans préparation",
        "Changements soudains sans accompagnement",
        "Compétition relationnelle permanente",
        "Décisions déconnectées des réalités humaines"
      ],
      blindSpots: [
        "Reporter une discussion difficile trop longtemps",
        "Supposer que le silence protège toujours la relation",
        "Ne pas montrer ses propres besoins",
        "Sous-estimer l’urgence réelle de certains choix",
        "Confondre consensus et clarté"
      ],
      growth: [
        "Nommer plus tôt les désaccords utiles",
        "Exprimer ses limites sans culpabilité",
        "Prendre la parole avant que la tension n’accumule",
        "Faire la différence entre soutien et sauvetage",
        "Accepter qu’une relation peut rester solide après un non"
      ],
      environment: [
        "Cadre humainement fiable",
        "Relation managériale prévisible",
        "Temps pour construire la confiance",
        "Rythme régulier sans agitation inutile",
        "Valeurs collectives clairement incarnées"
      ],
      needs: [
        "Un climat respectueux",
        "De la reconnaissance sincère",
        "Des transitions expliquées",
        "La possibilité d’aider utilement",
        "Des décisions cohérentes avec les valeurs affichées"
      ],
      motivators: [
        "Contribuer à la qualité des relations",
        "Voir les autres progresser",
        "Créer un environnement sûr",
        "Aider concrètement une équipe",
        "Rendre les changements plus humains"
      ],
      managementStyle: [
        "Privilégie la continuité et l’écoute",
        "Accompagne plus qu’il n’impose",
        "Cherche des décisions acceptables pour le groupe",
        "Veille à l’équilibre de charge",
        "Maintient la stabilité lors des transitions"
      ]
    },
    yellow: {
      key: "yellow",
      label: "Jaune",
      emoji: "🟡",
      color: "#dca42c",
      adjectives: ["expressif", "créatif", "stimulant"],
      styleTone: "ouverte, expressive et stimulante",
      relationNeed: "du mouvement, des échanges vivants et de la reconnaissance",
      decisionNeed: "de la latitude, des idées et un horizon inspirant",
      strengths: [
        "Énergie communicative et optimisme visible",
        "Créativité spontanée dans les solutions",
        "Capacité à relier rapidement les personnes",
        "Aisance à donner envie d’avancer",
        "Adaptabilité dans les environnements mouvants"
      ],
      weaknesses: [
        "Risque de dispersion quand trop d’idées coexistent",
        "Engagement pris trop vite sous l’élan",
        "Détails opérationnels parfois oubliés",
        "Difficulté à rester longtemps dans la routine",
        "Parole abondante qui peut prendre la place des autres"
      ],
      teamValue: [
        "Donne de l’élan dans les moments de doute",
        "Crée du lien entre des personnes éloignées",
        "Apporte des pistes nouvelles rapidement",
        "Rend la communication plus accessible",
        "Fait émerger une vision enthousiasmante"
      ],
      communicationTips: [
        "Parler avec chaleur et ouverture",
        "Montrer les possibilités plutôt que les limites d’emblée",
        "Laisser une marge de créativité",
        "Valoriser l’intuition et l’élan",
        "Rendre les messages concrets et vivants"
      ],
      barriers: [
        "Cadre trop rigide sans espace d’initiative",
        "Messages froids ou uniquement procéduraux",
        "Critique sèche qui casse l’élan",
        "Réunions sans interaction",
        "Routine imposée sans sens visible"
      ],
      blindSpots: [
        "Sous-estimer la fatigue créée par les changements successifs",
        "Confondre enthousiasme et accord réel",
        "Aller plus vite que la capacité d’absorption du groupe",
        "Négliger le suivi après une bonne idée",
        "Minimiser les objections techniques"
      ],
      growth: [
        "Fermer explicitement les boucles ouvertes",
        "Transformer l’intuition en plan visible",
        "Écouter jusqu’au bout les signaux de réserve",
        "Faire des pauses avant de promettre",
        "Choisir moins de priorités mais les tenir"
      ],
      environment: [
        "Latitude relationnelle et créative",
        "Rythme vivant sans excès bureaucratique",
        "Possibilités de connexion et d’influence",
        "Projets visibles avec une histoire à raconter",
        "Droit à l’expérimentation"
      ],
      needs: [
        "De la variété",
        "Un espace d’expression",
        "Des échanges fréquents",
        "Une reconnaissance visible",
        "La liberté de tester des pistes"
      ],
      motivators: [
        "Lancer une idée nouvelle",
        "Créer de l’adhésion",
        "Vivre des interactions riches",
        "Faire bouger les lignes",
        "Sentir un projet inspirant"
      ],
      managementStyle: [
        "Anime et fédère par l’énergie",
        "Donne envie en racontant une perspective",
        "Encourage l’initiative",
        "Préfère influencer plutôt que contrôler",
        "Apporte de la visibilité et du mouvement"
      ]
    },
    red: {
      key: "red",
      label: "Rouge",
      emoji: "🔴",
      color: "#c34a2c",
      adjectives: ["direct", "volontaire", "orienté résultats"],
      styleTone: "directe, rapide et volontaire",
      relationNeed: "des échanges francs, efficaces et sans détour",
      decisionNeed: "de la marge d’action, de la vitesse et des objectifs nets",
      strengths: [
        "Décision rapide quand la situation l’exige",
        "Courage face aux sujets difficiles",
        "Sens du résultat et des priorités",
        "Capacité à entraîner vers l’action",
        "Clarté dans les attentes"
      ],
      weaknesses: [
        "Impatience quand le rythme ralentit",
        "Risque de brusquer sans le vouloir",
        "Tendance à reprendre la main trop vite",
        "Urgence installée comme mode normal",
        "Attention limitée aux sensibilités plus discrètes"
      ],
      teamValue: [
        "Fait avancer les décisions bloquées",
        "Coupe court aux ambiguïtés inutiles",
        "Maintient le cap sur les objectifs",
        "Redonne de l’énergie en période d’inertie",
        "Prend des responsabilités quand il le faut"
      ],
      communicationTips: [
        "Aller à l’essentiel rapidement",
        "Formuler une demande claire",
        "Montrer l’effet concret attendu",
        "Proposer des options plutôt qu’un débat infini",
        "Respecter le temps et le rythme"
      ],
      barriers: [
        "Lenteur sans justification",
        "Discours trop abstrait sans décision",
        "Manque de responsabilité assumée",
        "Détours relationnels qui évitent le sujet",
        "Indécision prolongée"
      ],
      blindSpots: [
        "Sous-estimer l’effet de son intensité",
        "Confondre vitesse et maturité de décision",
        "Passer trop vite du constat à l’injonction",
        "Négliger l’adhésion émotionnelle",
        "Récompenser surtout l’urgence"
      ],
      growth: [
        "Ralentir juste assez pour écouter les signaux faibles",
        "Poser des questions avant de conclure",
        "Distinguer priorité et précipitation",
        "Renforcer la reconnaissance positive",
        "Partager plus clairement la logique des arbitrages"
      ],
      environment: [
        "Objectifs ambitieux et visibles",
        "Décisions rapides quand nécessaire",
        "Autonomie forte",
        "Responsabilités assumées clairement",
        "Culture de l’action plus que de l’attente"
      ],
      needs: [
        "Des marges de décision",
        "Des objectifs sans ambiguïté",
        "Une faible inertie politique",
        "Des interlocuteurs francs",
        "Un terrain où agir a un effet réel"
      ],
      motivators: [
        "Gagner du terrain",
        "Atteindre un résultat mesurable",
        "Débloquer une situation",
        "Avoir de l’impact vite",
        "Prendre des responsabilités réelles"
      ],
      managementStyle: [
        "Décide et arbitre rapidement",
        "Fixe un cap exigeant",
        "Distribue la responsabilité de manière directe",
        "Valorise la réactivité",
        "Préfère l’action observable aux intentions"
      ]
    }
  };

  const COLOUR_ORDER = ["blue", "green", "yellow", "red"];
  const COLOUR_NAMES = { blue: "bleu", green: "vert", yellow: "jaune", red: "rouge" };
  const TYPE_ORDER = ["reformateur", "directeur", "motivateur", "inspirateur", "conseiller", "supporteur", "coordinateur", "observateur"];

  const TYPES = {
    reformateur: { summary: "Allie rigueur, standards élevés et sens du résultat. Cherche à rendre les choses plus solides, plus claires et plus fiables." },
    directeur: { summary: "Avance vite, clarifie les responsabilités et pousse les sujets jusqu’à une conclusion exploitable." },
    motivateur: { summary: "Combine sens du résultat, énergie relationnelle et capacité à entraîner. Cherche à faire bouger les lignes avec un impact visible." },
    inspirateur: { summary: "Apporte enthousiasme, idées et élan. Cherche à rassembler les personnes autour d’une vision positive." },
    conseiller: { summary: "Allie chaleur relationnelle, écoute et souci des personnes. Cherche à créer de l’adhésion sans perdre la qualité du lien." },
    supporteur: { summary: "Apporte stabilité, patience et loyauté. Cherche à soutenir durablement les personnes et les projets." },
    coordinateur: { summary: "Allie calme, sens du collectif et goût pour l’organisation. Cherche à rendre les choses fiables sans brusquer les personnes." },
    observateur: { summary: "Apporte recul, précision et rigueur. Cherche à comprendre en profondeur avant d’agir." }
  };

  const HOW_TO_READ = [
    "Ce rapport décrit vos préférences à l’aide de quatre énergies de couleur. Le bleu correspond à l’analyse et à la précision, le vert au soutien et à la stabilité, le jaune à l’expression et à l’enthousiasme, le rouge à la décision et à l’action. Chacun utilise les quatre ; le profil montre lesquelles viennent le plus naturellement.",
    "Les scores vont de 0 à 6. Au-dessus de 3, une énergie fait partie de vos préférences ; en dessous, vous l’utilisez plutôt quand la situation l’exige.",
    "Le profil conscient décrit la manière dont vous vous présentez dans un contexte visible ou professionnel. Le profil moins conscient décrit ce qui apparaît plus facilement dans l’intimité, sous tension ou lorsque vous relâchez le contrôle.",
    "La roue place ces deux profils parmi huit types et 72 positions. Plus un point est proche du bord, plus la préférence est marquée ; plus il est proche du centre, plus le profil est équilibré.",
    "Ce rapport est une base de réflexion, pas un verdict. Gardez ce qui vous ressemble, questionnez le reste. Il ne doit jamais servir à recruter, évaluer ou classer quelqu’un."
  ];

  function ranked(scores) {
    return [...COLOUR_ORDER].sort((a, b) => scores[b] - scores[a]);
  }

  // Takes items from the colours in score order, more from the stronger ones.
  function pick(scores, field, count) {
    const order = ranked(scores).slice(0, 3);
    const weights = order.map((colour) => Math.max(scores[colour], 0.5));
    const picked = [];
    const cursors = order.map(() => 0);
    let guard = 0;
    while (picked.length < count && guard < 200) {
      guard += 1;
      let best = -1;
      let bestValue = -Infinity;
      order.forEach((colour, index) => {
        const list = FALLBACK_ENERGY[colour][field] || [];
        if (cursors[index] >= list.length) return;
        const value = weights[index] / (cursors[index] + 1);
        if (value > bestValue) {
          bestValue = value;
          best = index;
        }
      });
      if (best === -1) break;
      const item = FALLBACK_ENERGY[order[best]][field][cursors[best]];
      cursors[best] += 1;
      if (!picked.includes(item)) picked.push(item);
    }
    return picked;
  }

  function adjectives(scores) {
    const [first, second] = ranked(scores);
    return { first: FALLBACK_ENERGY[first], second: FALLBACK_ENERGY[second] };
  }

  function compose(input) {
    const name = input.firstName || "Cette personne";
    const c = input.conscious.scores;
    const p = input.lessConscious.scores;
    const pub = adjectives(c);
    const priv = adjectives(p);
    const oppositeKey = TYPE_ORDER[(TYPE_ORDER.indexOf(input.conscious.type) + 4) % 8];
    const oppositeScores = Object.fromEntries(COLOUR_ORDER.map((colour) => [colour, 6 - c[colour]]));
    const list = (items) => items.join(", ");

    return {
      howToRead: HOW_TO_READ,
      intro: {},
      summary: {
        headline: `${name} se montre d’abord ${list(pub.first.adjectives)}, avec une nuance ${list(pub.second.adjectives)}.`,
        strengths: pick(c, "strengths", 3),
        communicate: pick(c, "communicationTips", 3),
        motivation: pick(c, "motivators", 3)
      },
      overview: {
        style: [
          `${name} projette une présence ${list(pub.first.adjectives)}, nuancée par une note ${list(pub.second.adjectives)}. Le style d’ensemble reste ${pub.first.styleTone}.`,
          `Dans un registre plus privé, la coloration devient ${list(priv.first.adjectives)}, soutenue par une note ${list(priv.second.adjectives)}.`
        ],
        relations: [
          `Dans la relation, ${name} recherche d’abord ${pub.first.relationNeed}, puis ${pub.second.relationNeed}.`
        ],
        decisions: [
          `${name} décide en s’appuyant sur ${pub.first.decisionNeed}, puis sur ${pub.second.decisionNeed}.`
        ]
      },
      underPressure: [
        `Sous tension, l’énergie ${COLOUR_NAMES[ranked(p)[0]]} prend davantage de place : ${name} peut alors paraître plus ${list(priv.first.adjectives)}.`
      ],
      strengths: pick(c, "strengths", 10),
      weaknesses: pick(c, "weaknesses", 10),
      team: pick(c, "teamValue", 10),
      communication: pick(c, "communicationTips", 12),
      barriers: pick(c, "barriers", 12),
      blindSpots: [
        `Quelques angles morts possibles : ${pick(c, "blindSpots", 4).map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join(" ; ")}.`
      ],
      opposite: {
        type: oppositeKey,
        description: [TYPES[oppositeKey].summary],
        do: pick(oppositeScores, "communicationTips", 6),
        avoid: pick(oppositeScores, "barriers", 6)
      },
      growth: pick(c, "growth", 10),
      environment: pick(c, "environment", 10),
      management: pick(c, "needs", 10),
      motivation: pick(c, "motivators", 10),
      managementStyle: pick(c, "managementStyle", 10)
    };
  }

  window.JungTextsFallback = { compose, types: TYPES, howToRead: HOW_TO_READ };
})();
