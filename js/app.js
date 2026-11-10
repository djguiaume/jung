// Vue app: questionnaire, report screen, PDF print and group comparison.
// Scoring and the wheel live in js/engine.js; the report text comes from
// window.JungTexts (texts/profile-texts.fr.js) or the fallback.

const REPORT_MODULES = [
  {
    key: "base",
    title: "Module de base",
    sections: [
      { key: "style", title: "Style personnel", blocks: [{ type: "paragraphs", from: "overview.style" }] },
      { key: "relations", title: "Relations avec autrui", blocks: [{ type: "paragraphs", from: "overview.relations" }] },
      { key: "decisions", title: "Prise de décision", blocks: [{ type: "paragraphs", from: "overview.decisions" }] },
      { key: "underPressure", title: "Sous pression", blocks: [{ type: "paragraphs", from: "underPressure" }] },
      { key: "strengths", title: "Points forts", blocks: [{ type: "list", from: "strengths" }], pageBreak: true },
      { key: "weaknesses", title: "Faiblesses potentielles", blocks: [{ type: "list", from: "weaknesses" }], pageBreak: true },
      { key: "team", title: "Valeur pour l’équipe", blocks: [{ type: "list", from: "team" }], pageBreak: true },
      { key: "communication", title: "Communication efficace", blocks: [{ type: "list", from: "communication" }], pageBreak: true },
      { key: "barriers", title: "Les freins à une communication efficace", blocks: [{ type: "list", from: "barriers" }], pageBreak: true },
      { key: "blindSpots", title: "Points ignorés possibles", blocks: [{ type: "paragraphs", from: "blindSpots" }], pageBreak: true },
      {
        key: "opposite",
        title: "Votre type opposé",
        blocks: [
          { type: "paragraphs", from: "opposite.description" },
          { type: "list", from: "opposite.do", heading: "Pour bien communiquer avec ce type" },
          { type: "list", from: "opposite.avoid", heading: "À éviter avec ce type" }
        ],
        pageBreak: true
      },
      { key: "growth", title: "Suggestions pour progresser", blocks: [{ type: "list", from: "growth" }], pageBreak: true }
    ]
  },
  {
    key: "management",
    title: "Module Management",
    sections: [
      { key: "environment", title: "L’environnement idéal de travail", blocks: [{ type: "list", from: "environment" }] },
      { key: "management", title: "Le management de {prenom}", blocks: [{ type: "list", from: "management" }], pageBreak: true },
      { key: "motivation", title: "La motivation", blocks: [{ type: "list", from: "motivation" }], pageBreak: true },
      { key: "managementStyle", title: "Style de management", blocks: [{ type: "list", from: "managementStyle" }], pageBreak: true }
    ]
  }
];

function readPath(source, path) {
  return path.split(".").reduce((value, key) => (value && value[key] !== undefined ? value[key] : undefined), source);
}

