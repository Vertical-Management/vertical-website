/** Full site dictionary shape — chrome + every page. */

export type ServiceCopy = {
  title: string;
  punch: string;
  description: string;
  longDescription: string;
  tags: string[];
  deliverables: string[];
};

export type ProcessStepCopy = {
  title: string;
  description: string;
};

export type FaqItem = { q: string; a: string };

export type ProjectCopy = {
  subtitle: string;
  projectType: string;
  role: string;
  categories: string[];
  excerpt: string;
  description: string;
  caseStudy: {
    context: string;
    approach: string;
    deliverables: string[];
    outcome: string;
  };
};

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
  };
  header: {
    insertCoin: string;
    language: string;
    selectLanguage: string;
  };
  footer: {
    letsTalk: string;
    ctaLine1: string;
    ctaAccent: string;
    ctaLine2: string;
    writeContact: string;
    navigate: string;
    social: string;
    contact: string;
    privacy: string;
    legalNotice: string;
    cookies: string;
    highScores: string;
    madeIn: string;
  };
  menu: {
    ariaLabel: string;
    mainNav: string;
  };
  common: {
    skipToContent: string;
    mainNav: string;
    explore: string;
    openProject: string;
    viewCase: string;
    client: string;
    type: string;
    year: string;
    role: string;
    loading: string;
  };
  home: {
    hero: {
      creativeManagement: string;
      line1: string;
      line2: string;
      pitch: string;
      insertCoin: string;
      viewProjects: string;
      rotating: string[];
      tags: string[];
      /** Geo badge while IP lookup runs */
      locationLoading: string;
      /** Accessible name for the hero section */
      sectionLabel: string;
    };
    marquee: { rowA: string[]; rowB: string[] };
    manifesto: {
      eyebrow: string;
      lines: string[];
      body: string;
    };
    work: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      allProjects: string;
      enterDesktop: string;
    };
    services: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      blurb: string;
      explore: string;
      viewAll: string;
    };
    about: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      body: string;
      founder: string;
      basedIn: string;
      principles: { index: string; title: string; body: string }[];
      storyCta: string;
    };
    cta: {
      eyebrow: string;
      words: string[];
      accentFrom: number;
      body: string;
      startProject: string;
    };
  };
  nosotrosPage: {
    hero: {
      eyebrow: string;
      title: string;
      titleMuted: string;
      body: string;
      chips: string[];
    };
    timeline: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      body: string;
      saves: {
        index: string;
        label: string;
        title: string;
        body: string;
      }[];
    };
    rules: {
      ariaLabel: string;
      eyebrow: string;
      items: {
        code: string;
        punch: string;
        title: string;
        body: string;
      }[];
    };
    founder: {
      eyebrow: string;
      role: string;
      basedIn: string;
      titleLine1: string;
      titleLine2: string;
      paragraphs: string[];
      stats: { label: string; value: string }[];
      quote: string;
    };
    cta: {
      eyebrow: string;
      titleLine1: string;
      titleAccent: string;
      body: string;
      startProject: string;
      viewProjects: string;
    };
  };
  servicesPage: {
    hero: {
      eyebrow: string;
      title: string;
      titleMuted: string;
      body: string;
    };
    blocks: {
      ariaLabel: string;
      serviceLabel: string;
      deliverablesLabel: string;
    };
    process: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      blurb: string;
      ticker: string[];
    };
    faq: {
      eyebrow: string;
      titleLine1: string;
      titleLine2: string;
      blurb: string;
      items: FaqItem[];
    };
    cta: {
      eyebrow: string;
      titleLine1: string;
      titleAccent: string;
      body: string;
      startProject: string;
      viewProjects: string;
    };
  };
  serviceItems: {
    branding: ServiceCopy;
    digital: ServiceCopy;
    motion: ServiceCopy;
    strategy: ServiceCopy;
  };
  processSteps: ProcessStepCopy[];
  contactPage: {
    hero: {
      eyebrow: string;
      title1: string;
      title2: string;
      body: string;
    };
    channels: {
      eyebrow: string;
      emailLabel: string;
      emailHint: string;
      baseLabel: string;
      baseHint: string;
      founderLabel: string;
      founderHint: string;
    };
    section: {
      eyebrow: string;
      titleLine1: string;
      titleAccent: string;
      body: string;
      deviceLabel: string;
      deviceHint: string;
    };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      budget: string;
      budgetDefault: string;
      budgetOptions: { value: string; label: string }[];
      message: string;
      messagePlaceholder: string;
      honeypot: string;
      privacyNote: string;
      privacyLink: string;
      sending: string;
      submit: string;
      errName: string;
      errEmailRequired: string;
      errEmailInvalid: string;
      errMessage: string;
      errGeneric: string;
      errNetwork: string;
      successEyebrow: string;
      successTitle: string;
      successBody: string;
      sendAnother: string;
      orWrite: string;
      defaultSuccess: string;
    };
    cta: {
      eyebrow: string;
      title: string;
      body: string;
      button: string;
      emailSubject: string;
    };
  };
  projectsPage: {
    eyebrowCases: string;
    eyebrowOs: string;
    title: string;
    bodyMobile: string;
    bodyDesktop: string;
    desktopMeta: string;
    tip: string;
    indexLabel: string;
    mobileAria: string;
    mobileCount: string;
    mobileDesktopHint: string;
    booting: string;
    notFound: string;
  };
  projectDetail: {
    context: string;
    approach: string;
    deliverables: string;
    outcome: string;
    gallery: string;
    loadMore: string;
    prev: string;
    next: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
    startProject: string;
    backProjects: string;
    problem: string;
    idea: string;
    machineOut: string;
    impact: string;
    moreProjects: string;
    anotherCase: string;
    tellBrief: string;
    projectType: string;
    nextScreen: string;
  };
  projectItems: {
    "fep-2026": ProjectCopy;
    "cafeteros-co": ProjectCopy;
    "koaj-3d": ProjectCopy;
    "ux-pedigree": ProjectCopy;
  };
  desktop: {
    readme: string;
    about: string;
    projects: string;
    start: string;
    closeMenu: string;
    linuxMode: string;
  };
  privacy: {
    eyebrow: string;
    title: string;
    updated: string;
    backContact: string;
    sections: { title: string; body: string; list?: string[] }[];
  };
  legalNotice: {
    eyebrow: string;
    title: string;
    updated: string;
    backContact: string;
    sections: { title: string; body: string; list?: string[] }[];
  };
  cookies: {
    eyebrow: string;
    title: string;
    updated: string;
    backContact: string;
    sections: { title: string; body: string; list?: string[] }[];
  };
  notFound: {
    code: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    home: string;
  };
  errorPage: {
    eyebrow: string;
    title: string;
    body: string;
    retry: string;
  };
  site: {
    pitch: string;
  };
};
