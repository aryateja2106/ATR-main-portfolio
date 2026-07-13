// Single source of truth for portfolio identity, links, and voice rules.
// Consumed by personal-brand-content skill, social assets, and metadata.

export const brand = {
  name: "Arya Teja Rudraraju",
  shortName: "Arya",
  site: "https://aryateja.com",
  tagline: "Agent systems that earn trust.",
  kicker: "Founder · multi-agent systems · local-first control",
  location: "India (remote, US-friendly hours)",
  email: "aryateja2106@gmail.com",

  positioning:
    "AI agent consulting for founders and teams. Secure setups, workflow audits, local-first systems, and practical implementation.",

  voice: {
    tone: "Grounded, capable, generous. Business-first, technically credible.",
    rules: [
      "Show proof before claims.",
      "Explain tradeoffs, not just features.",
      "Mark experiments honestly.",
      "No inflated metrics or unverified testimonials.",
      "No em-dashes in public copy.",
    ],
    avoid: [
      "AI Product Manager",
      "aspiring",
      "Dallas-based",
      "job seeker",
      "public archive",
      "terminal-green aesthetic",
      "purple-blue gradients",
    ],
  },

  links: {
    linkedin: "https://linkedin.com/in/arya-teja-rudraraju",
    x: "https://x.com/r_aryateja",
    youtube: "https://youtube.com",
    github: "https://github.com/aryateja2106",
    lesearch: "https://lesearch.ai",
    lecoder: "https://github.com/aryateja2106/lecoder-mconnect",
    agentfirst: "https://agentfirst.shop",
  },

  products: [
    {
      name: "LeSearch AI",
      mark: "PRODUCT",
      desc: "Native Apple control surface for agents across machines.",
      href: "https://lesearch.ai",
    },
    {
      name: "LeCoder MConnect",
      mark: "TOOL",
      desc: "Open-source mobile control for coding agents and terminals.",
      href: "https://github.com/aryateja2106/lecoder-mconnect",
    },
    {
      name: "AI agent consulting",
      mark: "SERVICES",
      desc: "Secure agent setup, local-first workflows, automation.",
      href: "mailto:aryateja2106@gmail.com",
    },
    {
      name: "agentfirst.shop",
      mark: "CULTURE",
      desc: "Agent-native merch for builders.",
      href: "https://agentfirst.shop",
    },
  ],

  colors: {
    cream: "#e9dfc7",
    paper: "#f6efdd",
    ink: "#131815",
    terracotta: "#a65728",
    terracottaSoft: "#c98a5a",
  },

  fonts: {
    serif: "Fraunces",
    sans: "Geist",
    mono: "JetBrains Mono",
  },
} as const;

export type Brand = typeof brand;
