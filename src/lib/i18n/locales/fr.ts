import type { Dictionary } from "../types";

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    about: "À propos",
    services: "Services",
    projects: "Projets",
    contact: "Contact",
  },
  header: {
    insertCoin: "Insert coin",
    language: "Langue",
    selectLanguage: "Choisir la langue",
  },
  footer: {
    letsTalk: "On en parle ?",
    ctaLine1: "Faisons quelque chose",
    ctaAccent: "verticalement",
    ctaLine2: "mémorable.",
    writeContact: "Écrire → Contact",
    navigate: "Naviguer",
    social: "Social",
    contact: "Contact",
    privacy: "Confidentialité",
    highScores: "High scores réservés.",
    madeIn: "Fait main à",
  },
  menu: {
    ariaLabel: "Navigation principale",
    mainNav: "Menu",
  },
  common: {
    skipToContent: "Aller au contenu",
    mainNav: "Principal",
    explore: "Explorer →",
    openProject: "Ouvrir le projet →",
    viewCase: "Voir le cas →",
    client: "Client",
    type: "Type",
    year: "Année",
    role: "Rôle",
    loading: "Chargement…",
  },
  home: {
    hero: {
      creativeManagement: "Creative Management",
      line1: "Nous créons",
      line2: "des marques qui vont",
      pitch:
        "Branding, digital, motion et stratégie — depuis Andorre, avec intention et zéro générique.",
      insertCoin: "Insert coin",
      viewProjects: "Voir les projets",
      rotating: [
        "plus loin",
        "plus étrange",
        "plus haut",
        "plus fun",
        "plus vertical",
      ],
      tags: ["Branding", "Digital", "Motion", "3D"],
    },
    marquee: {
      rowA: [
        "Branding",
        "Identité",
        "Digital",
        "Motion",
        "3D",
        "Campaign",
        "UX/UI",
        "Stratégie",
      ],
      rowB: [
        "Playful High-Craft",
        "Andorre",
        "Vertical Thinking",
        "Esteban Ferrer",
        "Concept d’abord",
        "Pixel avec une âme",
      ],
    },
    manifesto: {
      eyebrow: "Manifeste",
      lines: [
        "Nous ne faisons pas de “beaux sites”.",
        "Nous concevons des systèmes avec du caractère,",
        "des expériences qui restent",
        "et des marques qui osent être.",
      ],
      body: "Vertical Management est le studio d’Esteban Ferrer : concept, exécution et un peu de chaos contrôlé — depuis Andorre pour le monde.",
    },
    work: {
      eyebrow: "Selected work",
      titleLine1: "Des projets qui",
      titleLine2: "ne s’excusent pas",
      allProjects: "Tous les projets →",
      enterDesktop: "Entrer dans le bureau des projets",
    },
    services: {
      eyebrow: "Services",
      titleLine1: "Ce que nous faisons",
      titleLine2: "quand tu lances",
      blurb:
        "Du concept au pixel final. Quatre fronts, une seule obsession : que ça vive, et que ce ne soit jamais “encore un site”.",
      explore: "Explorer →",
      viewAll: "Voir tous les services →",
    },
    about: {
      eyebrow: "Qui est derrière",
      titleLine1: "Créatif de métier.",
      titleLine2: "Arcade de vocation.",
      body: "Vertical Management est le véhicule d’Esteban Ferrer pour construire des identités, produits et campagnes qui refusent le contenu générique. Premium dans l’exécution. Fun dans l’âme.",
      founder: "Founder",
      basedIn: "Based in",
      principles: [
        {
          index: "A",
          title: "Concept d’abord",
          body: "Sans idée, aucun render ne sauve le coup.",
        },
        {
          index: "B",
          title: "Détail obsessif",
          body: "Chaque hover, chaque coupe, chaque silence : intentionnels.",
        },
        {
          index: "C",
          title: "Jeu avec boussole",
          body: "Irrévérencieux oui. Gratuit, jamais.",
        },
      ],
      storyCta: "Lire l’histoire →",
    },
    cta: {
      eyebrow: "Game over? No. Press start.",
      words: ["Prêt", "pour", "l’", "écran", "suivant ?"],
      accentFrom: 2,
      body: "Parle-nous du projet. S’il y a une bonne idée (ou l’envie de la trouver), on joue. Andorre et remote.",
      startProject: "Démarrer un projet",
    },
  },
  nosotrosPage: {
    hero: {
      eyebrow: "02 — À propos · Player One",
      title: "Créatif de métier.",
      titleMuted: "Arcade de vocation.",
      body: "On n’est pas “une agence de plus”. On est Vertical : le studio d’Esteban Ferrer — concept, exécution et un peu de chaos contrôlé, depuis Andorre vers le monde.",
      chips: ["Andorre", "Esteban Ferrer", "Playful High-Craft"],
    },
    timeline: {
      eyebrow: "Origine",
      titleLine1: "Spawn point",
      titleLine2: "et écrans suivants",
      body: "L’histoire n’est pas un PDF “qui nous sommes”. C’est comment on a monté de niveau sans diluer le caractère.",
      saves: [
        {
          index: "01",
          label: "Spawn",
          title: "Andorre comme base, pas comme excuse",
          body: "Vertical naît loin du bruit des capitales créatives. Montagnes, Wi‑Fi et l’idée que le craft n’a pas besoin d’un code postal à la mode.",
        },
        {
          index: "02",
          label: "First coin",
          title: "Management créatif, pas un template",
          body: "Le nom n’est pas un hasard : on porte l’idée de bout en bout. Moins “on a livré un logo”, plus “on a construit un système avec une voix”.",
        },
        {
          index: "03",
          label: "Level up",
          title: "De l’identité au pixel en mouvement",
          body: "Branding, digital, motion et 3D ont cessé d’être des silos. Une seule barre : qu’on voie qui l’a fait — et que ça vive.",
        },
        {
          index: "04",
          label: "Boss fight",
          title: "Boss final : le générique",
          body: "On refuse le remplissage, le “joli site sans idée” et l’humour gratuit. Irrévérencieux oui ; sans boussole, jamais.",
        },
        {
          index: "05",
          label: "Continue?",
          title: "Écran suivant, même obsession",
          body: "Aujourd’hui on joue avec des marques qui osent. Andorre et remote. Concept d’abord. Détail jusqu’au dernier hover.",
        },
      ],
    },
    rules: {
      ariaLabel: "Règles de la maison",
      eyebrow: "House rules",
      items: [
        {
          code: "RULE_01",
          punch: "CONCEPT",
          title: "Concept d’abord",
          body: "Sans idée, aucun render ne sauve le coup. On commence par l’angle, pas par un fichier Figma générique.",
        },
        {
          code: "RULE_02",
          punch: "DÉTAIL",
          title: "Détail obsessif",
          body: "Chaque hover, chaque coupe, chaque silence : intentionnels. Exécution premium ; zéro “ça passe”.",
        },
        {
          code: "RULE_03",
          punch: "JEU",
          title: "Jeu avec boussole",
          body: "Irrévérencieux oui. Gratuit, jamais. L’humour ajoute quand la marque le tient — et quand le craft le porte.",
        },
        {
          code: "RULE_04",
          punch: "ANDORRE",
          title: "Fait main en Andorre",
          body: "Local à la racine, global dans l’ambition. Montagnes en fond d’écran ; barre de studio à chaque livraison.",
        },
      ],
    },
    founder: {
      eyebrow: "Player profile",
      role: "Founder",
      basedIn: "Based in",
      titleLine1: "Esteban Ferrer",
      titleLine2: "met des idées dans la machine",
      paragraphs: [
        "Vertical Management est le véhicule d’Esteban pour construire des identités, produits et campagnes qui refusent le contenu générique.",
        "Créatif de métier, arcade de vocation : il dirige le studio avec la même obsession du concept et du détail que l’on voit dans chaque projet.",
        "Depuis Andorre — et le Wi‑Fi du monde — le pari est clair : des marques qui vont plus loin, plus étrange, avec plus de craft.",
      ],
      stats: [
        { label: "Rôle", value: "Founder & Creative" },
        { label: "Base", value: "Andorre" },
        { label: "Mode", value: "High-craft + play" },
      ],
      quote: "On ne fait pas de jolis sites. On conçoit des systèmes avec du caractère.",
    },
    cta: {
      eyebrow: "Game over? No. Insert coin.",
      titleLine1: "Prêt pour l’",
      titleAccent: "écran suivant ?",
      body: "Parle-nous du projet. S’il y a une bonne idée (ou l’envie de la trouver), on joue.",
      startProject: "Démarrer un projet",
      viewProjects: "Voir les projets →",
    },
  },
  servicesPage: {
    hero: {
      eyebrow: "03 — Services · Select player",
      title: "Services",
      titleMuted: "avec du caractère",
      body: "Typo brutale. Blocs de couleur. Exécution studio. Quatre fronts — une seule barre : qu’on voie qui l’a fait.",
    },
    blocks: {
      ariaLabel: "Détail des services",
      serviceLabel: "Service",
      deliverablesLabel: "Ce que nous livrons",
    },
    process: {
      eyebrow: "Processus",
      titleLine1: "Comment on joue",
      titleLine2: "la partie",
      blurb:
        "Flexible selon le projet. Rigide sur la qualité. La barre ne baisse pas ; le reste s’adapte.",
      ticker: [
        "BRIEF",
        "CONCEPT",
        "EXÉCUTION",
        "LAUNCH",
        "ITERATE",
        "PRESS START",
        "NEXT LEVEL",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      titleLine1: "Questions",
      titleLine2: "sans PowerPoint",
      blurb: "Ce qu’on demande souvent avant d’appuyer sur start.",
      items: [
        {
          q: "Vous travaillez seulement en Andorre ?",
          a: "Base en Andorre, clients partout. Remote ou présentiel selon le projet — le Wi‑Fi ignore les frontières.",
        },
        {
          q: "Design seulement, ou aussi du dev ?",
          a: "Design et direction créative de bout en bout. En digital on collabore avec des devs de confiance ou on rejoint ton équipe tech.",
        },
        {
          q: "Combien de temps pour un projet ?",
          a: "Un branding complet n’est pas un week-end ; un set motion peut être plus agile. Timeline réelle au premier call — pas de “bientôt” vide.",
        },
        {
          q: "Quel est le ticket minimum ?",
          a: "Ça dépend du scope. S’il y a une bonne idée (ou l’envie de la trouver), parlons-en — sans devis de remplissage ni PDF de 40 pages.",
        },
        {
          q: "Et l’humour ? Obligatoire ?",
          a: "Non. Mais s’il apporte, on ne le cache pas. Premium en exécution ; personnalité dans la marque.",
        },
      ],
    },
    cta: {
      eyebrow: "Niveau suivant",
      titleLine1: "Choisis ton bloc.",
      titleAccent: "Appuie sur start.",
      body: "Branding, digital, motion ou stratégie — ou le combo complet. On commence par l’idée, pas par un fichier Figma générique.",
      startProject: "Démarrer un projet",
      viewProjects: "Voir les projets →",
    },
  },
  serviceItems: {
    branding: {
      title: "Branding",
      punch: "IDENTITÉ",
      description:
        "Identités avec du caractère. Systèmes visuels qui ne s’excusent pas et restent.",
      longDescription:
        "Nous construisons des marques vivantes : naming, voix, systèmes visuels et guidelines qui tiennent le rythme réel du business — pas un PDF que personne n’ouvre.",
      tags: ["Identité", "Naming", "Guidelines", "Art Direction"],
      deliverables: [
        "Stratégie de marque",
        "Naming & verbal identity",
        "Système visuel",
        "Brand guidelines",
        "Applications & rollout",
      ],
    },
    digital: {
      title: "Digital & Web",
      punch: "EXPÉRIENCE",
      description:
        "Sites et produits niveau Awwwards avec une personnalité d’arcade.",
      longDescription:
        "Web et produits digitaux avec typo d’impact, micro-interactions intentionnelles et vraie performance. Premium en exécution, fun au cœur.",
      tags: ["Web", "UI", "UX", "Expériences"],
      deliverables: [
        "Design systems",
        "Websites & landing",
        "Product UI/UX",
        "Prototypes haute fidélité",
        "Handoff & dev partner",
      ],
    },
    motion: {
      title: "Motion & 3D",
      punch: "MOUVEMENT",
      description:
        "Loops, campagnes et renders qui vivent. Pixel et polygone avec intention.",
      longDescription:
        "Animation, loops et 3D pour des campagnes qu’on ne scroll pas. Rythme, texture et une pointe d’irrévérence quand ça apporte.",
      tags: ["Motion", "3D", "Campaign", "Loops"],
      deliverables: [
        "Motion systems",
        "Campaign films & loops",
        "3D product & fashion",
        "Social cutdowns",
        "Launch assets",
      ],
    },
    strategy: {
      title: "Stratégie créative",
      punch: "CONCEPT",
      description:
        "Concept d’abord. Puis exécution. Humour inclus quand ça apporte.",
      longDescription:
        "Avant le pixel : l’angle. Positionnement, campagnes et récits qui donnent une direction à l’équipe et de la clarté au client.",
      tags: ["Concept", "Campaign", "Conseil", "Narratif"],
      deliverables: [
        "Creative platforms",
        "Campaign concepts",
        "Tone of voice",
        "Workshops",
        "Ongoing creative direction",
      ],
    },
  },
  processSteps: [
    {
      title: "Brief & chaos utile",
      description:
        "On écoute, on pose les questions gênantes et on atterrit le vrai problème — pas le brief PowerPoint.",
    },
    {
      title: "Concept",
      description:
        "Des idées avec du tranchant. On teste des directions jusqu’à ce qu’une soit inévitable.",
    },
    {
      title: "Exécution",
      description:
        "Design, motion et systèmes avec obsession du détail. Chaque hover a une intention.",
    },
    {
      title: "Launch & iterate",
      description:
        "On sort, on mesure ce qui compte et on affine. Retour machine si besoin.",
    },
  ],
  contactPage: {
    hero: {
      eyebrow: "05 — Contact",
      title1: "Parlons.",
      title2: "Pour de vrai.",
      body: "Depuis les montagnes d’Andorre (et le Wi‑Fi du monde). Parle-nous du projet — brief, chaos ou un “j’ai une idée bizarre”.",
    },
    channels: {
      eyebrow: "Canaux ouverts",
      emailLabel: "Email",
      emailHint: "Ligne directe · réponse humaine",
      baseLabel: "Base",
      baseHint: "Montagnes + remote global",
      founderLabel: "Founder",
      founderHint: "Celui qui met les idées dans la machine",
    },
    section: {
      eyebrow: "Formulaire",
      titleLine1: "Parle-nous du",
      titleAccent: "projet",
      body: "Brief court ou roman épique — peu importe. L’important, c’est l’angle. On affine le reste ensemble.",
      deviceLabel: "Direct line · neo-iOS",
      deviceHint:
        "Le smartphone du site d’origine, élevé : glass, dynamic island et paysage andorran en wallpaper.",
    },
    form: {
      name: "Nom",
      namePlaceholder: "Ton nom ou alias",
      email: "Email",
      emailPlaceholder: "hello@marque.com",
      company: "Entreprise (optionnel)",
      companyPlaceholder: "Marque / Studio",
      budget: "Budget (optionnel)",
      budgetDefault: "À définir",
      budgetOptions: [
        { value: "<5k", label: "Moins de 5k" },
        { value: "5-15k", label: "5k – 15k" },
        { value: "15-40k", label: "15k – 40k" },
        { value: "40k+", label: "40k+" },
        { value: "ongoing", label: "Retainer / ongoing" },
      ],
      message: "Message",
      messagePlaceholder:
        "Le projet, le deadline impossible, le dream — n’importe quoi.",
      honeypot: "Ne pas remplir",
      privacyNote:
        "Envoi à {email}. Réponse humaine, sans autoresponder de 2012. En envoyant tu acceptes la",
      privacyLink: "politique de confidentialité",
      sending: "Envoi…",
      submit: "Insert coin · Envoyer",
      errName: "Ajoute un nom (ou un alias épique).",
      errEmailRequired: "Il nous faut un email pour répondre.",
      errEmailInvalid: "Cet email ne semble pas valide.",
      errMessage: "Dis-nous un peu plus sur le bazar créatif.",
      errGeneric: "Envoi impossible. Réessaie ou écris à {email}",
      errNetwork: "Réseau down. Écris à {email} et on règle ça offline.",
      successEyebrow: "Coin accepted",
      successTitle: "Message en route.",
      successBody: "Reçu. Réponse humaine depuis Andorre — pas un bot de 2012.",
      sendAnother: "Envoyer un autre",
      orWrite: "Ou écris à",
      defaultSuccess: "Message reçu. On te répond bientôt.",
    },
    cta: {
      eyebrow: "Préférence offline",
      title: "Un café en Andorre plutôt ?",
      body: "Aussi. Amène le brief. On amène l’exécution. Les montagnes regardent.",
      button: "Planifier par email",
      emailSubject: "Café en Andorre",
    },
  },
  projectsPage: {
    eyebrowCases: "Cas",
    eyebrowOs: "Vertical OS",
    title: "Projets",
    bodyMobile:
      "Quatre cas réels. Client, type et année visibles — touche et entre.",
    bodyDesktop:
      "Vertical OS : le bureau d’antan, modernisé. Ouvre des fenêtres, glisse, minimise sans pitié.",
    desktopMeta: "Desktop · v2.0 · {count} cases loaded",
    tip: "Astuce : Start → projets · rouge ferme · jaune minimise · Esc ferme",
    indexLabel: "Index des projets",
    mobileAria: "Liste des projets",
    mobileCount: "{count} cas · touche pour ouvrir",
    mobileDesktopHint: "Sur desktop : Vertical OS avec fenêtres",
    booting: "Booting Vertical OS",
    notFound: "Projet introuvable.",
  },
  projectDetail: {
    context: "Contexte",
    approach: "Approche",
    deliverables: "Livrables",
    outcome: "Résultat",
    gallery: "Galerie",
    loadMore: "Charger plus de frames",
    prev: "← Précédent",
    next: "Suivant →",
    ctaEyebrow: "Écran suivant",
    ctaTitle: "Un autre projet ensemble ?",
    ctaBody: "Si ça résonne, parlons. Insert coin et on démarre.",
    startProject: "Démarrer un projet",
    backProjects: "← Retour aux projets",
    problem: "Le problème",
    idea: "L’idée",
    machineOut: "Ce qui est sorti de la machine",
    impact: "Impact",
    moreProjects: "Plus de projets",
    anotherCase: "Un autre cas comme celui-ci ?",
    tellBrief: "Parle-nous du brief.",
    projectType: "Type de projet",
    nextScreen: "Écran suivant",
  },
  projectItems: {
    "fep-2026": {
      subtitle: "Motion graphics · Festival",
      projectType: "Motion campaign",
      role: "Directeur créatif",
      categories: ["Animation", "Motion", "Campaign"],
      excerpt:
        "Loops et animations pour FEP2026 : énergie de festival dans des frames qu’on ne scroll pas.",
      description:
        "Estéreo Picnic n’est pas “une affiche avec des dates”. C’est un univers. Brief : animer cet univers sans diluer la marque du festival.",
      caseStudy: {
        context:
          "Un festival d’échelle continentale a besoin d’assets qui marchent sur écrans géants, reels et backstage à la fois — même énergie, jamais stock “musique et lumières”.",
        approach:
          "Chaque loop comme un single : palette sync, rythme d’artiste et un hook visuel lisible en 0,5 s. Moins d’intro générique, plus d’identité en mouvement.",
        deliverables: [
          "Système de loops et boucles de marque",
          "Pièces par artiste / moment du festival",
          "Master 1080p + cutdowns social",
          "Palette et timing partagés entre pièces",
        ],
        outcome:
          "Un mur de motion qui se lit FEP instantanément : plus de scroll-stop, plus de cohérence de campagne et un kit réutilisable pour le marketing du festival.",
      },
    },
    "cafeteros-co": {
      subtitle: "Branding intégral",
      projectType: "Brand system",
      role: "Brand Designer",
      categories: ["Branding", "Packaging"],
      excerpt:
        "Identité et packaging pour un café colombien avec caractère d’origine et lecture moderne.",
      description:
        "Café à pedigree d’origine qui concurrençait un rayon plein de “sacs bruns avec une feuille”. Il fallait sentir la Colombie sans clichés de carte postale.",
      caseStudy: {
        context:
          "Marque émergente de café de spécialité : système visuel complet (pas juste un logo) pour pack, POS et digital — fierté d’origine, zéro folklore cheap.",
        approach:
          "Système tactile : typo avec du poids, couleur de torréfaction, iconographie de process et packaging lisible à un mètre. Tradition en fond, contemporain en surface.",
        deliverables: [
          "Identité verbale et visuelle",
          "Système de packaging (lignes et variantes)",
          "Applications de marque et matériaux POS",
          "Kit d’assets web et social",
        ],
        outcome:
          "Une marque reconnue en rayon et en feed : plus de cohérence entre grain, sachet et conversation. Le système scale vers de nouvelles lignes sans réinventer le moulin.",
      },
    },
    "koaj-3d": {
      subtitle: "Direction visuelle 3D",
      projectType: "3D fashion",
      role: "3D Artist",
      categories: ["3D", "Fashion", "Digital"],
      excerpt:
        "Renders et direction 3D pour le retail fashion : produit clair, atmosphère premium.",
      description:
        "Retail fashion qui voulait du digital-first sans perdre la lecture du vêtement. Défi : volume et désir dans le même plan.",
      caseStudy: {
        context:
          "Campagne et actifs digitaux pour une marque de mode : pièces 3D qui vendent silhouette et texture à l’écran — pas un lookbook plat scanné.",
        approach:
          "Direction visuelle axée composition éditoriale : lumière, matière et pose. Chaque render se comporte comme un still de campagne — lisible en grid, puissant en plein écran.",
        deliverables: [
          "Série de renders hero et product",
          "Exploration matières et look development",
          "Assets e-commerce et campagne digitale",
          "Variantes de format (feed, story, display)",
        ],
        outcome:
          "Un set d’images avec caractère de marque et lecture claire du produit. Plus d’impact digital et un langage 3D réutilisable pour les drops futurs.",
      },
    },
    "ux-pedigree": {
      subtitle: "Product design · App",
      projectType: "Product UX/UI",
      role: "UX/UI Designer",
      categories: ["UX/UI", "Product"],
      excerpt:
        "App University GB : onboarding, shell et ton produit qui fait remuer la queue.",
      description:
        "Produit digital pour une marque qui parle aux humains et aux chiens. Brief : utile, clair et avec de la personnalité — sans infantiliser ni ennuyer.",
      caseStudy: {
        context:
          "University GB avait besoin d’une app qui guide l’utilisateur (et son chien) sans friction : login, sources de contenu et un shell de marque, pas un template générique.",
        approach:
          "UX propre d’abord, caractère ensuite. Flux courts, hiérarchie typo forte et un mascot system qui renforce le ton sans voler la tâche. Chaque écran a un “pourquoi tu es là”.",
        deliverables: [
          "Flux d’onboarding et login",
          "App shell et navigation principale",
          "UI kits des écrans clés",
          "Assets mascotte / caractère produit",
        ],
        outcome:
          "Un produit plus lisible avec une voix propre : moins d’écrans de remplissage, plus de clarté sur la tâche et un système prêt à itérer sans casser le ton.",
      },
    },
  },
  desktop: {
    readme: "lisez-moi.txt",
    about: "À propos de Vertical",
    projects: "Projets",
    start: "Start",
    closeMenu: "Fermer le menu démarrer",
    linuxMode: "Linux mode (blague)",
  },
  privacy: {
    eyebrow: "Legal",
    title: "Confidentialité",
    updated: "Dernière mise à jour : août 2026 · {name} ({location})",
    backContact: "← Retour au contact",
    sections: [
      {
        title: "1. Responsable",
        body: "Le responsable du traitement des données est {name}, basé à {location}. Contact : {email}.",
      },
      {
        title: "2. Quelles données nous collectons",
        body: "Via le formulaire de contact nous pouvons traiter les données listées. Nous ne demandons ni données de paiement ni pièces d’identité via ce site.",
        list: [
          "Nom ou alias",
          "Adresse e-mail",
          "Entreprise (optionnel)",
          "Budget indicatif (optionnel)",
          "Message et contenu du projet que tu partages",
        ],
      },
      {
        title: "3. Finalité et base légale",
        body: "Nous utilisons ces données uniquement pour répondre à ta demande, évaluer le brief et, le cas échéant, démarrer une relation commerciale. La base légale est ton consentement à l’envoi du formulaire et, le cas échéant, des mesures précontractuelles à ta demande.",
      },
      {
        title: "4. Conservation",
        body: "Nous conservons les messages le temps nécessaire pour gérer la conversation et les obligations légales applicables. Sans relation commerciale, ils sont supprimés ou archivés de façon limitée lorsqu’ils ne sont plus nécessaires.",
      },
      {
        title: "5. Sous-traitants et outils",
        body: "L’envoi des e-mails du formulaire peut passer par un fournisseur d’e-mail transactionnel (p. ex. Resend). L’hébergement peut être sur Vercel ou un autre cloud. Ces fournisseurs agissent comme sous-traitants selon leurs propres termes et mesures de sécurité.",
      },
      {
        title: "6. Cookies et analytics",
        body: "Ce site n’utilise pas de cookies publicitaires ni de trackers tiers par défaut. Des cookies techniques indispensables peuvent être utilisés (p. ex. préférences de session). Si l’analytics est activée plus tard, nous informerons et, si requis, demanderons le consentement.",
      },
      {
        title: "7. Tes droits",
        body: "Tu peux demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement, et la portabilité le cas échéant, en écrivant à {email}. Tu peux aussi déposer une réclamation auprès de l’autorité compétente en Andorre ou dans ton pays de résidence dans l’UE.",
      },
      {
        title: "8. Sécurité",
        body: "Nous appliquons des mesures techniques et organisationnelles raisonnables (HTTPS, validation des formulaires, limites d’envoi). Aucun système n’est 100 % sûr ; si tu détectes un incident, préviens-nous.",
      },
      {
        title: "9. Modifications",
        body: "Nous pouvons mettre à jour cette politique. La version en vigueur sera toujours à cette URL : {url}/privacidad.",
      },
    ],
  },
  notFound: {
    code: "Error 404",
    titleLine1: "Cette page",
    titleLine2: "n’existe pas",
    body: "Niveau introuvable. Retourne à l’accueil et choisis un autre écran.",
    home: "Retour à l’accueil →",
  },
  errorPage: {
    eyebrow: "Quelque chose a cassé",
    title: "Game over (temporaire)",
    body: "Erreur inattendue. Respire et réessaie.",
    retry: "Réessayer",
  },
  site: {
    pitch:
      "Nous créons des marques qui vont plus loin, plus étrange et avec plus de craft.",
  },
};

export default fr;