function asList(value) {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string" && item.trim());
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function buildReportModules(report) {
  const texts = report.texts || {};
  const intros = texts.intro || {};
  return REPORT_MODULES.map((module) => ({
    key: module.key,
    title: module.title,
    sections: module.sections
      .map((section) => ({
        key: section.key,
        title: section.title.replace("{prenom}", report.firstName),
        intro: typeof intros[section.key] === "string" ? intros[section.key] : "",
        pageBreak: Boolean(section.pageBreak),
        blocks: section.blocks
          .map((block) => ({ type: block.type, heading: block.heading || "", items: asList(readPath(texts, block.from)) }))
          .filter((block) => block.items.length > 0)
      }))
      .filter((section) => section.blocks.length > 0)
  })).filter((module) => module.sections.length > 0);
}

const { createApp } = Vue;

createApp({
  data() {
    return {
      energyLibrary: ENERGY_LIBRARY,
      typeLibrary: TYPE_LIBRARY,
      wheelBase: WHEEL_BASE,
      chartEnergies: ENERGY_ORDER.map((key) => ENERGY_LIBRARY[key]),
      questionBank: QUESTION_BANK,
      rankOrder: RANK_ORDER,
      screen: "intro",
      firstName: "",
      lastName: "",
      currentQuestionIndex: 0,
      answers: {},
      report: null,
      printMode: "",
      uploadedReports: [],
      importErrors: []
    };
  },
  mounted() {
    window.addEventListener("afterprint", this.resetPrintMode);
  },
  beforeUnmount() {
    window.removeEventListener("afterprint", this.resetPrintMode);
  },
  computed: {
    totalQuestions() {
      return this.questionBank.length;
    },
    hasUploadedReports() {
      return this.uploadedReports.length > 0;
    },
    canStart() {
      return this.firstName.length > 0 && this.lastName.length > 0;
    },
    currentQuestion() {
      return this.questionBank[this.currentQuestionIndex];
    },
    currentRanks() {
      return this.answers[this.currentQuestion.id] || [null, null, null, null];
    },
    currentBlockTitle() {
      return this.currentQuestion.block === "conscious"
        ? "Partie 1 — Votre visage public"
        : "Partie 2 — Votre dynamique privée";
    },
    currentBlockQuestionNumber() {
      return this.currentQuestion.block === "conscious"
        ? this.currentQuestionIndex + 1
        : this.currentQuestionIndex - 17;
    },
    answeredQuestionsCount() {
      return this.questionBank.filter((question) => {
        const ranks = this.answers[question.id];
        return Array.isArray(ranks) && ranks.length === 4 && new Set(ranks).size === 4 && ranks.every((rank) => rank !== null);
      }).length;
    },
    progressPercent() {
      return (this.answeredQuestionsCount / this.totalQuestions) * 100;
    },
    isCurrentQuestionComplete() {
      return new Set(this.currentRanks).size === 4 && this.currentRanks.every((rank) => rank !== null);
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.totalQuestions - 1;
    },
    completionMessage() {
      const missing = RANK_ORDER.filter((rank) => !this.currentRanks.includes(rank));
      if (missing.length === 0) {
        return "Classement complet. Vous pouvez passer à la série suivante.";
      }
      return `Rangs restants : ${toSentence(missing.map((rank) => String(rank)))}.`;
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`.trim();
    },
    texts() {
      return (this.report && this.report.texts) || {};
    },
    howToRead() {
      return asList(this.texts.howToRead);
    },
    reportModules() {
      return this.report ? buildReportModules(this.report) : [];
    },
    formattedPrintDate() {
      return formatDateFr(new Date());
    },
    colourMixLabel() {
      if (!this.report) return "";
      return `Mélange des énergies conscientes : ${ENERGY_ORDER.map((key) => `${ENERGY_LIBRARY[key].label} ${this.formatScore(this.report.conscious.scores[key])} sur 6`).join(", ")}`;
    },
    formattedReportDate() {
      return this.report ? formatDateFr(new Date(this.report.generatedAt)) : formatDateFr(new Date());
    },
    consciousMarker() {
      return this.report ? positionToPoint(this.report.conscious.archetype.position) : { x: 0, y: 0 };
    },
    lessConsciousMarker() {
      return this.report ? positionToPoint(this.report.lessConscious.archetype.position) : { x: 0, y: 0 };
    },
    consciousMarkerSlices() {
      return this.report ? buildCompassSlices(this.consciousMarker, 11, 0.98) : [];
    },
    lessConsciousMarkerSlices() {
      return this.report ? buildCompassSlices(this.lessConsciousMarker, 10, 0.46) : [];
    },
    importedConsciousMarkers() {
      return buildImportedWheelMarkers(this.uploadedReports, "conscious");
    },
    importedLessConsciousMarkers() {
      return buildImportedWheelMarkers(this.uploadedReports, "lessConscious");
    },
    uploadedAverageShift() {
      if (this.uploadedReports.length === 0) {
        return 0;
      }

      const totalShift = this.uploadedReports.reduce((sum, report) => sum + report.shift.value, 0);
      return roundPercent(totalShift / this.uploadedReports.length);
    },
    mostCommonConsciousArchetype() {
      return resolveMostCommonArchetype(this.uploadedReports, "conscious");
    },
    mostCommonLessConsciousArchetype() {
      return resolveMostCommonArchetype(this.uploadedReports, "lessConscious");
    }
  },
  methods: {
    formatPercent(value, digits = 1) {
      return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      }).format(value);
    },
    formatScore(value) {
      return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    },
    markerTextColorFor(colorKey) {
      return markerTextColor(colorKey);
    },
    scoreChartLabel(profile, name) {
      return `Scores de la persona ${name} sur 6 : ${ENERGY_ORDER.map((key) => `${ENERGY_LIBRARY[key].label} ${this.formatScore(profile.scores[key])}`).join(", ")}`;
    },
    formatImportedDate(value) {
      if (!value) {
        return "Date non disponible";
      }

      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "Date non disponible";
      }

      return formatDateFr(date);
    },
    getMarkerBadgeStyle(colorKey) {
      return {
        background: this.energyLibrary[colorKey].color,
        color: markerTextColor(colorKey)
      };
    },
    wheelLabelPathId(prefix, key) {
      return `wheel-label-${prefix}-${key}`;
    },
    startAssessment() {
      this.screen = "questions";
      this.currentQuestionIndex = 0;
    },
    async handleReportUpload(event) {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) {
        return;
      }

      const nextReports = new Map(this.uploadedReports.map((report) => [report.id, report]));
      const nextErrors = [];

      for (const file of files) {
        try {
          const text = await file.text();
          const payload = JSON.parse(text);
          const normalized = normalizeImportedPayload(payload, file.name);
          nextReports.set(normalized.id, normalized);
        } catch (error) {
          const reason = error instanceof SyntaxError
            ? "JSON invalide"
            : error instanceof Error
              ? error.message
              : "lecture impossible";
          nextErrors.push(`${file.name} : ${reason}.`);
        }
      }

      this.uploadedReports = Array.from(nextReports.values());
      this.importErrors = nextErrors;
      event.target.value = "";
    },
    clearUploadedReports() {
      this.uploadedReports = [];
      this.importErrors = [];
    },
    runPrint(mode) {
      this.printMode = mode;
      window.scrollTo({ top: 0, behavior: "auto" });
      this.$nextTick(() => {
        window.print();
      });
    },
    resetPrintMode() {
      this.printMode = "";
    },
    saveRanks(nextRanks) {
      this.answers = {
        ...this.answers,
        [this.currentQuestion.id]: nextRanks
      };
    },
    assignRank(optionIndex, rank) {
      const nextRanks = [...this.currentRanks];
      const previousRank = nextRanks[optionIndex];
      const existingIndex = nextRanks.findIndex((value, index) => index !== optionIndex && value === rank);

      if (previousRank === rank) {
        nextRanks[optionIndex] = null;
      } else {
        nextRanks[optionIndex] = rank;
        if (existingIndex !== -1) {
          nextRanks[existingIndex] = previousRank ?? null;
        }
      }

      this.saveRanks(nextRanks);
    },
    shiftRank(optionIndex, delta) {
      const currentRank = this.currentRanks[optionIndex];
      if (currentRank === null) {
        this.assignRank(optionIndex, delta >= 0 ? 4 : 1);
        return;
      }
      const nextRank = clamp(currentRank + delta, 1, 4);
      this.assignRank(optionIndex, nextRank);
    },
    isRankTakenByAnother(optionIndex, rank) {
      return this.currentRanks.some((value, index) => index !== optionIndex && value === rank);
    },
    resetCurrentQuestion() {
      this.saveRanks([null, null, null, null]);
    },
    nextQuestion() {
      if (!this.isCurrentQuestionComplete) {
        return;
      }

      if (this.isLastQuestion) {
        this.report = buildReport(this.questionBank, this.answers, this.firstName, this.lastName);
        this.screen = "results";
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      this.currentQuestionIndex += 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    restartAssessment() {
      this.screen = "intro";
      this.currentQuestionIndex = 0;
      this.answers = {};
      this.report = null;
      this.printMode = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    printComparison() {
      if (!this.hasUploadedReports) {
        return;
      }

      this.runPrint("comparison");
    },
    printReport() {
      this.runPrint("report");
    },
    downloadJson() {
      const payload = {
        appName: APP_NAME,
        generatedAt: this.report.generatedAt,
        respondent: {
          firstName: this.firstName,
          lastName: this.lastName,
          fullName: this.fullName
        },
        scores: {
          scale: "0-6",
          conscious: this.report.conscious,
          lessConscious: this.report.lessConscious,
          shift: this.report.shift,
          opposite: this.report.opposite
        },
        texts: this.report.texts,
        answers: this.questionBank.map((question) => ({
          id: question.id,
          block: question.block,
          options: question.options,
          ranks: this.answers[question.id]
        }))
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const slug = this.fullName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      link.href = url;
      link.download = `rapport-jungien-${slug || "profil"}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}).mount("#app");
