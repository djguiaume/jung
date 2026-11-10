/*
 * Textes du rapport de profil (français).
 *
 * Ce fichier ne dépend de rien et ne modifie pas la page : il définit
 * window.JungTexts. L'application appelle JungTexts.compose(profil) et
 * affiche ce qui est renvoyé (voir texts/README.md).
 *
 * Tous les textes sont rédigés pour ce projet. Ils utilisent le prénom
 * ({p}) et une formulation neutre : pas de « il » ou « elle », pas
 * d'adjectif accordé au genre de la personne.
 */
(function (global) {
  "use strict";

  // Ordre des 8 types sur la roue (mêmes clés que ARCHETYPE_LIBRARY).
  var SEQUENCE = [
    "reformateur",
    "directeur",
    "motivateur",
    "inspirateur",
    "conseiller",
    "supporteur",
    "coordinateur",
    "observateur"
  ];

  var COLOURS = ["blue", "green", "yellow", "red"];

  var HIGH = 3.6; // score sur 6 à partir duquel une couleur est « forte »
  var LOW = 2.4; // score sur 6 en dessous duquel une couleur est « faible »
  var SHIFT = 0.5; // écart public/privé jugé significatif

  var LIST_SIZES = {
    strengths: 10,
    weaknesses: 10,
    team: 10,
    communication: 12,
    barriers: 12,
    growth: 10,
    environment: 10,
    management: 10,
    motivation: 10,
    managementStyle: 10
  };

  // ---------------------------------------------------------------------
  // Introductions de section
  // ---------------------------------------------------------------------
  var INTROS = {
    introduction:
      "Ce rapport décrit les préférences de {p} telles qu’elles ressortent du questionnaire. Il ne mesure ni la compétence, ni l’intelligence, ni la valeur d’une personne : il propose une lecture des énergies que {p} mobilise le plus volontiers, et de celles qui demandent davantage d’effort. Chaque phrase est une hypothèse à confronter à l’expérience. Gardez ce qui sonne juste, discutez du reste avec des personnes qui vous connaissent bien, puis notez ce que vous souhaitez travailler.",
    overview:
      "Cette synthèse décrit la manière habituelle dont {p} travaille, entre en relation avec les autres et prend ses décisions. Elle s’appuie sur le profil public, celui que l’entourage observe au quotidien, nuancé par l’intensité de chacune des quatre couleurs.",
    underPressure:
      "Le profil privé reflète la façon dont {p} fonctionne au naturel, lorsque l’attention se relâche, ou au contraire lorsque la tension monte. Les écarts entre profil public et profil privé montrent les énergies que {p} ajuste pour répondre aux attentes de son environnement. Ces ajustements sont utiles, mais ils consomment de l’énergie.",
    strengths:
      "Voici les qualités que {p} apporte le plus naturellement à son travail. La liste n’est pas exhaustive : elle met en avant ce que les réponses font ressortir avec le plus de netteté.",
    weaknesses:
      "Une faiblesse est souvent une force poussée trop loin, ou utilisée au mauvais moment. Les points suivants sont des risques possibles, pas des constats : ils apparaissent surtout avec la fatigue, la pression ou dans un environnement mal ajusté.",
    team:
      "Chaque membre d’une équipe y apporte un mélange particulier de talents et d’attentes. Voici ce que {p} apporte le plus souvent à un collectif.",
    communication:
      "Un message n’est efficace que s’il est reçu. Cette liste indique aux autres ce qui aide le plus à communiquer avec {p}. Elle peut être partagée avec les collègues proches.",
    barriers:
      "Certaines façons de communiquer passent mal auprès de {p}. Les connaître permet d’éviter des malentendus inutiles, de part et d’autre.",
    blindSpots:
      "Nous ne voyons pas toujours l’effet que nous produisons sur les autres. Les paragraphes suivants décrivent des comportements dont {p} n’a peut-être pas pleinement conscience. Le meilleur moyen de les vérifier est d’en parler avec des personnes de confiance.",
    opposite:
      "Le type opposé se trouve de l’autre côté de la roue. Ses priorités sont presque l’inverse de celles de {p}, ce qui rend la communication plus exigeante, mais aussi plus riche lorsqu’elle fonctionne. Savoir le reconnaître aide à ajuster sa manière de faire.",
    growth:
      "Ces pistes ne sont pas des corrections à apporter mais des leviers possibles. Choisissez-en deux ou trois qui vous parlent, et essayez-les concrètement pendant quelques semaines.",
    environment:
      "On travaille mieux dans un cadre qui correspond à ses préférences. Cette liste décrit l’environnement dans lequel {p} a le plus de chances de donner le meilleur ; les écarts avec la situation actuelle peuvent expliquer certaines frustrations.",
    management:
      "Ces points aident à bien accompagner {p} au quotidien. Certains relèvent de {p}, d’autres de ses collègues ou de sa hiérarchie.",
    motivation:
      "Personne ne peut motiver quelqu’un d’autre : on peut seulement créer les conditions dans lesquelles la motivation apparaît. Voici celles qui comptent le plus pour {p}.",
    managementStyle:
      "Lorsqu’il s’agit d’encadrer une équipe ou un projet, {p} adopte assez naturellement les comportements suivants. Ils décrivent des atouts, et aussi quelques angles morts à surveiller."
  };

  // ---------------------------------------------------------------------
  // Les 8 types
  // ---------------------------------------------------------------------
  var TYPES = {};

  TYPES["reformateur"] = {
    style: [
      "{p} aborde le travail avec méthode et un sens aigu de la qualité. Ce qui compte, c’est que les choses soient bien faites, solides et conformes aux standards que {p} se fixe, souvent plus élevés que ceux qu’on lui demande. Les idées nouvelles sont examinées de près avant d’être adoptées : elles doivent avoir fait leurs preuves, ou au moins résister à un examen sérieux.",
      "Dans la durée, on peut compter sur {p} : un engagement pris est un engagement tenu. {p} préfère les problèmes concrets aux débats théoriques, aime comprendre comment un système fonctionne pour pouvoir l’améliorer, et se sent à l’aise lorsqu’il faut remettre de l’ordre dans une situation confuse. Une voix intérieure exigeante accompagne souvent ce travail : {p} juge ses propres résultats au moins aussi sévèrement que ceux des autres."
    ],
    relations: [
      "Avec les autres, {p} privilégie le fond sur la forme. La confiance se construit par la cohérence et la tenue des engagements plutôt que par la convivialité. Ce style direct et sobre est parfois perçu comme distant, voire rigide, ce qui peut dissuader certaines personnes de proposer des alternatives. {p} gagne à exprimer plus souvent sa satisfaction et à montrer qu’une idée différente est la bienvenue, même lorsqu’elle remet en cause un cadre déjà établi."
    ],
    decisions: [
      "Pour décider, {p} s’appuie sur les faits, l’expérience et un raisonnement logique. Les décisions prises « au feeling » éveillent sa méfiance tant qu’elles n’ont pas été vérifiées. Une fois l’analyse faite, {p} tranche sans hésiter et assume son choix, y compris face à des interlocuteurs plus haut placés. Le risque est de considérer comme définitive une conclusion qui mériterait encore d’être confrontée à d’autres points de vue."
    ],
    pressure:
      "Sous pression, l’exigence de {p} tend à se durcir. Le contrôle se resserre, les critiques deviennent plus fréquentes et plus tranchantes, et l’attention se porte sur ce qui ne va pas plutôt que sur ce qui progresse. {p} peut alors se replier sur ses propres méthodes et reprendre des tâches qu’il vaudrait mieux déléguer.",
    blindSpots: [
      "{p} se fie tellement à la logique qu’il arrive que la dimension humaine d’une situation passe au second plan. Une décision juste sur le fond peut être vécue comme blessante si personne n’a pris le temps d’en expliquer les raisons ou d’en mesurer l’effet. Ce qui semble évident à {p} ne l’est pas toujours pour les autres.",
      "Les standards de {p} sont élevés, et ce qui est « bien » se confond parfois avec sa propre façon de faire. Les autres peuvent alors se sentir jugés, ou renoncer à proposer d’autres méthodes. Les bonnes idées de {p} restent aussi parfois en réserve, retravaillées encore et encore avant d’être partagées, au point de ne jamais sortir."
    ],
    strengths: [
      "Sens aigu de la qualité et du travail bien fait",
      "Esprit analytique et méthodique",
      "Capacité à repérer rapidement les failles d’un système ou d’un raisonnement",
      "Fiabilité : les engagements pris sont tenus",
      "Approche pragmatique des problèmes concrets",
      "Talent pour transformer une situation confuse en organisation claire"
    ],
    weaknesses: [
      "Peut se montrer inflexible lorsque sa méthode est remise en question",
      "Tendance à critiquer avant de reconnaître ce qui fonctionne",
      "Difficulté à déléguer sans tout revérifier",
      "Style sobre parfois perçu comme distant ou peu accessible",
      "Risque de s’enfermer dans des règles devenues inutiles",
      "Tendance à tout porter sans demander d’aide"
    ],
    team: [
      "Ramène les discussions vers ce qui est réalisable",
      "Veille à ce que le travail soit terminé, et bien terminé",
      "Met en place des procédures claires et utiles",
      "Repère les risques avant qu’ils ne deviennent des problèmes",
      "Défend la qualité, même quand elle n’est pas populaire",
      "S’investit au-delà de ce qui est demandé"
    ],
    communication: [
      "Préparer ses arguments et les appuyer sur des faits",
      "Aller droit au sujet, sans longs préambules",
      "Être précis sur les délais, les rôles et les attentes",
      "Présenter les informations de manière structurée",
      "Reconnaître la qualité de son travail de façon concrète",
      "Laisser du temps pour examiner une proposition avant de demander une réponse",
      "Reconnaître simplement une erreur au lieu de la minimiser"
    ],
    barriers: [
      "Arriver à une réunion sans préparation",
      "Avancer des affirmations sans pouvoir les étayer",
      "Changer les règles en cours de route sans explication",
      "Mélanger sujets personnels et professionnels",
      "Traiter ses mises en garde comme du pessimisme",
      "Promettre des résultats sans plan pour les atteindre",
      "Discuter de la personne plutôt que du problème"
    ],
    growth: [
      "Demander l’avis des autres avant de finaliser une méthode",
      "Exprimer sa satisfaction aussi souvent que ses critiques",
      "Accepter qu’un résultat « suffisamment bon » soit parfois le bon choix",
      "Partager ses idées plus tôt, même inachevées",
      "Déléguer vraiment, en laissant aux autres le choix des moyens",
      "Se demander régulièrement si une règle sert encore son but"
    ],
    environment: [
      "La qualité et la rigueur y sont reconnues",
      "Les rôles et les responsabilités sont clairs",
      "Les décisions reposent sur des faits vérifiés",
      "Les outils et l’information sont bien organisés",
      "On peut améliorer en continu les façons de faire",
      "Les collègues tiennent leurs engagements"
    ],
    management: [
      "Des objectifs précis et un cadre stable",
      "Une autonomie réelle dans le choix des méthodes",
      "Des retours francs, argumentés et sans détour",
      "Du temps pour analyser avant de décider",
      "Une reconnaissance explicite de la qualité du travail",
      "De l’aide pour prendre du recul quand l’exigence devient excessive"
    ],
    motivation: [
      "Améliorer durablement un système ou un processus",
      "Résoudre des problèmes complexes avec méthode",
      "Avoir des objectifs clairs et mesurables",
      "Voir son expertise reconnue et sollicitée",
      "Travailler avec des personnes compétentes et fiables",
      "Mesurer concrètement les progrès accomplis"
    ],
    managementStyle: [
      "Fixe des standards élevés et explicites",
      "Organise le travail avec ordre et discipline",
      "S’appuie sur des données et des arguments vérifiables",
      "Vérifie que rien d’important n’a été laissé de côté",
      "Remet en question les choix qui manquent de cohérence",
      "Peut contrôler davantage que nécessaire"
    ],
    asOpposite: [
      "Les personnes de ce type sont méthodiques, exigeantes et attachées aux faits. Elles abordent chaque sujet par l’analyse et veulent comprendre avant d’agir. {p} peut les trouver froides ou critiques, alors que leur exigence est surtout une manière de prendre le travail au sérieux.",
      "Elles accordent moins d’importance à l’ambiance qu’à la qualité du résultat, et préfèrent une discussion structurée à un échange spontané. Les émotions exprimées sans arguments les mettent mal à l’aise. Une fois leur confiance gagnée par la cohérence, elles se révèlent des partenaires très fiables."
    ],
    reachDo: [
      "Préparer ses idées et les appuyer sur des faits",
      "Respecter les délais et les engagements annoncés",
      "Aller à l’essentiel, puis donner les détails sur demande",
      "Leur laisser le temps d’examiner une proposition",
      "Reconnaître la qualité de leur travail",
      "Accueillir leurs questions comme une forme d’intérêt"
    ],
    reachAvoid: [
      "Improviser sur un sujet important",
      "Exagérer ou enjoliver les faits",
      "Prendre leurs critiques comme une attaque personnelle",
      "Insister sur l’émotionnel au détriment du fond",
      "Changer de cap sans expliquer pourquoi",
      "Empiéter sur leur temps ou leur espace personnel"
    ]
  };

  TYPES["directeur"] = {
    style: [
      "{p} avance avec détermination et vise le résultat. Les situations floues ou bloquées sont une invitation à agir : clarifier l’objectif, répartir les responsabilités, décider. Le rythme est rapide, les échanges courts, et l’attention se porte sur ce qui fait réellement progresser.",
      "Cette énergie s’appuie sur une logique solide : {p} ne se contente pas d’aller vite, mais veut que les solutions tiennent. Les arguments rationnels convainquent bien plus que les appels à l’émotion. {p} aime garder la maîtrise d’une situation et n’hésite pas à prendre les commandes lorsque personne d’autre ne le fait."
    ],
    relations: [
      "{p} parle franchement et attend la même franchise en retour. Les relations de travail reposent sur la compétence et la tenue des engagements. Ce style direct fait gagner beaucoup de temps, mais il peut être vécu comme brusque par les personnes plus sensibles à la forme. Les désaccords ne font pas peur à {p} ; ce qui agace, en revanche, ce sont les détours et les non-dits."
    ],
    decisions: [
      "{p} décide vite, une fois l’essentiel des informations réuni. L’indécision prolongée coûte plus, à ses yeux, qu’une erreur que l’on corrigera ensuite. Les décisions sont fondées sur la logique et les objectifs, et pleinement assumées. Le revers est de trancher parfois avant d’avoir entendu toutes les personnes concernées."
    ],
    pressure:
      "Sous pression, {p} accélère encore. Les consignes deviennent plus sèches, la patience diminue et la tentation de tout contrôler augmente. {p} peut alors imposer une décision au lieu de la construire, et donner l’impression que les personnes comptent moins que l’objectif.",
    blindSpots: [
      "La vitesse de {p} est un atout, mais tout le monde ne suit pas au même rythme. Ce qui semble une simple consigne efficace peut être reçu comme un ordre sans appel. Les personnes plus réservées risquent alors de se taire, et {p} de perdre des informations précieuses sans même s’en rendre compte.",
      "{p} juge volontiers les autres sur leurs résultats, beaucoup moins sur leurs efforts ou leurs intentions. Cette exigence peut stimuler, mais aussi décourager celles et ceux qui ont besoin d’encouragements pour donner le meilleur. La reconnaissance exprimée par {p} est souvent plus rare que ce dont son entourage aurait besoin."
    ],
    strengths: [
      "Capacité à décider vite et à assumer ses choix",
      "Capacité à distinguer l’important de l’accessoire",
      "Orientation forte vers les résultats concrets",
      "Aisance pour prendre les commandes en situation de crise",
      "Raisonnement logique et objectif",
      "Courage face aux obstacles et aux désaccords"
    ],
    weaknesses: [
      "Style parfois perçu comme brusque ou autoritaire",
      "Impatience face aux rythmes plus lents",
      "Tendance à décider sans consulter suffisamment",
      "Peut négliger les besoins émotionnels de l’équipe",
      "Difficulté à lâcher le contrôle",
      "Peut prendre la prudence des autres pour de la frilosité"
    ],
    team: [
      "Donne une direction claire quand le groupe hésite",
      "Fait avancer les sujets jusqu’à une décision",
      "Apporte énergie et concentration sur l’objectif",
      "Ose dire ce qui ne fonctionne pas",
      "Sait faire beaucoup avec des moyens limités",
      "Aborde les difficultés avec un état d’esprit combatif"
    ],
    communication: [
      "Aller droit au but",
      "Présenter d’abord la conclusion, puis les arguments",
      "Proposer des options avec leurs conséquences",
      "Être concis et avoir préparé le sujet",
      "Parler résultats, délais et responsabilités",
      "Exprimer clairement un désaccord plutôt que le taire",
      "Laisser {p} décider de la marche à suivre lorsque c’est son rôle"
    ],
    barriers: [
      "Tourner autour du pot",
      "Noyer l’essentiel dans les détails",
      "Hésiter longuement sans proposer de solution",
      "Faire perdre du temps en conversations sans objet",
      "Expliquer à {p} comment s’y prendre sans que la question ait été posée",
      "Chercher à obtenir son accord par la flatterie",
      "Manquer de fiabilité sur les délais"
    ],
    growth: [
      "Ralentir de temps en temps pour écouter vraiment",
      "Expliquer le raisonnement derrière ses décisions",
      "Exprimer plus souvent sa reconnaissance",
      "Inviter les personnes plus discrètes à donner leur avis",
      "Laisser aux autres une vraie marge de manœuvre",
      "Se demander quel effet produit son ton, en plus de son message"
    ],
    environment: [
      "Des objectifs ambitieux et clairement définis",
      "Un rythme soutenu et des décisions rapides",
      "Une grande autonomie d’action",
      "Des responsabilités réelles",
      "Peu de lourdeurs administratives",
      "Des collègues compétents et directs"
    ],
    management: [
      "Des objectifs clairs, sans ambiguïté",
      "De la latitude pour décider et agir",
      "Des réponses rapides et franches",
      "Des retours directs, sans précautions excessives",
      "Des défis à la hauteur de ses capacités",
      "Quelqu’un pour signaler, de temps en temps, que le rythme devient excessif"
    ],
    motivation: [
      "Les défis difficiles et les enjeux importants",
      "La possibilité de décider et d’en voir l’effet rapidement",
      "Un vrai pouvoir de décision sur son périmètre",
      "Des objectifs ambitieux, pour soi comme pour l’équipe",
      "La liberté d’action, avec peu de contrôle",
      "La perspective de gagner, de progresser, de dépasser un résultat"
    ],
    managementStyle: [
      "Fixe un cap clair et le tient",
      "Délègue rapidement et attend des résultats",
      "Arbitre sans tarder lorsque les avis divergent",
      "Concentre l’équipe sur les priorités",
      "Valorise la réactivité et l’initiative",
      "Peut imposer un rythme difficile à suivre"
    ],
    asOpposite: [
      "Les personnes de ce type vont vite, parlent franchement et veulent des résultats. Elles prennent naturellement les commandes et décident sans attendre que tout le monde soit d’accord. {p} peut les trouver dures ou pressées, alors qu’elles cherchent surtout à faire avancer les choses.",
      "Elles accordent plus d’importance à l’objectif qu’au climat et supportent mal les hésitations. Elles respectent les personnes qui disent clairement ce qu’elles pensent, même pour exprimer un désaccord. Avec elles, un « non » argumenté vaut mieux qu’un « oui » qui n’engage à rien."
    ],
    reachDo: [
      "Aller droit au but, en peu de mots",
      "Venir avec une proposition concrète",
      "Exprimer clairement son point de vue, y compris un désaccord",
      "Parler en termes de résultats et de délais",
      "Tenir ses engagements",
      "Leur laisser une marge de décision"
    ],
    reachAvoid: [
      "Laisser une décision traîner",
      "Multiplier les précautions avant d’en venir au fait",
      "Prendre leur franchise pour de l’hostilité",
      "Céder sur tout pour éviter le conflit",
      "Raconter des détails sans lien avec l’objectif",
      "Promettre ce qu’on ne pourra pas tenir"
    ]
  };

  TYPES["motivateur"] = {
    style: [
      "{p} met de l’énergie partout. Les projets avancent quand {p} s’en empare : il faut décider, convaincre, entraîner, et le faire vite. L’action et le résultat comptent avant tout, mais {p} sait aussi que pour aller loin, il faut que les autres suivent avec envie.",
      "Persuasion, présence et sens de l’opportunité caractérisent son style. {p} aime les défis visibles, la compétition saine et les situations où l’on peut faire bouger les lignes. La routine ennuie vite, et les longues analyses peuvent sembler un frein plus qu’une aide."
    ],
    relations: [
      "{p} entre facilement en contact et sait créer de l’enthousiasme autour d’un objectif. Le ton est franc, souvent chaleureux, parfois insistant. {p} attend des autres le même niveau d’engagement, et peut perdre patience face aux hésitations. Son influence est forte ; elle gagne encore à laisser plus d’espace aux personnes moins expansives."
    ],
    decisions: [
      "{p} décide vite, en s’appuyant sur son flair pour les opportunités autant que sur les faits. Le mouvement est préféré à l’attente : mieux vaut essayer et ajuster que laisser passer une occasion. Ce réflexe est précieux dans les contextes changeants, mais peut conduire à sous-estimer les risques ou les détails d’exécution."
    ],
    pressure:
      "Sous pression, le ton de {p} peut se faire plus insistant, au point de dominer l’échange. Les décisions se prennent encore plus vite, parfois sans consultation, et l’impatience se lit davantage. {p} risque alors de multiplier les initiatives sans en terminer aucune, ou de pousser l’équipe au-delà de ce qu’elle peut absorber.",
    blindSpots: [
      "L’énergie de {p} entraîne, mais elle peut aussi épuiser. Tout le monde n’a pas la même capacité à changer de cap rapidement, et certaines personnes ont besoin de stabilité pour bien travailler. Sans s’en rendre compte, {p} peut aller plus vite que ce que l’équipe est capable d’absorber.",
      "La conviction de {p} est contagieuse, mais elle peut aussi écraser les objections. Les personnes qui doutent hésitent parfois à le dire, de peur de passer pour des freins. Or leurs réserves contiennent souvent les informations qui éviteraient une erreur coûteuse."
    ],
    strengths: [
      "Capacité à entraîner les autres dans l’action",
      "Force de persuasion et présence",
      "Sens de l’opportunité",
      "Esprit de compétition stimulant",
      "Rapidité de décision et de mise en mouvement",
      "Optimisme face aux obstacles"
    ],
    weaknesses: [
      "Peut s’engager sur trop de sujets à la fois",
      "Impatience face aux analyses détaillées",
      "Tendance à dominer les échanges",
      "Peut sous-estimer les risques",
      "Suivi parfois insuffisant une fois l’élan retombé",
      "Peut vivre les objections comme une résistance"
    ],
    team: [
      "Remet un groupe en mouvement",
      "Crée de l’enthousiasme autour d’un objectif commun",
      "Ose prendre des initiatives",
      "Défend le projet à l’extérieur de l’équipe",
      "Transforme les obstacles en défis",
      "Garde le cap sur le résultat"
    ],
    communication: [
      "Adopter un ton direct et dynamique",
      "Mettre en avant les enjeux et les bénéfices",
      "Proposer des solutions plutôt que des problèmes",
      "Garder les échanges courts et vivants",
      "Saluer ses réussites devant les autres",
      "Lui laisser de la place pour s’exprimer et proposer",
      "Pouvoir décider pendant la discussion"
    ],
    barriers: [
      "Freiner un projet sans raison claire",
      "Présenter des détails sans lien avec l’objectif",
      "Se montrer pessimiste par principe",
      "Multiplier les procédures et les validations",
      "Rester passif ou indécis",
      "Ignorer ses idées ou ses initiatives",
      "Contredire {p} en public sans proposer d’alternative"
    ],
    growth: [
      "Terminer un projet avant d’en lancer un nouveau",
      "Accueillir les objections comme des informations utiles",
      "Prendre le temps de vérifier les détails importants",
      "Laisser les autres aller au bout de leur raisonnement",
      "Adapter son rythme à celui de l’équipe",
      "S’appuyer sur des personnes plus méthodiques pour le suivi"
    ],
    environment: [
      "Des défis stimulants et des résultats visibles",
      "Beaucoup de contacts et d’échanges",
      "Une grande liberté d’initiative",
      "Un rythme rapide et varié",
      "Un climat de réussite et de compétition saine",
      "Peu de routine et de lourdeurs administratives"
    ],
    management: [
      "Des objectifs ambitieux et une vraie marge de manœuvre",
      "De la reconnaissance pour ses réussites",
      "Des retours rapides et directs",
      "De l’aide pour structurer le suivi",
      "Des projets variés et stimulants",
      "Un cadre qui rappelle les priorités quand les initiatives se multiplient"
    ],
    motivation: [
      "Relever des défis ambitieux",
      "Avoir de l’influence et de la visibilité",
      "Voir rapidement l’effet de ses actions",
      "Gagner, dépasser un objectif",
      "Lancer de nouveaux projets",
      "Voir sa contribution reconnue"
    ],
    managementStyle: [
      "Entraîne l’équipe par l’exemple et l’énergie",
      "Fixe des objectifs ambitieux",
      "Délègue largement et fait confiance",
      "Célèbre les réussites",
      "Pousse à l’action plutôt qu’à l’analyse",
      "Peut négliger le suivi détaillé"
    ],
    asOpposite: [
      "Les personnes de ce type sont énergiques, persuasives et tournées vers l’action. Elles aiment les défis, la nouveauté et les résultats visibles. {p} peut les trouver envahissantes ou précipitées, alors qu’elles cherchent surtout à faire avancer les choses avec élan.",
      "Elles décident vite, changent facilement de cap et s’ennuient dans la routine. Les procédures détaillées leur semblent souvent un frein. Elles apprécient les interlocuteurs qui s’engagent, prennent position et partagent leur enthousiasme."
    ],
    reachDo: [
      "Montrer de l’intérêt pour leurs idées et leurs projets",
      "Faire court et aller à l’essentiel",
      "Proposer des solutions, pas seulement des risques",
      "Reconnaître leurs réussites",
      "Accepter un certain rythme et une part d’improvisation",
      "Présenter les points de vigilance comme des moyens de réussir"
    ],
    reachAvoid: [
      "Freiner chaque idée par une liste d’objections",
      "Entrer dans trop de détails",
      "Rester en retrait sans donner son avis",
      "Imposer des procédures sans en expliquer l’intérêt",
      "Montrer de l’indifférence à leurs succès",
      "Faire traîner une décision"
    ]
  };

  TYPES["inspirateur"] = {
    style: [
      "{p} aborde le travail avec enthousiasme et imagination. Les idées viennent vite, les possibilités se multiplient, et {p} sait les rendre désirables aux yeux des autres. L’énergie est contagieuse : là où {p} passe, l’ambiance change.",
      "Cette créativité s’accompagne d’une réelle envie d’agir. {p} n’aime pas que les idées restent sur le papier et préfère tester, ajuster, recommencer. La routine et les cadres trop rigides éteignent cette énergie ; la nouveauté, les rencontres et les projets ambitieux la ravivent."
    ],
    relations: [
      "{p} crée facilement le contact et met les gens à l’aise. La relation est au cœur de son style : {p} convainc par la conviction et la chaleur plus que par la démonstration. L’entourage apprécie sa spontanéité, même si elle peut parfois sembler dispersée. Les ambiances froides, la critique sèche et les échanges purement techniques sont mal vécus."
    ],
    decisions: [
      "{p} décide volontiers à l’intuition, en s’appuyant sur une vision d’ensemble et sur l’enthousiasme que suscite une idée. Les décisions sont rapides et souvent audacieuses. Le risque est de s’engager avant d’avoir mesuré tous les détails, ou de changer d’avis au gré des nouvelles idées."
    ],
    pressure:
      "Sous pression, {p} peut se disperser davantage, parler plus, ou au contraire devenir irritable. Les promesses se multiplient, l’organisation se relâche, et il devient difficile de distinguer ce qui est urgent de ce qui est simplement nouveau. Les critiques peuvent alors être vécues comme un rejet.",
    blindSpots: [
      "{p} promet volontiers, dans l’enthousiasme du moment. Les autres retiennent ces promesses bien plus longtemps qu’on ne le croit, et un suivi qui ne vient pas peut entamer la confiance. Ce qui n’était qu’une idée lancée en passant a parfois été reçu comme un engagement.",
      "Le flot d’idées de {p} stimule, mais peut aussi désorienter. Les personnes qui ont besoin de stabilité ou de clarté peuvent se sentir perdues lorsque les priorités changent souvent. Elles le disent rarement, et {p} peut prendre leur silence pour de l’adhésion."
    ],
    strengths: [
      "Enthousiasme communicatif",
      "Créativité et abondance d’idées",
      "Aisance relationnelle et sens du contact",
      "Capacité à rendre un projet désirable",
      "Optimisme et goût de l’aventure",
      "Souplesse face au changement"
    ],
    weaknesses: [
      "Tendance à se disperser",
      "Suivi parfois irrégulier des engagements",
      "Peut parler plus qu’écouter",
      "Difficulté avec les tâches répétitives et détaillées",
      "Sensibilité vive aux critiques",
      "Peut sous-estimer le temps nécessaire"
    ],
    team: [
      "Apporte élan et bonne humeur",
      "Génère des idées nouvelles",
      "Crée des liens entre les personnes",
      "Rend les projets attractifs",
      "Aide le groupe à sortir de l’impasse",
      "Accueille le changement avec optimisme"
    ],
    communication: [
      "Créer un climat chaleureux et ouvert",
      "Laisser de la place aux idées et à l’imagination",
      "Parler de la vision avant les détails",
      "Montrer de l’enthousiasme pour ses projets",
      "Garder un ton vivant et positif",
      "Mettre les détails par écrit après l’échange",
      "Reconnaître ses contributions devant les autres"
    ],
    barriers: [
      "Adopter un ton froid ou purement technique",
      "Critiquer ses idées avant de les avoir écoutées",
      "Imposer des procédures rigides",
      "Noyer l’échange sous les chiffres",
      "Ignorer sa présence ou sa contribution",
      "Étouffer la conversation par le pessimisme",
      "Exiger une réponse définitive immédiate sur un sujet encore ouvert"
    ],
    growth: [
      "Noter ses engagements et les suivre jusqu’au bout",
      "Écouter jusqu’au bout avant de répondre",
      "Choisir moins de projets et les mener à terme",
      "Prévoir du temps pour les détails",
      "Accueillir les critiques comme une aide au projet",
      "Vérifier que les autres suivent avant d’avancer"
    ],
    environment: [
      "De la variété et de la nouveauté",
      "Beaucoup d’échanges et de travail collectif",
      "De la liberté dans la manière de travailler",
      "Une ambiance positive et chaleureuse",
      "Des occasions de présenter et de convaincre",
      "Peu de contrôle détaillé"
    ],
    management: [
      "De la reconnaissance et des encouragements",
      "Une liberté d’organisation réelle",
      "Des points réguliers mais légers pour le suivi",
      "De l’aide pour fixer les priorités",
      "Des projets qui ont du sens et de la visibilité",
      "Un interlocuteur qui écoute ses idées"
    ],
    motivation: [
      "La nouveauté et la variété",
      "La possibilité d’inspirer et de convaincre",
      "Le travail avec des personnes enthousiastes",
      "La reconnaissance publique",
      "La liberté de créer et d’expérimenter",
      "Les projets qui ont un impact visible"
    ],
    managementStyle: [
      "Inspire par une vision enthousiasmante",
      "Encourage les initiatives et l’expérimentation",
      "Crée une ambiance positive",
      "Associe l’équipe à l’élaboration des idées",
      "Délègue volontiers",
      "Peut manquer de rigueur dans le suivi"
    ],
    asOpposite: [
      "Les personnes de ce type sont expressives, enthousiastes et pleines d’idées. Elles aiment les échanges, la nouveauté et les projets qui ont du souffle. {p} peut les trouver superficielles ou désorganisées, alors qu’elles cherchent surtout à donner de l’élan et à créer du lien.",
      "Elles pensent souvent à voix haute, décident à l’intuition et se lassent vite des détails. Une réponse froide ou une critique sèche les touche davantage qu’il n’y paraît. Elles apprécient qu’on s’intéresse à leurs idées avant d’en examiner les limites."
    ],
    reachDo: [
      "Montrer de l’intérêt pour leurs idées",
      "Accepter une part de spontanéité dans l’échange",
      "Commencer par ce qui est positif",
      "Garder un ton chaleureux",
      "Proposer de mettre les détails par écrit après la discussion",
      "Reconnaître leur contribution devant les autres"
    ],
    reachAvoid: [
      "Démarrer par une liste de problèmes",
      "Les noyer sous les chiffres et les détails",
      "Adopter un ton froid ou distant",
      "Rejeter une idée sans l’avoir écoutée",
      "Imposer un cadre rigide sans explication",
      "Ignorer leur besoin de reconnaissance"
    ]
  };

  TYPES["conseiller"] = {
    style: [
      "{p} accorde une grande place aux personnes. Le travail a du sens lorsqu’il se fait ensemble, dans une ambiance de confiance où chacun trouve sa place. {p} sait encourager, rassurer et mettre en valeur les talents des autres.",
      "Cette attention aux personnes s’accompagne d’une vraie ouverture d’esprit. {p} aime les idées nouvelles quand elles servent le collectif, et sait les présenter de façon accessible. Les ambiances conflictuelles ou trop froides pèsent sur son énergie, tandis qu’un climat chaleureux la décuple."
    ],
    relations: [
      "{p} établit facilement des relations sincères et durables. L’écoute est réelle, l’empathie spontanée, et les autres viennent volontiers chercher conseil ou soutien. {p} préfère convaincre par le dialogue que par l’autorité, et peut avoir du mal à dire non ou à imposer une décision impopulaire."
    ],
    decisions: [
      "{p} décide en tenant compte des personnes concernées et de leurs ressentis. Une décision juste doit aussi être acceptable pour celles et ceux qui la vivront. {p} aime consulter, recueillir des avis, chercher le consensus. Cette prudence relationnelle évite bien des erreurs, mais peut retarder les choix difficiles."
    ],
    pressure:
      "Sous pression, {p} peut chercher à préserver l’harmonie à tout prix : éviter le conflit, accepter des demandes de trop, taire un désaccord. La fatigue s’accumule alors sans se dire. Si la tension persiste, les critiques risquent d’être vécues comme des attaques personnelles.",
    blindSpots: [
      "{p} évite parfois les vérités difficiles pour protéger la relation. Les autres ne reçoivent alors pas les informations dont ils auraient besoin pour progresser, et les problèmes s’installent. Un désaccord exprimé tôt et avec tact est souvent plus bienveillant qu’un silence prolongé.",
      "À force de se rendre disponible, {p} peut s’oublier. Les autres ne voient pas toujours la charge que représentent ces sollicitations, et {p} en parle rarement. Cette générosité peut aussi être perçue comme un manque de fermeté lorsqu’un cadre clair serait nécessaire."
    ],
    strengths: [
      "Écoute sincère et empathie",
      "Capacité à encourager et à mettre en valeur les autres",
      "Création d’un climat de confiance",
      "Sens du collectif et de la coopération",
      "Ouverture aux idées et aux personnes différentes",
      "Talent pour apaiser les tensions"
    ],
    weaknesses: [
      "Difficulté à dire non",
      "Tendance à éviter les conflits nécessaires",
      "Peut prendre les critiques trop personnellement",
      "Décisions parfois retardées par la recherche du consensus",
      "Peut manquer de fermeté",
      "Risque de s’épuiser en aidant les autres"
    ],
    team: [
      "Veille à ce que chacun trouve sa place",
      "Encourage et soutient les collègues en difficulté",
      "Facilite la coopération",
      "Désamorce les tensions",
      "Apporte une atmosphère chaleureuse",
      "Fait le lien entre les personnes et les idées"
    ],
    communication: [
      "Prendre le temps d’un échange personnel",
      "Montrer un intérêt sincère",
      "Expliquer l’impact d’une décision sur les personnes",
      "Exprimer les désaccords avec tact",
      "Laisser le temps de consulter les autres",
      "Valoriser sa contribution au collectif",
      "Garder un ton chaleureux, même pour parler de problèmes"
    ],
    barriers: [
      "Adopter un ton brusque ou impersonnel",
      "Critiquer en public",
      "Ignorer la dimension humaine d’un sujet",
      "Imposer une décision sans consultation",
      "Mettre en doute la sincérité de ses intentions",
      "Créer une ambiance de compétition agressive",
      "Ne parler que de chiffres et de performances"
    ],
    growth: [
      "Oser dire non lorsque c’est nécessaire",
      "Exprimer un désaccord plus tôt",
      "Distinguer la critique d’un travail de la critique d’une personne",
      "Se fixer des limites de disponibilité",
      "Accepter qu’une bonne décision puisse déplaire",
      "Appuyer ses arguments sur des faits"
    ],
    environment: [
      "Une ambiance chaleureuse et coopérative",
      "Des relations de confiance",
      "Un travail qui aide concrètement les autres",
      "Des échanges réguliers avec l’équipe",
      "Peu de compétition interne",
      "Une reconnaissance de la contribution de chacun"
    ],
    management: [
      "Un climat de confiance et de respect",
      "Des encouragements réguliers",
      "Des retours formulés avec tact",
      "Du temps pour consulter avant de décider",
      "De l’aide pour poser des limites",
      "Une reconnaissance personnelle de son engagement"
    ],
    motivation: [
      "Aider les autres à réussir",
      "Faire partie d’une équipe soudée",
      "Travailler sur des projets porteurs de sens",
      "Sentir sa contribution appréciée",
      "Créer du lien et de la coopération",
      "Pouvoir faire évoluer les choses de façon humaine"
    ],
    managementStyle: [
      "Accompagne et fait grandir les personnes",
      "Encourage la participation de chacun",
      "Crée un climat de confiance",
      "Recherche le consensus",
      "Reconnaît les efforts autant que les résultats",
      "Peut repousser les décisions difficiles"
    ],
    asOpposite: [
      "Les personnes de ce type sont chaleureuses, attentives et tournées vers les autres. Elles veulent de bonnes relations, au travail comme ailleurs, et accordent autant d’importance à la manière qu’au résultat. {p} peut les trouver trop sensibles ou trop lentes à trancher, alors qu’elles cherchent surtout à embarquer tout le monde.",
      "Elles vivent souvent la critique comme une remise en cause personnelle, et ont du mal à imposer une décision impopulaire. Elles aiment consulter, chercher le consensus, et se méfient des raisonnements purement logiques qui oublient les personnes. Elles donnent volontiers de leur temps, sans attendre de retour."
    ],
    reachDo: [
      "Prendre quelques minutes pour la personne avant de parler du dossier",
      "Montrer de l’intérêt pour leurs idées et leur vision",
      "Expliquer l’effet d’une décision sur les personnes",
      "Dire concrètement ce que leur présence apporte à l’équipe",
      "Formuler les critiques en privé et avec tact",
      "Laisser une place à la discussion informelle"
    ],
    reachAvoid: [
      "Être catégorique, sans laisser de place à la discussion",
      "Ne parler que des faits sans jamais évoquer les personnes",
      "Les reprendre devant les autres",
      "Écarter leurs propositions sans les examiner",
      "Presser une décision sans leur laisser le temps de consulter",
      "Prendre leur sensibilité pour de la faiblesse"
    ]
  };

  TYPES["supporteur"] = {
    style: [
      "{p} apporte de la stabilité et de la bienveillance à son environnement de travail. La fiabilité, la loyauté et l’attention aux autres sont au cœur de son style. {p} préfère avancer à un rythme régulier, en s’assurant que personne ne reste au bord du chemin.",
      "{p} trouve sa satisfaction dans le fait d’être utile et de contribuer à une dynamique saine. Les changements brusques, les conflits ouverts et la compétition agressive sont mal vécus ; un cadre stable et des relations de confiance permettent au contraire à {p} de déployer une grande constance et une vraie générosité."
    ],
    relations: [
      "{p} est une personne à l’écoute, patiente et disponible. Les relations se construisent dans la durée, sur la confiance et le respect mutuel. {p} perçoit finement l’état émotionnel des autres et cherche spontanément à les soutenir. Exprimer un désaccord est en revanche plus difficile : {p} préfère souvent le garder pour soi plutôt que risquer de froisser."
    ],
    decisions: [
      "{p} prend ses décisions avec soin, en tenant compte des valeurs en jeu et de l’impact sur les personnes. Le temps de réflexion est important, surtout lorsque le changement touche l’équipe. Une fois la décision prise, {p} s’y tient avec loyauté. Le risque est de différer un choix nécessaire pour préserver l’harmonie."
    ],
    pressure:
      "Sous pression, {p} peut se replier et parler beaucoup moins. Les désaccords non exprimés s’accumulent, l’entêtement peut remplacer la souplesse habituelle, et {p} peut résister passivement à des changements imposés sans concertation. La fatigue vient alors d’avoir trop donné sans le dire.",
    blindSpots: [
      "{p} garde souvent pour soi ses réserves et ses besoins. Les autres peuvent en conclure que tout va bien, jusqu’au jour où la tension accumulée se manifeste de façon inattendue. Ce qui n’a pas été dit ne peut pas être pris en compte.",
      "L’attachement de {p} aux façons de faire éprouvées peut être perçu comme de la résistance au changement. Ce n’est souvent qu’un besoin de comprendre et de donner son avis. Mais vu de l’extérieur, le silence ou la lenteur peuvent passer pour un désaccord, voire un manque d’engagement."
    ],
    strengths: [
      "Loyauté et fiabilité dans la durée",
      "Patience et écoute attentive",
      "Capacité à soutenir les autres",
      "Constance et régularité dans l’effort",
      "Sensibilité aux besoins de chacun",
      "Aptitude à créer un climat serein"
    ],
    weaknesses: [
      "Difficulté à exprimer un désaccord",
      "Résistance aux changements rapides",
      "Tendance à s’effacer au profit des autres",
      "Peut éviter les décisions impopulaires",
      "Peut accepter trop de demandes",
      "Lenteur à réagir dans l’urgence"
    ],
    team: [
      "Apporte stabilité et continuité",
      "Soutient les collègues dans les moments difficiles",
      "Assure le suivi avec constance",
      "Préserve un climat de confiance",
      "Fait passer l’intérêt collectif avant le sien",
      "Garde la mémoire des engagements et des personnes"
    ],
    communication: [
      "Adopter un ton calme et bienveillant",
      "Prendre le temps d’expliquer le pourquoi d’un changement",
      "Prévenir à l’avance des évolutions",
      "Demander explicitement son avis",
      "Laisser du temps pour réfléchir avant de répondre",
      "Montrer un intérêt sincère pour la personne",
      "Être concret sur ce qui est attendu"
    ],
    barriers: [
      "Imposer un changement brutal",
      "Élever la voix ou montrer de l’agressivité",
      "Exiger une réponse immédiate",
      "Critiquer devant les autres",
      "Ignorer ses réserves parce qu’elles sont exprimées doucement",
      "Rompre un engagement sans explication",
      "Mettre en concurrence les membres de l’équipe"
    ],
    growth: [
      "Exprimer ses désaccords plus tôt et plus clairement",
      "Accepter certains changements avant d’avoir toutes les réponses",
      "Défendre ses propres besoins",
      "Apprendre à dire non sans culpabilité",
      "Prendre la parole en réunion, même brièvement",
      "Voir le conflit comme une étape vers une meilleure solution"
    ],
    environment: [
      "Un cadre stable et prévisible",
      "Des relations de confiance durables",
      "Une ambiance calme et coopérative",
      "Du temps pour bien faire les choses",
      "Des changements annoncés et expliqués",
      "Une reconnaissance discrète mais sincère"
    ],
    management: [
      "Des changements préparés et expliqués",
      "Un interlocuteur disponible et à l’écoute",
      "Des encouragements sincères",
      "Des attentes claires et stables",
      "Une invitation explicite à exprimer ses désaccords",
      "De l’aide pour fixer des limites à ses engagements"
    ],
    motivation: [
      "Se sentir utile aux autres",
      "Faire partie d’une équipe soudée",
      "La stabilité et la sécurité",
      "Une reconnaissance sincère de son travail",
      "Des relations de confiance",
      "Contribuer à quelque chose de durable"
    ],
    managementStyle: [
      "Soutient et protège son équipe",
      "Crée un climat stable et rassurant",
      "Écoute avant de décider",
      "Reste disponible et accessible",
      "Préfère l’accompagnement au contrôle",
      "Peut tarder à recadrer"
    ],
    asOpposite: [
      "Les personnes de ce type sont calmes, patientes et loyales. Elles avancent à un rythme régulier, attachent beaucoup d’importance aux relations et à la stabilité, et préfèrent l’accord à l’affrontement. {p} peut les trouver lentes ou trop prudentes, alors qu’elles cherchent surtout à faire les choses bien, et ensemble.",
      "Elles disent rarement leur désaccord en face ; un silence n’est pas toujours une approbation. Les changements brusques et les ordres secs les déstabilisent. Elles s’engagent pleinement lorsqu’elles se sentent respectées, consultées et en confiance."
    ],
    reachDo: [
      "Ralentir et prendre le temps d’échanger",
      "Expliquer les raisons d’un changement",
      "Demander leur avis et l’écouter vraiment",
      "Les prévenir à l’avance",
      "Adopter un ton calme et respectueux",
      "Reconnaître leur fiabilité et leur loyauté"
    ],
    reachAvoid: [
      "Donner des ordres secs",
      "Exiger une décision immédiate",
      "Interpréter leur silence comme un accord",
      "Imposer un changement sans préparation",
      "Les bousculer devant les autres",
      "Négliger la relation au profit de l’objectif"
    ]
  };

  TYPES["coordinateur"] = {
    style: [
      "{p} travaille avec calme, méthode et sens du service. La qualité de l’organisation compte autant que la qualité des relations : {p} aime que les choses soient prévues, que chacun sache ce qu’on attend de lui, et que l’équipe puisse avancer sans à-coups.",
      "{p} est une personne fiable, sur laquelle on peut s’appuyer dans la durée. Les procédures claires, les engagements tenus et les changements bien préparés lui permettent de donner le meilleur. L’agitation permanente, les décisions improvisées et les conflits ouverts épuisent en revanche son énergie."
    ],
    relations: [
      "{p} construit des relations sobres, loyales et durables. L’attention aux autres est réelle mais s’exprime surtout par des actes : rendre service, préparer, anticiper. {p} n’aime pas se mettre en avant et peut rester en retrait dans les groupes nombreux ou les échanges animés."
    ],
    decisions: [
      "{p} décide après réflexion, en s’appuyant sur les faits, l’expérience et l’effet probable sur l’équipe. Les décisions doivent être solides et soutenables. {p} a besoin de temps et d’informations pour se prononcer, et se méfie des choix précipités. Le revers est une certaine lenteur lorsque l’urgence exigerait de trancher vite."
    ],
    pressure:
      "Sous pression, {p} peut se raidir sur les procédures et résister aux changements qui bousculent l’organisation. Le besoin de contrôle augmente, la communication se réduit et l’inquiétude prend plus de place. Les tâches s’accumulent parfois en silence au lieu d’être partagées.",
    blindSpots: [
      "{p} protège tellement la stabilité de l’équipe qu’il arrive que des décisions nécessaires soient repoussées. Ce qui semble de la prudence peut être vécu par d’autres comme de l’immobilisme. Les personnes plus rapides peuvent s’impatienter sans le dire.",
      "La discrétion de {p} prive parfois le groupe d’analyses précieuses. {p} voit souvent les risques avant les autres, mais attend qu’on lui demande son avis pour les signaler. L’entourage peut alors croire, à tort, que tout va bien."
    ],
    strengths: [
      "Organisation et sens de la méthode",
      "Fiabilité et loyauté",
      "Calme dans les situations tendues",
      "Attention aux détails pratiques",
      "Sens du service",
      "Capacité à faire travailler les gens ensemble sans heurts"
    ],
    weaknesses: [
      "Résistance aux changements imprévus",
      "Peut manquer d’assurance pour défendre sa position",
      "Tendance à trop vérifier avant d’agir",
      "Peut rester en retrait dans les débats",
      "Difficulté à trancher dans l’urgence",
      "Peut s’attacher à des procédures dépassées"
    ],
    team: [
      "Organise et coordonne les tâches",
      "Assure la continuité et le suivi",
      "Anticipe les besoins pratiques",
      "Garantit des processus fiables",
      "Apporte calme et stabilité",
      "Fait le lien entre les personnes et l’organisation"
    ],
    communication: [
      "Formuler des demandes organisées et précises",
      "Annoncer à l’avance l’ordre du jour",
      "Laisser le temps de préparer une réponse",
      "Expliquer le contexte et les étapes",
      "Garder un ton calme et respectueux",
      "Confirmer par écrit ce qui a été décidé",
      "Solliciter son avis explicitement"
    ],
    barriers: [
      "Changer de plan au dernier moment",
      "Exiger une décision sans information",
      "Faire preuve d’agressivité ou d’impatience",
      "Négliger les engagements pris",
      "Couper la parole",
      "Mélanger les sujets sans structure",
      "Minimiser l’importance des procédures"
    ],
    growth: [
      "Partager ses analyses sans attendre qu’on les demande",
      "Accepter une part d’imprévu",
      "Prendre position plus tôt dans les débats",
      "Tester une nouveauté à petite échelle plutôt que la refuser",
      "Déléguer certaines vérifications",
      "Exprimer plus clairement ses besoins"
    ],
    environment: [
      "Un cadre organisé et prévisible",
      "Des rôles et des processus clairs",
      "Une équipe coopérative et loyale",
      "Du temps pour préparer et vérifier",
      "Peu de conflits ouverts",
      "Des changements planifiés"
    ],
    management: [
      "Des consignes claires et stables",
      "Du temps pour s’organiser",
      "Une information en amont des changements",
      "Un climat de travail calme",
      "Une reconnaissance de sa fiabilité",
      "Des encouragements à prendre la parole"
    ],
    motivation: [
      "Un travail bien organisé et utile",
      "La qualité du service rendu",
      "La stabilité de l’équipe",
      "Des objectifs clairs et atteignables",
      "La confiance de sa hiérarchie",
      "La possibilité d’améliorer progressivement les processus"
    ],
    managementStyle: [
      "Organise et planifie avec soin",
      "Met en place des routines utiles",
      "Veille au bien-être de l’équipe",
      "Délègue avec des consignes précises",
      "Préfère la concertation à l’affrontement",
      "Peut hésiter à imposer une décision"
    ],
    asOpposite: [
      "Les personnes de ce type sont calmes, organisées et loyales. Elles aiment prévoir, préparer et avancer de manière méthodique, en veillant à ce que personne ne soit laissé de côté. {p} peut les trouver lentes ou trop attachées aux procédures, alors qu’elles cherchent surtout à faire les choses de manière fiable.",
      "Les changements de cap soudains, les décisions improvisées et les échanges trop intenses les mettent mal à l’aise. Elles parlent peu en réunion mais ont souvent repéré des points importants. Elles s’engagent pleinement lorsqu’on leur laisse le temps de comprendre et de s’organiser."
    ],
    reachDo: [
      "Préparer ses propositions et les structurer",
      "Annoncer les changements à l’avance",
      "Leur laisser le temps de réfléchir",
      "Demander explicitement leur avis",
      "Garder un rythme et un ton posés",
      "Respecter les engagements et les processus convenus"
    ],
    reachAvoid: [
      "Changer d’avis sans prévenir",
      "Monopoliser la parole",
      "Exiger une réponse immédiate",
      "Prendre leur prudence pour un manque d’ambition",
      "Lancer trop d’idées à la fois",
      "Ignorer les procédures convenues"
    ]
  };

  TYPES["observateur"] = {
    style: [
      "{p} observe avant d’agir. Comprendre en profondeur, réunir les informations, peser les options : c’est ainsi que {p} construit des décisions solides. Le travail est soigné, précis, et rarement laissé au hasard.",
      "Cette rigueur s’accompagne d’une attention discrète aux personnes. {p} n’aime pas se mettre en avant, préfère les échanges posés et les environnements calmes, mais reste à l’écoute de ce que vivent les autres. Les situations bruyantes, précipitées ou mal préparées sont celles où {p} se sent le moins à sa place."
    ],
    relations: [
      "{p} préfère un petit nombre de relations solides à un vaste réseau. La confiance se gagne avec le temps, par la cohérence et le respect. {p} parle peu de soi et peut sembler sur la réserve au premier abord. Une fois la relation établie, {p} se révèle une personne loyale, attentive et de bon conseil."
    ],
    decisions: [
      "{p} décide après une analyse approfondie. Les faits, les risques et les conséquences sont examinés avec soin, et {p} préfère prendre le temps d’une bonne décision plutôt que de se précipiter. La pression du temps est mal vécue. Le risque est de retarder une décision dans l’attente d’une information qui n’arrivera peut-être jamais."
    ],
    pressure:
      "Sous pression, {p} a tendance à se retirer, à multiplier les vérifications et à chercher davantage de certitudes. Le perfectionnisme se renforce, la communication se raréfie et le regard critique se durcit, envers soi comme envers les autres. Le besoin de calme et de temps devient pressant.",
    blindSpots: [
      "{p} garde souvent ses analyses pour soi tant qu’elles ne sont pas parfaitement abouties. Les autres ignorent alors ce que {p} a déjà compris, et peuvent décider sans ces éclairages. Un avis partagé tôt, même incomplet, est souvent plus utile qu’une analyse parfaite livrée trop tard.",
      "La réserve de {p} peut être interprétée comme de la distance, voire du désintérêt. Les autres ne savent pas toujours ce que {p} pense ou ressent, et comblent ce silence par leurs propres suppositions. Un mot de plus, au bon moment, éviterait bien des malentendus."
    ],
    strengths: [
      "Analyse approfondie et rigoureuse",
      "Précision et souci de la qualité",
      "Prudence face aux risques",
      "Écoute attentive et discrète",
      "Capacité à travailler de façon autonome et concentrée",
      "Jugement réfléchi et pondéré"
    ],
    weaknesses: [
      "Tendance à trop analyser avant d’agir",
      "Difficulté à décider sous la pression du temps",
      "Réserve parfois perçue comme de la distance",
      "Partage tardif de ses idées",
      "Perfectionnisme qui ralentit le travail",
      "Peut éviter la confrontation directe"
    ],
    team: [
      "Apporte rigueur et esprit critique",
      "Vérifie la qualité et la cohérence du travail",
      "Repère les risques et les incohérences",
      "Apporte un regard posé dans les débats animés",
      "Documente et structure l’information",
      "Fait preuve de discrétion et de loyauté"
    ],
    communication: [
      "Préparer ses arguments et ses données",
      "Envoyer les documents à l’avance",
      "Laisser du temps de réflexion",
      "S’en tenir aux faits, avec précision",
      "Garder un ton calme",
      "Respecter son besoin de discrétion",
      "Poser des questions ouvertes pour connaître son avis"
    ],
    barriers: [
      "Exiger une réponse immédiate",
      "Rester vague ou approximatif",
      "Mettre la pression en public",
      "Envahir son espace personnel",
      "Parler fort ou occuper tout l’espace",
      "Changer les règles sans prévenir",
      "Prendre ses questions pour de la méfiance"
    ],
    growth: [
      "Partager ses idées plus tôt",
      "Accepter de décider avec une information incomplète",
      "Prendre la parole dans les réunions",
      "Exprimer davantage ses ressentis",
      "Distinguer le niveau de qualité nécessaire du niveau idéal",
      "Aller plus souvent vers les autres"
    ],
    environment: [
      "Un environnement calme et propice à la concentration",
      "Du temps pour analyser",
      "Des informations fiables et complètes",
      "Des attentes claires",
      "Des relations de travail respectueuses",
      "Un cadre stable"
    ],
    management: [
      "Du temps pour réfléchir avant de décider",
      "Des informations précises et complètes",
      "Des retours factuels et respectueux",
      "Un environnement calme",
      "Une invitation explicite à donner son avis",
      "Une reconnaissance de la qualité de son analyse"
    ],
    motivation: [
      "Comprendre en profondeur",
      "Produire un travail de qualité",
      "Résoudre des problèmes complexes",
      "Travailler avec autonomie",
      "Que l’on fasse appel à son expertise",
      "Un cadre clair et cohérent"
    ],
    managementStyle: [
      "Planifie avec soin",
      "Fonde ses décisions sur l’analyse",
      "Respecte l’autonomie de chacun",
      "Veille à la qualité",
      "Communique de façon mesurée",
      "Peut tarder à intervenir"
    ],
    asOpposite: [
      "Les personnes de ce type sont réfléchies, précises et réservées. Elles veulent comprendre avant d’agir, préfèrent l’écrit à l’improvisation et ont besoin de calme pour bien travailler. {p} peut les trouver lentes ou froides, alors qu’elles cherchent surtout à ne rien laisser au hasard.",
      "Elles se méfient de l’enthousiasme qui ne s’appuie pas sur des faits, et des décisions prises dans l’euphorie du moment. Elles parlent peu d’elles-mêmes, mais leur analyse est souvent juste. Elles apprécient qu’on leur laisse le temps de réfléchir et qu’on respecte leur espace."
    ],
    reachDo: [
      "Préparer ses idées avec des faits",
      "Envoyer les informations avant la réunion",
      "Leur laisser du temps pour répondre",
      "Parler calmement et posément",
      "Respecter leur besoin de discrétion",
      "Tenir compte de leurs objections"
    ],
    reachAvoid: [
      "Les submerger d’enthousiasme sans arguments",
      "Les mettre en avant sans les prévenir",
      "Exiger une réponse immédiate",
      "Adopter un ton trop familier",
      "Passer d’un sujet à l’autre sans structure",
      "Tourner en dérision leurs questions ou leurs doutes"
    ]
  };

  // Courte description de chaque type, affichée à côté de la roue.
  var TYPE_SUMMARIES = {
    "reformateur": "Rigueur et sens du résultat. Cherche à rendre les choses plus solides, plus claires et plus fiables, avec des standards élevés.",
    "directeur": "Décision et maîtrise. Avance vite vers l’objectif, prend les commandes et veut des solutions qui tiennent.",
    "motivateur": "Énergie et persuasion. Met les projets en mouvement, entraîne les autres et aime relever des défis visibles.",
    "inspirateur": "Enthousiasme et créativité. Fait naître des idées, les rend désirables et donne de l’élan au collectif.",
    "conseiller": "Chaleur et encouragement. Crée du lien, met en valeur les personnes et cherche l’adhésion de chacun.",
    "supporteur": "Soutien et loyauté. Apporte stabilité, écoute et patience, et veille à ce que personne ne soit laissé de côté.",
    "coordinateur": "Organisation et fiabilité. Avance avec méthode et calme, et rend le travail collectif plus sûr et plus fluide.",
    "observateur": "Réflexion et précision. Observe avant d’agir, analyse en profondeur et vise un travail soigné."
  };

  // ---------------------------------------------------------------------
  // Les 16 demi-types : clé « type>voisin »
  // ---------------------------------------------------------------------
  var LEANS = {
    "reformateur>directeur": {
      headline: "Rigueur et sens du résultat : {p} veut que les choses soient bien faites, et qu’elles avancent.",
      style: "Dans son profil, l’exigence de qualité se double d’un net goût pour l’action. {p} ne se contente pas d’identifier ce qui doit être amélioré : il faut que cela change, et vite. Cette combinaison donne une grande efficacité face aux problèmes concrets et aux imprévus, mais peut aussi rendre l’impatience visible face aux personnes moins organisées.",
      blindSpot: "L’association de l’exigence et de la vitesse peut donner aux autres le sentiment d’être jugés en permanence, sans toujours savoir précisément ce qui est attendu.",
      strengths: ["Capacité à identifier et traiter rapidement les problèmes clés", "Refus des solutions à moitié satisfaisantes"],
      weaknesses: ["Ton parfois sec ou tranchant"],
      team: ["Transforme les constats en plans d’action"],
      communication: ["Annoncer clairement l’objectif et l’échéance", "Montrer comment une proposition améliore le résultat"],
      barriers: ["Laisser traîner un problème identifié"],
      growth: ["Prendre un temps pour écouter avant de corriger"],
      environment: ["Un rythme soutenu où les améliorations se voient vite"],
      management: ["Des arbitrages nets et rapides"],
      motivation: ["La responsabilité d’un résultat mesurable"],
      managementStyle: ["Suit de près la mise en œuvre des décisions"]
    },
    "reformateur>observateur": {
      headline: "Rigueur et réflexion : {p} veut comprendre à fond avant d’améliorer durablement.",
      style: "Dans son profil, l’exigence de qualité s’accompagne d’un besoin marqué de réflexion. {p} prend le temps d’analyser, de vérifier et de structurer, et préfère une solution juste à une solution rapide. Le recul et la prudence sont des atouts ; ils peuvent aussi ralentir le passage à l’action.",
      blindSpot: "En réexaminant ses idées jusqu’à ce qu’elles soient irréprochables, {p} prive parfois les autres d’un apport qui aurait été utile plus tôt.",
      strengths: ["Profondeur d’analyse et rigueur intellectuelle", "Capacité à concevoir des solutions durables"],
      weaknesses: ["Peut retarder une décision par excès de vérification"],
      team: ["Garantit la solidité des solutions retenues"],
      communication: ["Fournir les données et le raisonnement complets", "Laisser le temps d’étudier les documents"],
      barriers: ["Demander une décision avant d’avoir partagé les éléments"],
      growth: ["Partager une première version avant qu’elle soit parfaite"],
      environment: ["Des moments de travail concentré, sans interruption"],
      management: ["Le temps d’étudier les options avant de trancher"],
      motivation: ["Approfondir un sujet jusqu’à le maîtriser"],
      managementStyle: ["Prépare minutieusement avant de lancer l’action"]
    },
    "directeur>reformateur": {
      headline: "Décision et rigueur : {p} avance vite, mais sur des bases solides.",
      style: "Dans son profil, la détermination s’appuie sur une forte exigence de rigueur. {p} décide vite, mais pas à la légère : les faits, la logique et la qualité d’exécution comptent. Le résultat recherché n’est pas seulement rapide, il doit aussi être durable.",
      blindSpot: "L’exigence que {p} s’impose est souvent appliquée aux autres sans être formulée, ce qui crée des attentes implicites difficiles à satisfaire.",
      strengths: ["Combinaison rare de rapidité et de rigueur", "Capacité à structurer l’action"],
      weaknesses: ["Exigence parfois perçue comme de l’intransigeance"],
      team: ["Fixe un cap et des standards clairs"],
      communication: ["Appuyer ses propositions sur des faits précis", "Exposer clairement les risques et les solutions"],
      barriers: ["Présenter une idée approximative comme une certitude"],
      growth: ["Expliquer ses critères de qualité avant de juger un travail"],
      environment: ["Des projets à fort enjeu où la qualité compte"],
      management: ["Des interlocuteurs solides et bien préparés"],
      motivation: ["Mener un projet exigeant jusqu’à sa réussite complète"],
      managementStyle: ["Contrôle les points clés sans perdre de vue l’objectif"]
    },
    "directeur>motivateur": {
      headline: "Décision et énergie : {p} prend les commandes et entraîne le mouvement.",
      style: "Dans son profil, la détermination se colore d’une énergie plus expressive. {p} décide vite, s’engage pleinement et sait mobiliser son entourage. L’ambition est forte, le goût du défi aussi, et les situations bloquées sont vécues comme des occasions d’agir.",
      blindSpot: "L’intensité de {p} peut prendre beaucoup de place dans un groupe, au point que d’autres renoncent à s’exprimer.",
      strengths: ["Capacité à prendre des risques calculés", "Énergie mobilisatrice"],
      weaknesses: ["Peut imposer son rythme à tout le monde"],
      team: ["Lance l’action quand le groupe hésite"],
      communication: ["Parler défis et ambitions", "Accepter un échange rapide et franc"],
      barriers: ["Ralentir l’action sans raison claire"],
      growth: ["Laisser de la place aux idées des autres avant de trancher"],
      environment: ["Des défis ambitieux et une part de compétition"],
      management: ["De la liberté d’action et des objectifs ambitieux"],
      motivation: ["Relever des défis que d’autres jugent impossibles"],
      managementStyle: ["Mobilise l’équipe autour d’objectifs ambitieux"]
    },
    "motivateur>directeur": {
      headline: "Énergie et détermination : {p} pousse les projets avec force jusqu’au résultat.",
      style: "Dans son profil, l’énergie relationnelle est mise au service d’une forte volonté de résultat. {p} sait convaincre, mais surtout faire aboutir. Les objectifs sont ambitieux, les décisions rapides, et la compétition stimule plutôt qu’elle n’inquiète.",
      blindSpot: "La volonté de gagner peut prendre le pas sur l’écoute, et transformer une discussion en rapport de force.",
      strengths: ["Force de conviction tournée vers le résultat", "Capacité à décider dans l’incertitude"],
      weaknesses: ["Insistance parfois pesante"],
      team: ["Fait passer les projets de l’idée à la réalisation"],
      communication: ["Présenter des objectifs ambitieux et concrets", "Montrer ce qu’il y a à gagner"],
      barriers: ["Rester dans le vague sur les objectifs"],
      growth: ["Vérifier l’adhésion de l’équipe avant d’accélérer"],
      environment: ["Des objectifs ambitieux et des résultats visibles"],
      management: ["Des objectifs chiffrés et des responsabilités larges"],
      motivation: ["Gagner, et faire gagner l’équipe"],
      managementStyle: ["Pousse l’équipe vers des objectifs ambitieux"]
    },
    "motivateur>inspirateur": {
      headline: "Énergie et enthousiasme : {p} entraîne les autres par la conviction et l’élan.",
      style: "Dans son profil, l’orientation vers l’action s’accompagne d’une forte dimension relationnelle. {p} aime convaincre, rassembler et donner envie. L’énergie est contagieuse, l’optimisme aussi, et les idées nouvelles trouvent en {p} un soutien ardent.",
      blindSpot: "L’optimisme de {p} peut conduire à minimiser les difficultés, et à annoncer des délais que l’équipe aura du mal à tenir.",
      strengths: ["Talent pour rallier les autres à une idée", "Optimisme entraînant"],
      weaknesses: ["Peut s’engager avant d’avoir mesuré les contraintes"],
      team: ["Donne envie de s’engager"],
      communication: ["Partager l’enthousiasme pour le projet", "Laisser de la place à l’échange spontané"],
      barriers: ["Couper l’élan par une critique immédiate"],
      growth: ["Valider la faisabilité avant de promettre"],
      environment: ["Beaucoup de contacts et de projets nouveaux"],
      management: ["De la reconnaissance visible pour ses réussites"],
      motivation: ["Convaincre et rassembler autour d’un projet"],
      managementStyle: ["Entraîne l’équipe par l’enthousiasme"]
    },
    "inspirateur>motivateur": {
      headline: "Enthousiasme et action : {p} transforme les idées en mouvement.",
      style: "Dans son profil, la créativité est tournée vers l’action. {p} ne se contente pas d’imaginer : il faut que les idées prennent forme, et vite. Ce mélange de spontanéité et de volonté donne un style très persuasif, capable de lancer des projets là où d’autres hésiteraient.",
      blindSpot: "En passant rapidement de l’idée à l’action, {p} peut laisser derrière soi des personnes qui n’ont eu le temps ni de comprendre ni d’adhérer.",
      strengths: ["Capacité à lancer rapidement des projets", "Persuasion naturelle"],
      weaknesses: ["Peut passer à l’action sans plan suffisant"],
      team: ["Fait avancer les idées jusqu’au lancement"],
      communication: ["Parler de l’impact attendu", "Adopter un ton direct et dynamique"],
      barriers: ["Enterrer une idée sous les procédures"],
      growth: ["Prévoir les étapes avant de se lancer"],
      environment: ["Des projets nouveaux avec une forte autonomie"],
      management: ["De la latitude pour expérimenter"],
      motivation: ["Voir ses idées devenir réalité"],
      managementStyle: ["Lance des initiatives et donne de l’élan"]
    },
    "inspirateur>conseiller": {
      headline: "Enthousiasme et chaleur : {p} inspire et rassemble autour des personnes.",
      style: "Dans son profil, l’enthousiasme est profondément tourné vers les autres. {p} aime partager, encourager et faire rayonner les talents de chacun. La relation est un moteur essentiel, et les idées prennent tout leur sens lorsqu’elles rassemblent.",
      blindSpot: "Le besoin de garder de bonnes relations peut pousser {p} à éviter des messages difficiles ou à dire oui trop vite.",
      strengths: ["Capacité à rassembler des personnes différentes", "Chaleur communicative"],
      weaknesses: ["Peut éviter les messages difficiles"],
      team: ["Crée une ambiance où chacun ose s’exprimer"],
      communication: ["Prendre le temps d’un échange personnel", "Exprimer sa reconnaissance"],
      barriers: ["Ignorer la dimension humaine d’un projet"],
      growth: ["Dire les choses difficiles avec bienveillance plutôt que les éviter"],
      environment: ["Une équipe chaleureuse et ouverte"],
      management: ["Des encouragements réguliers"],
      motivation: ["Inspirer et faire grandir les autres"],
      managementStyle: ["Valorise les talents de chacun"]
    },
    "conseiller>inspirateur": {
      headline: "Chaleur et inspiration : {p} crée du lien et donne envie d’avancer ensemble.",
      style: "Dans son profil, l’attention aux personnes s’exprime avec beaucoup d’énergie. {p} encourage, félicite, propose, et sait créer une dynamique positive. L’ouverture aux idées nouvelles est grande, surtout lorsqu’elles servent le collectif.",
      blindSpot: "La spontanéité de {p} peut conduire à multiplier les engagements relationnels au détriment de ses propres priorités.",
      strengths: ["Talent pour créer une dynamique positive", "Ouverture aux idées et aux personnes"],
      weaknesses: ["Peut se disperser entre trop de sollicitations"],
      team: ["Entretient l’enthousiasme du groupe"],
      communication: ["Garder un ton positif et chaleureux", "Partager la vision et le sens"],
      barriers: ["Adopter un ton froid ou impersonnel"],
      growth: ["Protéger du temps pour ses propres priorités"],
      environment: ["Des projets collectifs porteurs de sens"],
      management: ["Une reconnaissance chaleureuse et sincère"],
      motivation: ["Contribuer à une aventure collective"],
      managementStyle: ["Crée une dynamique d’équipe enthousiaste"]
    },
    "conseiller>supporteur": {
      headline: "Chaleur et soutien : {p} veille sur les personnes et sur la qualité du lien.",
      style: "Dans son profil, l’attention aux personnes est particulièrement profonde. {p} écoute, soutient et accompagne avec patience, et accorde une grande valeur à la stabilité des relations. Le rythme est plus posé, et la confiance prime sur la performance.",
      blindSpot: "En cherchant à préserver l’harmonie, {p} peut laisser des tensions s’installer plutôt que les aborder ouvertement.",
      strengths: ["Patience et disponibilité", "Écoute profonde"],
      weaknesses: ["Peut repousser les conversations difficiles"],
      team: ["Offre un soutien constant aux collègues"],
      communication: ["Laisser le temps de réfléchir", "Expliquer l’impact d’un changement sur l’équipe"],
      barriers: ["Bousculer ou presser une réponse"],
      growth: ["Aborder les tensions dès qu’elles apparaissent"],
      environment: ["Une équipe stable et bienveillante"],
      management: ["Du temps pour accompagner les changements"],
      motivation: ["Aider concrètement les autres"],
      managementStyle: ["Accompagne chacun avec patience"]
    },
    "supporteur>conseiller": {
      headline: "Soutien et chaleur : {p} est un pilier humain de l’équipe.",
      style: "Dans son profil, la stabilité s’accompagne d’une chaleur relationnelle bien visible. {p} aime échanger, encourager et prendre soin de l’ambiance. Les autres trouvent facilement en {p} une oreille attentive et un soutien fiable.",
      blindSpot: "À force de soutenir tout le monde, {p} peut se retrouver avec une charge que personne d’autre ne voit.",
      strengths: ["Chaleur et accessibilité", "Capacité à rassurer"],
      weaknesses: ["Peut s’oublier au profit des autres"],
      team: ["Entretient la cohésion et la convivialité"],
      communication: ["Montrer un intérêt personnel sincère", "Valoriser les efforts autant que les résultats"],
      barriers: ["Négliger la relation pour aller plus vite"],
      growth: ["Exprimer ses propres besoins sans attendre"],
      environment: ["Une ambiance conviviale et solidaire"],
      management: ["Un lien personnel avec sa hiérarchie"],
      motivation: ["Une équipe où l’on prend soin les uns des autres"],
      managementStyle: ["Prend soin de l’ambiance de l’équipe"]
    },
    "supporteur>coordinateur": {
      headline: "Soutien et constance : {p} apporte stabilité et fiabilité dans la durée.",
      style: "Dans son profil, la bienveillance s’accompagne d’un goût marqué pour l’ordre et la régularité. {p} aime que les choses soient prévues, que les engagements soient tenus et que l’équipe avance sans à-coups. La fiabilité est sa signature.",
      blindSpot: "L’attachement à la stabilité peut faire passer pour de la réticence ce qui n’est qu’un besoin d’être préparé au changement.",
      strengths: ["Régularité et fiabilité exemplaires", "Sens du suivi"],
      weaknesses: ["Peut résister aux changements non préparés"],
      team: ["Assure la continuité du travail"],
      communication: ["Être concret et précis sur les étapes", "Annoncer les changements à l’avance"],
      barriers: ["Changer les priorités sans prévenir"],
      growth: ["Tester les changements à petite échelle plutôt que les éviter"],
      environment: ["Un cadre stable et bien organisé"],
      management: ["Des repères clairs et stables"],
      motivation: ["La sécurité d’un cadre fiable"],
      managementStyle: ["Garantit la stabilité et la continuité"]
    },
    "coordinateur>supporteur": {
      headline: "Organisation et bienveillance : {p} fait tourner l’équipe en prenant soin des personnes.",
      style: "Dans son profil, le sens de l’organisation est mis au service des autres. {p} coordonne, anticipe et facilite, en veillant à ce que chacun dispose de ce dont il a besoin. La loyauté et le souci du collectif sont très présents.",
      blindSpot: "En facilitant le travail de tous, {p} peut rendre sa propre contribution invisible, puis s’étonner qu’elle ne soit pas reconnue.",
      strengths: ["Talent pour faciliter le travail des autres", "Loyauté envers l’équipe"],
      weaknesses: ["Peut avoir du mal à refuser une demande"],
      team: ["Veille à ce que chacun dispose des ressources nécessaires"],
      communication: ["Reconnaître son rôle de facilitation", "Demander à {p} ce dont son travail a besoin"],
      barriers: ["Considérer son aide comme acquise"],
      growth: ["Rendre sa contribution plus visible"],
      environment: ["Une équipe loyale et coopérative"],
      management: ["Une reconnaissance explicite de son rôle"],
      motivation: ["Faciliter la réussite collective"],
      managementStyle: ["Coordonne en veillant au bien-être de chacun"]
    },
    "coordinateur>observateur": {
      headline: "Organisation et précision : {p} structure le travail avec soin et fiabilité.",
      style: "Dans son profil, la recherche de stabilité s’appuie sur une forte exigence de précision. {p} aime les processus clairs, les informations fiables et le travail soigné. La réflexion précède toujours l’action, et les décisions sont pesées avec soin.",
      blindSpot: "Le besoin de tout vérifier peut ralentir l’équipe, et donner l’impression que {p} doute du travail des autres.",
      strengths: ["Précision et sens du détail", "Organisation méthodique"],
      weaknesses: ["Peut trop vérifier avant de valider"],
      team: ["Garantit la fiabilité des processus"],
      communication: ["Fournir des informations précises et vérifiées", "Respecter les processus convenus"],
      barriers: ["Improviser sur un sujet important"],
      growth: ["Faire confiance au travail des autres sans tout revérifier"],
      environment: ["Des processus clairs et documentés"],
      management: ["Des informations complètes et fiables"],
      motivation: ["Un travail précis et bien organisé"],
      managementStyle: ["Structure le travail avec méthode et précision"]
    },
    "observateur>coordinateur": {
      headline: "Réflexion et attention : {p} analyse avec rigueur et veille à la qualité du collectif.",
      style: "Dans son profil, la rigueur analytique se double d’une attention réelle aux personnes. {p} veut des solutions justes, mais aussi respectueuses de celles et ceux qui les mettront en œuvre. Le style est posé, prudent et attentif.",
      blindSpot: "La prudence de {p} peut conduire à attendre que les autres prennent l’initiative, même lorsque son avis serait décisif.",
      strengths: ["Attention conjointe à la qualité et aux personnes", "Prudence réfléchie"],
      weaknesses: ["Peut hésiter à prendre position"],
      team: ["Apporte un regard à la fois rigoureux et bienveillant"],
      communication: ["Prendre le temps d’écouter son analyse", "Garder un ton respectueux"],
      barriers: ["Brusquer ou presser"],
      growth: ["Prendre position plus rapidement"],
      environment: ["Une équipe calme et respectueuse"],
      management: ["Un cadre calme et bienveillant"],
      motivation: ["Contribuer à un travail de qualité dans une équipe soudée"],
      managementStyle: ["Accompagne avec patience et rigueur"]
    },
    "observateur>reformateur": {
      headline: "Réflexion et exigence : {p} analyse en profondeur pour viser l’excellence.",
      style: "Dans son profil, la réflexion s’accompagne d’une forte exigence de résultat. {p} analyse avec soin, mais veut aussi que l’analyse débouche sur des améliorations concrètes. Les standards sont élevés, envers soi comme envers les autres.",
      blindSpot: "Le regard critique de {p} est précieux, mais il peut être reçu comme un jugement lorsqu’il ne s’accompagne d’aucune reconnaissance.",
      strengths: ["Esprit critique aiguisé", "Exigence de qualité"],
      weaknesses: ["Regard parfois très critique"],
      team: ["Fait progresser la qualité par un regard exigeant"],
      communication: ["Argumenter avec rigueur", "Accepter l’examen critique de ses idées"],
      barriers: ["Présenter un travail bâclé"],
      growth: ["Associer chaque critique à une reconnaissance"],
      environment: ["Des standards de qualité élevés"],
      management: ["Des retours précis et argumentés"],
      motivation: ["Atteindre un haut niveau d’excellence"],
      managementStyle: ["Exige un haut niveau de qualité"]
    }
  };

  // ---------------------------------------------------------------------
  // Nuances par couleur : forte (>= HIGH) ou faible (<= LOW)
  // ---------------------------------------------------------------------
  var COLOUR_TEXTS = {
    blue: {
      gift: "l’analyse, la précision et le goût des faits",
      effort: "se plonger dans les analyses détaillées et les procédures",
      name: "bleu",
      high: {
        strengths: ["Souci de l’exactitude", "Capacité à structurer l’information"],
        weaknesses: ["Peut se perdre dans les détails"],
        team: ["Vérifie la cohérence et l’exactitude"],
        communication: ["Fournir des faits et des données fiables"],
        barriers: ["Avancer des chiffres non vérifiés"],
        growth: ["Accepter une part d’incertitude"],
        environment: ["Des informations fiables et accessibles"],
        management: ["Des explications logiques"],
        motivation: ["Comprendre le pourquoi des choses"],
        managementStyle: ["Veille à la rigueur des analyses"]
      },
      low: {
        blindSpot: "Le bleu étant peu présent, {p} peut sous-estimer l’importance des détails, des vérifications et de la documentation pour les personnes qui en ont besoin.",
        weaknesses: ["Peut négliger les vérifications et la documentation"],
        communication: ["Résumer l’essentiel avant d’entrer dans les détails"],
        growth: ["S’appuyer sur une personne rigoureuse pour vérifier les détails", "Prévoir un temps de relecture avant de livrer"],
        managementStyle: ["Peut sous-estimer le besoin de cadre de certaines personnes"]
      },
      up: "Au naturel, {p} a davantage besoin de réflexion, de précision et de calme qu’il n’y paraît au travail.",
      down: "La rigueur et la structure affichées au travail demandent sans doute un effort qui, à la longue, peut fatiguer."
    },
    green: {
      gift: "la sensibilité aux personnes, aux valeurs et à l’harmonie du groupe",
      effort: "prêter attention aux ressentis des autres",
      name: "vert",
      high: {
        strengths: ["Attention sincère aux personnes", "Sens des valeurs"],
        weaknesses: ["Peut éviter les confrontations nécessaires"],
        team: ["Veille au bien-être de chacun"],
        communication: ["Montrer du respect pour les valeurs et les personnes"],
        barriers: ["Ignorer l’impact humain d’une décision"],
        growth: ["Exprimer ses désaccords plus franchement"],
        environment: ["Un climat de confiance et de respect"],
        management: ["Un management attentif aux personnes"],
        motivation: ["Travailler en accord avec ses valeurs"],
        managementStyle: ["Tient compte de l’effet des décisions sur les personnes"]
      },
      low: {
        blindSpot: "Le vert étant peu présent, {p} peut sous-estimer l’effet de ses paroles et de ses décisions sur ce que ressentent les autres. Ce qui est dit franchement, par souci d’efficacité, peut blesser sans que {p} s’en aperçoive.",
        weaknesses: ["Attention parfois insuffisante aux besoins des autres"],
        growth: ["Prendre des nouvelles des personnes, pas seulement du travail", "Demander comment une décision est vécue"],
        managementStyle: ["Peut sous-estimer le besoin de soutien de l’équipe"]
      },
      up: "La sensibilité aux personnes et le besoin d’harmonie comptent davantage pour {p} que ce que le style public laisse voir.",
      down: "La patience et la disponibilité montrées au travail vont au-delà de ce qui est naturel pour {p}, ce qui demande une énergie à surveiller."
    },
    yellow: {
      gift: "l’enthousiasme, l’ouverture et le goût des idées nouvelles",
      effort: "exprimer son enthousiasme et entrer dans les échanges informels",
      name: "jaune",
      high: {
        strengths: ["Enthousiasme et ouverture", "Imagination"],
        weaknesses: ["Peut se disperser entre plusieurs idées"],
        team: ["Apporte des idées nouvelles et de la bonne humeur"],
        communication: ["Laisser de la place à l’échange et à l’humour"],
        barriers: ["Étouffer les idées par excès de critiques"],
        growth: ["Mener ses idées jusqu’au bout"],
        environment: ["De la variété et des échanges"],
        management: ["De la reconnaissance visible"],
        motivation: ["Les projets nouveaux et créatifs"],
        managementStyle: ["Encourage la créativité"]
      },
      low: {
        blindSpot: "Le jaune étant peu présent, {p} peut sous-estimer le rôle de l’enthousiasme, de l’humour et de la convivialité dans l’engagement des autres. Un mot positif ou une reconnaissance exprimée à voix haute a souvent plus d’effet que {p} ne l’imagine.",
        weaknesses: ["Sérieux parfois perçu comme de la froideur"],
        communication: ["Rester sobre dans l’humour et les familiarités"],
        growth: ["Exprimer plus souvent son enthousiasme et sa satisfaction", "S’autoriser des moments informels avec l’équipe"],
        managementStyle: ["Peut oublier de célébrer les réussites"]
      },
      up: "Au fond, {p} a davantage besoin d’échanges, de spontanéité et de légèreté que son environnement ne permet d’en exprimer.",
      down: "L’enthousiasme et la sociabilité déployés au travail dépassent le style naturel de {p} ; des moments de calme aident à récupérer."
    },
    red: {
      gift: "la détermination, le sens de l’urgence et le goût du résultat",
      effort: "s’affirmer et trancher dans l’urgence",
      name: "rouge",
      high: {
        strengths: ["Capacité à agir vite quand la situation l’exige", "Audace face aux obstacles"],
        weaknesses: ["Impatience visible"],
        team: ["Donne de l’élan et fait aboutir"],
        communication: ["Proposer une décision, pas seulement un constat"],
        barriers: ["Faire perdre du temps"],
        growth: ["Mesurer l’effet de son rythme sur les autres"],
        environment: ["Des enjeux réels et de vraies responsabilités"],
        management: ["De la latitude pour décider"],
        motivation: ["Les défis et les résultats concrets"],
        managementStyle: ["Garde le cap sur les résultats"]
      },
      low: {
        blindSpot: "Le rouge étant peu présent, {p} peut tarder à affirmer sa position ou à trancher, et laisser d’autres décider à sa place.",
        weaknesses: ["Peut hésiter à s’affirmer"],
        growth: ["Affirmer plus nettement son point de vue", "Fixer des échéances et s’y tenir"],
        managementStyle: ["Peut tarder à trancher"]
      },
      up: "Sous pression, la détermination et le besoin de contrôle de {p} peuvent devenir plus visibles que d’ordinaire.",
      down: "Le style directif et rapide adopté au travail est plus marqué qu’au naturel, sans doute pour répondre aux attentes du rôle."
    }
  };

  var RING_TEXTS = {
    focalise: "Ses préférences sont très nettes : {p} s’appuie fortement sur ses énergies dominantes, ce qui rend son style reconnaissable, mais demande un effort particulier pour s’adapter aux personnes très différentes.",
    classique: "Ses préférences sont bien marquées, tout en laissant de la place aux autres énergies lorsque la situation l’exige.",
    accommodant: "Ses préférences sont modérées : {p} mobilise assez facilement plusieurs énergies, ce qui facilite l’adaptation, au risque de paraître parfois moins prévisible.",
    creatif: "Ses énergies sont très équilibrées : {p} peut adopter des styles très différents selon les contextes, ce qui offre une grande souplesse mais rend parfois sa position difficile à lire pour les autres."
  };

  var HOW_TO_READ = [
    "Ce rapport repose sur quatre énergies, représentées par quatre couleurs. Le bleu correspond à la réflexion, à la précision et au goût des faits. Le vert correspond à l’attention aux personnes, à la patience et à la recherche d’harmonie. Le jaune correspond à l’enthousiasme, à la sociabilité et aux idées nouvelles. Le rouge correspond à la détermination, à l’action et au goût du résultat. Chacun dispose des quatre énergies ; ce qui change d’une personne à l’autre, c’est leur intensité et l’ordre dans lequel elles sont mobilisées.",
    "Chaque couleur reçoit un score de 0 à 6. Au-delà de 3, l’énergie est utilisée volontiers ; en dessous, elle demande davantage d’effort. Un score bas n’est pas un manque de compétence : c’est une énergie moins spontanée, que l’on peut tout à fait mobiliser lorsque la situation l’exige.",
    "Le questionnaire produit deux profils. Le profil public décrit la manière dont la personne se comporte au travail, telle que les autres la perçoivent. Le profil privé décrit son fonctionnement au naturel, ou sous pression. Lorsque les deux diffèrent, c’est souvent le signe d’une adaptation à l’environnement : utile, mais coûteuse en énergie si elle dure.",
    "La roue réunit ces informations en une seule image. Elle compte huit types, chacun partagé en deux moitiés, et trois anneaux qui indiquent la netteté des préférences : plus la position est proche du bord, plus les préférences sont marquées ; plus elle est proche du centre, plus les énergies sont équilibrées. Au centre, les positions dites créatives correspondent à des énergies presque également réparties. Le type opposé se trouve de l’autre côté de la roue. Les deux positions, publique et privée, y sont reportées.",
    "Ce rapport est une base de réflexion, pas un verdict. Il ne mesure ni la compétence, ni l’intelligence, ni la performance, et il ne doit jamais servir à recruter, évaluer ou classer des personnes. Il appartient à la personne qui a répondu : à elle de choisir ce qu’elle en retient et ce qu’elle souhaite partager."
  ];

  // Deuxièmes paragraphes « Relations » et « Décisions » par type.
  var MORE = {
    reformateur: [
      "Au sein d’une équipe, {p} apprécie les personnes qui font ce qu’elles annoncent et respectent les règles convenues. L’impatience peut poindre face au désordre ou aux engagements non tenus. Les moments de convivialité comptent moins pour {p} que la qualité du travail partagé, et le calme est souvent préféré à l’agitation des grands groupes. Cette réserve n’est pas de l’indifférence : l’attention aux autres passe surtout par la fiabilité et l’aide concrète.",
      "{p} aime s’appuyer sur l’expérience : ce qui a fonctionné hier sert de repère pour juger ce qui fonctionnera demain. Les idées comptent davantage que les personnes qui les portent, et une proposition est évaluée sur sa solidité plutôt que sur la conviction de son auteur. Les questions de {p} peuvent être nombreuses et précises ; elles visent à éprouver une idée, pas à mettre quelqu’un en difficulté, même si elles sont parfois reçues ainsi."
    ],
    directeur: [
      "{p} aime être au cœur de l’action et prend volontiers la parole pour orienter un échange. Les critiques ne découragent pas ; elles sont plutôt vues comme un obstacle à franchir. Prendre le temps de demander comment vont les personnes, et pas seulement où en est le travail, renforce nettement la confiance que l’entourage accorde à {p}.",
      "Face à un problème, {p} cherche d’abord la cause principale et le levier qui permettra d’agir. Les longues analyses sont utiles si elles débouchent sur un choix ; sinon, elles deviennent un frein. {p} assume volontiers les décisions difficiles et accepte d’en porter la responsabilité, y compris lorsqu’elles sont impopulaires."
    ],
    motivateur: [
      "{p} aime les échanges vivants, les débats animés et les personnes qui s’engagent. La reconnaissance compte, de même que la possibilité de peser sur les décisions. Les relations restent toutefois souvent orientées vers l’objectif : lorsqu’un projet se termine, l’attention de {p} se porte vite sur le suivant.",
      "{p} évalue rapidement le potentiel d’une situation et préfère les choix qui ouvrent des possibilités. Les décisions sont prises avec conviction, et cette assurance rassure souvent l’équipe. S’entourer de personnes capables de vérifier les détails et d’anticiper les risques permet à {p} de garder cette rapidité sans en payer le prix."
    ],
    inspirateur: [
      "{p} aime rencontrer de nouvelles personnes, partager des idées et créer des connexions. Les échanges sont spontanés, souvent drôles, et laissent rarement indifférent. {p} a besoin de sentir l’intérêt des autres ; un manque de réaction ou une réponse froide peut être vécu comme un désaveu.",
      "Les idées de {p} naissent souvent en parlant : réfléchir à voix haute avec d’autres aide à clarifier ce qui compte. Les options nouvelles attirent davantage que les solutions éprouvées. Une étape de vérification, avec une personne plus méthodique, permet de transformer cette intuition en décisions solides."
    ],
    conseiller: [
      "{p} remarque vite quand quelqu’un ne va pas bien, et prend naturellement le temps d’en parler. Les collègues se confient volontiers, ce qui fait de {p} un point d’appui important dans une équipe. Cette disponibilité a un coût : les sollicitations s’accumulent, et {p} peut avoir du mal à protéger son propre temps.",
      "Pour {p}, une décision n’est pas seulement une question de logique : elle doit être cohérente avec les valeurs et respectueuse des personnes. Les arguments purement techniques convainquent moins qu’un exemple concret de ce que le choix changera pour les gens. Fixer une échéance à la consultation aide à concilier écoute et efficacité."
    ],
    supporteur: [
      "On se tourne souvent vers {p} en cas de difficulté, parce que l’écoute est réelle et la discrétion assurée. Les relations sont fidèles et durables. En retour, {p} attend une forme de loyauté et de respect ; un manque de considération touche profondément, même s’il est rarement exprimé.",
      "{p} aime connaître le cadre, les étapes et les conséquences avant de s’engager. Une décision brusque, prise sans consultation, est mal vécue même si elle est juste sur le fond. En revanche, une fois que {p} a compris et adhéré, l’engagement est solide et durable."
    ],
    coordinateur: [
      "Dans une équipe, {p} veille à ce que chacun ait l’information et les moyens nécessaires. Ce rôle de coordination est souvent discret, et ses effets se remarquent surtout lorsqu’il manque. {p} apprécie les collègues fiables et respectueux des règles communes, et se sent moins à l’aise face aux personnalités envahissantes ou imprévisibles.",
      "{p} s’appuie volontiers sur les procédures et les expériences passées pour décider. Une méthode éprouvée inspire plus confiance qu’une idée brillante mais non testée. Préparer à l’avance des options pour les situations urgentes permet à {p} de gagner en réactivité sans renoncer à sa rigueur."
    ],
    observateur: [
      "Dans les échanges, {p} écoute beaucoup et prend la parole lorsque c’est utile. Les conversations de fond sont préférées aux discussions légères, et les grands groupes fatiguent plus vite que les échanges en petit comité. Les autres apprécient la justesse et la sincérité de ses remarques, à condition que {p} prenne l’initiative de les partager.",
      "{p} cherche à comprendre toutes les dimensions d’un problème avant de se prononcer, et réunit volontiers des données supplémentaires. Les décisions sont rarement regrettées, car elles ont été mûrement pesées. Se fixer une date limite et accepter une part d’incertitude aide {p} à passer de l’analyse au choix."
    ]
  };
  Object.keys(MORE).forEach(function (key) {
    TYPES[key].relations.push(MORE[key][0]);
    TYPES[key].decisions.push(MORE[key][1]);
  });

  // Nuances de couleur pour « Relations » et « Décisions ».
  var COLOUR_RELATIONS = {
    blue: {
      high: ["Le bleu marqué renforce le besoin de relations professionnelles claires, fondées sur la compétence et le respect des engagements.", "Le bleu marqué pousse à vérifier les faits et à chercher la cohérence avant tout choix important."],
      low: ["Le bleu étant peu présent, {p} se soucie moins des formes et des procédures dans les relations, ce qui facilite le contact mais peut déconcerter les personnes plus formelles.", "Le bleu étant peu présent, l’analyse détaillée n’est pas le premier réflexe : prévoir un temps de vérification évite les mauvaises surprises."]
    },
    green: {
      high: ["Le vert marqué donne une réelle attention à l’état des personnes et à la qualité du lien.", "Le vert marqué invite à mesurer l’effet d’un choix sur les personnes avant de trancher."],
      low: ["Le vert étant peu présent, la dimension affective des relations est moins spontanée : les autres peuvent avoir besoin de signes plus explicites d’attention et de reconnaissance.", "Le vert étant peu présent, les ressentis des autres pèsent moins dans les décisions de {p} ; demander comment un choix sera vécu complète utilement l’analyse."]
    },
    yellow: {
      high: ["Le jaune marqué apporte de la chaleur, de l’humour et une vraie facilité de contact.", "Le jaune marqué rend sensible aux idées nouvelles et aux options inattendues."],
      low: ["Le jaune étant peu présent, {p} recherche peu les moments informels et préfère des échanges sérieux et ciblés ; un peu de légèreté aiderait parfois à créer du lien.", "Le jaune étant peu présent, les solutions éprouvées sont préférées aux pistes originales, au risque de passer à côté d’une idée neuve."]
    },
    red: {
      high: ["Le rouge marqué rend le ton direct et l’engagement visible : {p} n’hésite pas à dire ce qui doit l’être.", "Le rouge marqué donne de l’assurance pour trancher et assumer les conséquences."],
      low: ["Le rouge étant peu présent, {p} évite volontiers la confrontation directe et préfère convaincre en douceur.", "Le rouge étant peu présent, trancher vite sous la pression demande un effort ; se fixer des échéances aide à conclure."]
    }
  };

  function colourNuance(scores, index) {
    var parts = [];
    strongColours(scores).forEach(function (c) { parts.push(COLOUR_RELATIONS[c].high[index]); });
    weakColours(scores).forEach(function (c) { parts.push(COLOUR_RELATIONS[c].low[index]); });
    return parts.join(" ");
  }

  // Introductions des trois parties de la synthèse.
  INTROS.style =
    "Cette partie décrit la manière habituelle dont {p} aborde le travail : ce qui compte, ce qui stimule, ce qui pèse. Elle s’appuie sur le profil public, nuancé par l’intensité de chacune des quatre couleurs.";
  INTROS.relations =
    "Voici comment {p} entre en relation avec les autres, et comment ce style peut être perçu par des personnes aux préférences différentes.";
  INTROS.decisions =
    "Chaque personne a sa façon de réunir l’information et de trancher. Voici celle de {p}, avec ses forces et ses risques.";

  // ---------------------------------------------------------------------
  // Composition
  // ---------------------------------------------------------------------
  var VOWEL = /^[aeiouyàâäéèêëîïôöùûüœæh]/i;
  var ELIDABLE = /\b(de|que|lorsque|puisque|jusque) \{p\}/g;

  function fill(text, name) {
    if (typeof text !== "string") return text;
    var elide = VOWEL.test(name);
    return text
      .replace(ELIDABLE, function (match, word) {
        return elide ? word.slice(0, -1) + "’" + name : word + " " + name;
      })
      .split("{p}")
      .join(name);
  }

  function fillAll(value, name) {
    if (Array.isArray(value)) {
      return value.map(function (item) { return fillAll(item, name); });
    }
    if (value && typeof value === "object") {
      var out = {};
      Object.keys(value).forEach(function (key) { out[key] = fillAll(value[key], name); });
      return out;
    }
    return fill(value, name);
  }

  function normaliseKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();
  }

  function readScores(profile) {
    var scores = (profile && profile.scores) || {};
    var out = {};
    COLOURS.forEach(function (colour) {
      var value = Number(scores[colour]);
      out[colour] = isFinite(value) ? value : 3;
    });
    return out;
  }

  function readProfile(profile) {
    profile = profile || {};
    var type = normaliseKey(profile.type);
    if (!TYPES[type]) type = SEQUENCE[0];
    var lean = normaliseKey(profile.lean);
    var leanKey = type + ">" + lean;
    return {
      type: type,
      index: SEQUENCE.indexOf(type),
      lean: LEANS[leanKey] ? lean : null,
      leanText: LEANS[leanKey] || null,
      ring: normaliseKey(profile.ring),
      scores: readScores(profile)
    };
  }

  function strongColours(scores) {
    return COLOURS.filter(function (c) { return scores[c] >= HIGH; })
      .sort(function (a, b) { return scores[b] - scores[a]; });
  }

  function weakColours(scores) {
    return COLOURS.filter(function (c) { return scores[c] <= LOW; })
      .sort(function (a, b) { return scores[a] - scores[b]; });
  }

  function uniquePush(target, items, seen) {
    (items || []).forEach(function (item) {
      var key = normaliseKey(item);
      if (item && !seen[key]) {
        seen[key] = true;
        target.push(item);
      }
    });
  }

  // Ordre de priorité : demi-type, cœur du type, couleurs fortes,
  // couleurs faibles, profil privé, reste du type, type voisin.
  function buildList(section, pub, priv) {
    var type = TYPES[pub.type];
    var size = LIST_SIZES[section];
    var core = type[section] || [];
    var out = [];
    var seen = {};

    if (pub.leanText) uniquePush(out, pub.leanText[section], seen);
    uniquePush(out, core.slice(0, 4), seen);
    strongColours(pub.scores).forEach(function (c) {
      uniquePush(out, COLOUR_TEXTS[c].high[section], seen);
    });
    weakColours(pub.scores).forEach(function (c) {
      uniquePush(out, COLOUR_TEXTS[c].low[section], seen);
    });
    if (section === "weaknesses" && priv.type !== pub.type) {
      uniquePush(out, (TYPES[priv.type].weaknesses || []).slice(0, 1), seen);
    }
    uniquePush(out, core.slice(4), seen);
    // Compléter si besoin avec les types voisins, en commençant par celui
    // vers lequel penche le demi-type.
    var before = SEQUENCE[(pub.index + 7) % SEQUENCE.length];
    var after = SEQUENCE[(pub.index + 1) % SEQUENCE.length];
    var neighbours = pub.lean === before ? [before, after] : [after, before];
    neighbours.forEach(function (key) {
      if (out.length < size) uniquePush(out, TYPES[key][section], seen);
    });
    return out.slice(0, size);
  }

  function colourNames(colours) {
    var names = colours.map(function (c) { return "le " + COLOUR_TEXTS[c].name; });
    if (names.length <= 1) return names.join("");
    return names.slice(0, -1).join(", ") + " et " + names[names.length - 1];
  }

  function upperFirst(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  function colourParagraph(scores) {
    var strong = strongColours(scores);
    var weak = weakColours(scores);
    var parts = [];
    if (strong.length === 1) {
      parts.push(upperFirst(colourNames(strong)) + " est très présent dans son profil : il apporte à {p} " + COLOUR_TEXTS[strong[0]].gift + ".");
    } else if (strong.length > 1) {
      var gifts = strong.map(function (c) { return COLOUR_TEXTS[c].gift; });
      parts.push(upperFirst(colourNames(strong)) + " sont très présents dans son profil : ils apportent à {p} " + gifts.slice(0, -1).join(", ") + ", mais aussi " + gifts[gifts.length - 1] + ".");
    }
    var lead = strong.length ? "À l’inverse, " : "";
    if (weak.length === 1) {
      parts.push(upperFirst(lead + colourNames(weak) + " est peu présent : {p} doit faire un effort plus conscient pour " + COLOUR_TEXTS[weak[0]].effort + "."));
    } else if (weak.length > 1) {
      var efforts = weak.map(function (c) { return COLOUR_TEXTS[c].effort; });
      parts.push(upperFirst(lead + colourNames(weak) + " sont peu présents : {p} doit faire un effort plus conscient pour " + efforts.slice(0, -1).join(", pour ") + ", et pour " + efforts[efforts.length - 1] + "."));
    }
    if (!strong.length && !weak.length) {
      parts.push("Aucune couleur ne domine nettement : les quatre énergies sont mobilisées de façon assez équilibrée, ce qui permet à {p} de s’adapter à des situations variées.");
    }
    return parts.join(" ");
  }

  function pressureParagraphs(pub, priv) {
    var paragraphs = [];
    if (priv.type === pub.type) {
      var same = "Le profil privé de {p} reste dans la même zone de la roue que son profil public : les mêmes énergies dominent, au travail comme au naturel.";
      if (priv.leanText && priv.lean !== pub.lean) {
        same += " La nuance change toutefois : " + lowerFirst(priv.leanText.style.replace(/^Dans son profil, /, ""));
      }
      paragraphs.push(same);
    } else {
      paragraphs.push(
        "Le profil privé de {p} se situe dans une autre zone de la roue que son profil public. Au naturel, d’autres énergies prennent davantage de place, et le portrait suivant lui correspond mieux. " +
          TYPES[priv.type].style[0]
      );
    }
    paragraphs.push(TYPES[priv.type].pressure);

    var ups = [];
    var downs = [];
    COLOURS.forEach(function (c) {
      var delta = priv.scores[c] - pub.scores[c];
      if (delta >= SHIFT) ups.push(c);
      else if (delta <= -SHIFT) downs.push(c);
    });
    var shifts = [];
    if (downs.length) {
      shifts.push("Dans le profil public, " + colourNames(downs) + (downs.length > 1 ? " sont plus marqués" : " est plus marqué") + " que dans le profil privé.");
      downs.forEach(function (c) { shifts.push(COLOUR_TEXTS[c].down); });
    }
    if (ups.length) {
      shifts.push((downs.length ? "À l’inverse, " : "") + (downs.length ? "" : "Dans le profil privé, ") + colourNames(ups) + (ups.length > 1 ? " sont plus présents" : " est plus présent") + (downs.length ? " dans le profil privé." : "."));
      ups.forEach(function (c) { shifts.push(COLOUR_TEXTS[c].up); });
    }
    if (shifts.length) {
      paragraphs.push(upperFirst(shifts.join(" ")));
    } else {
      paragraphs.push("Les scores des deux profils sont proches : {p} se comporte au travail de façon très semblable à son style naturel, ce qui demande peu d’effort d’adaptation.");
    }
    return paragraphs;
  }

  function lowerFirst(text) {
    return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
  }

  function blindSpotParagraphs(pub) {
    var type = TYPES[pub.type];
    var second = type.blindSpots[1];
    if (pub.leanText && pub.leanText.blindSpot) second += " " + pub.leanText.blindSpot;
    var paragraphs = [type.blindSpots[0], second];
    var weak = weakColours(pub.scores).map(function (c) { return COLOUR_TEXTS[c].low.blindSpot; });
    if (weak.length) paragraphs.push(weak.join(" "));
    return paragraphs;
  }

  function compose(input) {
    input = input || {};
    var name = String(input.firstName || "").trim() || "Cette personne";
    var pub = readProfile(input.conscious);
    var priv = input.lessConscious ? readProfile(input.lessConscious) : pub;
    var type = TYPES[pub.type];
    var oppositeKey = SEQUENCE[(pub.index + 4) % SEQUENCE.length];
    var opposite = TYPES[oppositeKey];

    var styleParagraphs = [type.style[0]];
    var nuance = [];
    if (pub.leanText) nuance.push(pub.leanText.style);
    if (RING_TEXTS[pub.ring]) nuance.push(RING_TEXTS[pub.ring]);
    if (nuance.length) styleParagraphs.push(nuance.join(" "));
    var colours = colourParagraph(pub.scores);
    if (colours) styleParagraphs.push(colours);
    styleParagraphs.push(type.style[1]);

    var lists = {};
    Object.keys(LIST_SIZES).forEach(function (section) {
      lists[section] = buildList(section, pub, priv);
    });

    var report = {
      howToRead: HOW_TO_READ.slice(),
      intro: Object.assign({}, INTROS),
      summary: {
        headline: pub.leanText ? pub.leanText.headline : TYPE_SUMMARIES[pub.type],
        strengths: lists.strengths.slice(0, 3),
        communicate: lists.communication.slice(0, 3),
        motivation: lists.motivation.slice(0, 3)
      },
      overview: {
        style: styleParagraphs,
        relations: type.relations.concat([colourNuance(pub.scores, 0)]).filter(Boolean),
        decisions: type.decisions.concat([colourNuance(pub.scores, 1)]).filter(Boolean)
      },
      underPressure: pressureParagraphs(pub, priv),
      blindSpots: blindSpotParagraphs(pub),
      opposite: {
        type: oppositeKey,
        description: opposite.asOpposite.slice(),
        do: opposite.reachDo.slice(),
        avoid: opposite.reachAvoid.slice()
      }
    };
    Object.keys(lists).forEach(function (section) { report[section] = lists[section]; });

    // Le prénom n'est jamais remplacé dans la clé du type opposé.
    var filled = fillAll(report, name);
    filled.opposite.type = oppositeKey;
    return filled;
  }

  var types = {};
  SEQUENCE.forEach(function (key) {
    types[key] = { summary: TYPE_SUMMARIES[key] };
  });

  global.JungTexts = {
    version: 1,
    language: "fr",
    sequence: SEQUENCE.slice(),
    types: types,
    compose: compose,
    // Données brutes, utiles pour relire ou tester les textes.
    data: {
      intros: INTROS,
      types: TYPES,
      leans: LEANS,
      colours: COLOUR_TEXTS,
      rings: RING_TEXTS,
      howToRead: HOW_TO_READ
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
