export const siteConfig = {
  brand: {
    name: "ANANTAH",
    domain: "ANANTAH.SPACE",
  },
  landing: {
    eyebrow: "Infinite by nature",
    title: "ANANTAH",
    statement: "Everything has room to become.",
    description: "Anantah is an ever-expanding home for ideas, products, and experiences. A space with no final edge.",
    primaryAction: "Enter Anantah",
    heroImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=90",
    heroImageAlt: "A luminous nebula surrounded by deep space",
  },
  projectsSection: {
    index: "01 / Constellation",
    title: "One space. Many worlds.",
    description: "Each Anantah project has its own orbit, while sharing one identity and one limitless place to grow.",
  },
  projects: [
    {
      name: "Anantah Space Fashion",
      category: "Interstellar style",
      description: "Discover clothing, shoes, bags, and watches in a premium storefront built for every screen.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=88",
      imageAlt: "Premium clothing arranged on a fashion rail",
      accent: "signal",
      path: "/fashion",
    },
    {
      name: "Anantah Space Intelligence",
      category: "AI assistant",
      description: "Think, write, research, and create with a conversational assistant designed around your permissions.",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1400&q=88",
      imageAlt: "Person interacting with an intelligent digital interface",
      accent: "solar",
      path: "/intelligence",
    },
    {
      name: "Anantah Space Play",
      category: "Games and worlds",
      description: "Explore a growing library of browser games, player challenges, achievements, and shared adventures.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=88",
      imageAlt: "Players competing in a vivid gaming arena",
      accent: "earth",
      path: "/play",
    },
  ],
  actions: {
    project: "Explore world",
    closing: "Create your Anantah ID",
  },
  closing: {
    statement: "There is always more space.",
  },
  footer: {
    statement: "Infinite, by design.",
    copyright: "© 2026",
  },
} as const;