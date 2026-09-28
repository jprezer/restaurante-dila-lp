export default {
  preset: "impact",

  brand: {
    name: "Restaurante Dila",
    shortName: "D",
    tagline: "Comida caseira, servida com vontade.",
    logo: "/assets/restaurante-dila-logo.png",
    logoAlt: "Logo do Restaurante Dila",
  },

  seo: {
    title: "Restaurante Dila | Buffet, marmitex e delivery em Araucária",
    description:
      "Restaurante Dila em Capela Velha, Araucária: buffet de comida caseira, marmitex, delivery e sobremesas. Faça seu pedido pelo WhatsApp.",
    keywords: [
      "restaurante em Araucária",
      "marmitex em Araucária",
      "buffet Capela Velha",
      "delivery de comida caseira",
      "Restaurante Dila",
    ],
    canonical: "https://restaurante-dila-lp.vercel.app/",
    locale: "pt_BR",
    schemaType: "Restaurant",
  },

  announcement: {
    label: "Capela Velha · Araucária, PR",
    actionLabel: "Pedidos pelo WhatsApp",
  },

  contact: {
    primaryLabel: "Pedir no WhatsApp",
    footerPrimaryLabel: "Fazer pedido",
    primaryUrl: "https://wa.me/message/YI3DNLNSIOZWH1",
    phone: "+554136437394",
    instagramLabel: "Ver Instagram",
    socialLabel: "Instagram",
    instagramUrl: "https://www.instagram.com/restaurante.dila/",
    mapsUrl: "https://maps.app.goo.gl/Re93DUhqkHGDRYEp9",
  },

  navigation: [
    { label: "O Dila", href: "#servicos" },
    { label: "Favoritos", href: "#momentos" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Endereço", href: "#visite" },
  ],

  hero: {
    kicker: "Comida caseira em Capela Velha",
    title: ["Almoço", "com gosto", "de casa."],
    accentLine: 1,
    description:
      "Buffet, marmitex, delivery e sobremesas para deixar o seu almoço mais simples — e muito mais gostoso.",
    image: "/assets/dila-buffet-hero.jpg",
    imageAlt: "Buffet de saladas e acompanhamentos do Restaurante Dila",
    imagePosition: "58% center",
    proofLabel: "No Dila você encontra",
    proofValue: "Buffet · Marmitex · Delivery",
    scrollLabel: "Conheça o Dila",
  },

  statement: {
    label: "Almoço sem enrolação",
    text: "No Dila, comida boa não precisa de cerimônia. Precisa de panela no fogo e tempero de verdade.",
    accent: "tempero de verdade.",
  },

  services: {
    title: "Comida que resolve o seu dia.",
    description:
      "Do almoço no restaurante ao pedido para casa, o Dila prepara uma refeição honesta, bem servida e cheia de sabor.",
    items: [
      {
        title: "Buffet caseiro",
        description:
          "Variedade para montar o prato do seu jeito, com saladas, acompanhamentos e aquele tempero de casa.",
        detail: "Almoço no restaurante",
      },
      {
        title: "Marmitex",
        description:
          "Uma refeição completa para levar, com praticidade para a rotina e o sabor que faz diferença na pausa do dia.",
        detail: "Peça pelo WhatsApp",
      },
      {
        title: "Delivery",
        description:
          "Seu almoço chega onde você estiver. Consulte as opções do dia e peça sem sair de casa ou do trabalho.",
        detail: "Entrega na região",
      },
      {
        title: "Clássicos da casa",
        description:
          "Feijoada, dobradinha, yakissoba, lasanha e outras receitas especiais que aparecem no cardápio.",
        detail: "Acompanhe no Instagram",
      },
    ],
  },

  gallery: {
    label: "Sabor servido de verdade",
    title: "O buffet, os pratos e as receitas que dão vontade de voltar.",
    items: [
      {
        image: "/assets/dila-buffet-hero.jpg",
        alt: "Buffet de saladas frescas do Restaurante Dila",
        caption: "Buffet caseiro",
      },
      {
        image: "/assets/dila-dobradinha.jpg",
        alt: "Dobradinha servida pelo Restaurante Dila",
        caption: "Receitas especiais",
      },
      {
        image: "/assets/dila-buffet-2.jpg",
        alt: "Buffet de legumes e saladas do Restaurante Dila",
        caption: "Todos os dias",
      },
    ],
  },

  reviews: {
    label: "Avaliações no Google",
    title: "Quem almoça aqui, volta.",
    rating: "4,4",
    total: "228 avaliações no Google",
    sourceLabel: "Ver avaliações no Google Maps",
    items: [
      {
        quote:
          "Melhor feijoada da região, sabor e ingredientes maravilhosos, a entrega é rápida, sou cliente fiel.",
        author: "Emerson Mendonça",
        score: "5/5 no Google",
      },
    ],
  },

  location: {
    label: "Vem almoçar com a gente",
    title: "Pertinho de você, em Capela Velha.",
    description:
      "Para comer no local, buscar uma marmitex ou pedir o almoço: o Restaurante Dila está na Rua Gralha-Azul, em Araucária.",
    actionLabel: "Abrir no Google Maps",
    addressLines: ["R. Gralha-Azul, 468", "Capela Velha · Araucária — PR"],
    address: {
      street: "R. Gralha-Azul, 468 - Capela Velha",
      city: "Araucária",
      region: "PR",
      postalCode: "83706-250",
      country: "BR",
    },
    hours: [
      "Segunda a sábado · 11h às 14h30",
      "Domingo · fechado",
    ],
    openingHours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "14:30",
      },
    ],
    mapEmbedUrl:
      "https://www.google.com/maps?q=Rua+Gralha-Azul,+468,+Capela+Velha,+Arauc%C3%A1ria,+PR&output=embed",
  },

  theme: {
    accent: "oklch(63% 0.2 32)",
    accentStrong: "oklch(72% 0.18 45)",
    ink: "oklch(17% 0.025 50)",
    paper: "oklch(96% 0.012 82)",
    displayFont: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    bodyFont: "Manrope, Arial, sans-serif",
  },
};
