export const HOME_DEFAULT = {
  hero: {
    badge: "Humanitarian Mission First",
    line1: "Securing the World's",
    highlight: "Food Future",
    line3: "Today",
    description:
      "United Stored Unitized Food (USUF) is an Egyptian Agricultural Treasury dedicated to global food security through innovative asset-backed unitization.",
  },
  mission: {
    title: "Our Humanitarian Commitment",
    subtitle:
      "We leverage Egypt's agricultural potential to create a stable, transparent, and resilient food reserve for the entire world.",
    cards: [
      {
        title: "Egypt & Africa",
        desc: "Supporting African nations through fair trade and humanitarian assistance, securing the continent's food base from Cairo.",
      },
      {
        title: "Desert Greening",
        desc: "Transforming arid landscapes into productive agricultural hubs through sustainable desert farming and modern technology.",
      },
      {
        title: "Global Stability",
        desc: "Functioning as a humanitarian stabilization mechanism to combat food price volatility on a global scale.",
      },
    ],
  },
  operations: {
    title: "Current Operations in Southern Egypt",
    intro:
      "USUF is currently actively growing and harvesting on 100 acres of fertile farmland in southern Egypt. This is just the beginning of our journey to secure the regional food supply.",
    expansion:
      "We are on track to expand to 10,000 acres this season. With the success of the USUF token sale, we aim to scale even further, accelerating the greening of the desert and global food security.",
    location: "Southern Egypt Agricultural Zone",
  },
  token: {
    title: "The USUF Token: Unitizing Food Security",
    description:
      "The USUF token is the digital representation of our physical reserves. Every token is backed by actual food assets in our treasury.",
    ratioLabel: "1 USUF = 1 KG Basket Food Value",
    ecosystemText:
      "By participating in the USUF ecosystem, you are directly supporting the expansion of agricultural reserves and the greening of the desert.",
  },
};

export const SALE_DEFAULT = {
  title: "Join the USUF Presale",
  subtitle:
    "Secure your stake in the world's first asset-backed food reserve token. Available supply is limited.",
};

export const WHITEPAPER_DEFAULT = {
  sections: [
    {
      icon: "Info",
      title: "1. Executive Summary",
      content:
        "USUF is a food-reserve-backed digital token designed to represent ownership claims against verified stored food inventory. Each USUF token is redeemable for $1 USD equivalent wholesale value of stored food inventory.",
    },
    {
      icon: "Shield",
      title: "2. Problem Statement",
      content:
        "Global food systems face supply chain instability, inflationary volatility, and geopolitical disruptions. USUF addresses the lack of a transparent, blockchain-based, globally accessible food-backed reserve instrument.",
    },
    {
      icon: "FileText",
      title: "4. Token Overview",
      content:
        "Name: United Stored Unitized Food | Ticker: USUF | Blockchain: Polygon | Standard: ERC-20 | Backing: 100% Food Reserve | Redemption Floor: $1 USD equivalent.",
    },
    {
      icon: "Lock",
      title: "5. Reserve Framework",
      content:
        "100% food-backed at all times with a 102-105% target buffer. Reserves consist of non-perishable staple foods in insured, verified warehouses. No derivatives or algorithmic leverage.",
    },
    {
      icon: "BarChart3",
      title: "6. Minting Policy",
      content:
        "Elastic supply model where tokens are minted ONLY when verified food inventory is added. Governance is controlled via a multi-signature treasury (e.g., 2-of-3 signers).",
    },
    {
      icon: "Scale",
      title: "7. Redemption Framework",
      content:
        "Redeemable for physical food pickup, delivery, or warehouse credit. Processing window is 3-10 business days. Minimum thresholds may apply for efficiency.",
    },
    {
      icon: "Globe",
      title: "8. Initial Allocation",
      content:
        "Public Sale: 60% | Institutional Reserve: 15% | Operational Treasury: 10% | Infrastructure: 10% | Governance: 5%. All units remain 100% reserve-backed.",
    },
    {
      icon: "CheckCircle2",
      title: "13. Transparency Commitment",
      content:
        "Commitment to quarterly reserve statements, supply transparency, and public reporting. Future plans include independent third-party audits and real-time dashboards.",
    },
  ],
};

export type HomeContent = typeof HOME_DEFAULT;
export type SaleContent = typeof SALE_DEFAULT;
export type WhitepaperContent = typeof WHITEPAPER_DEFAULT;
