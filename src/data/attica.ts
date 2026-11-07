export interface KaratRate {
  karat: string;
  label: string;
  purity: number;
  rate: number;
  drift: number;
}

export const BASE_RATES: KaratRate[] = [
  { karat: "24K", label: "Pure 999", purity: 0.999, rate: 15200, drift: 0.34 },
  { karat: "22K", label: "Jewellery 916", purity: 0.916, rate: 13700, drift: 0.28 },
  { karat: "18K", label: "Stone-set 750", purity: 0.75, rate: 11400, drift: -0.12 },
  { karat: "14K", label: "Light 585", purity: 0.585, rate: 8890, drift: 0.06 },
];

export const CITY_TICKER = [
  { city: "Bengaluru", rate22: 13700, rate24: 15200, change: 0.42 },
  { city: "Hyderabad", rate22: 13688, rate24: 15186, change: 0.38 },
  { city: "Chennai", rate22: 13712, rate24: 15212, change: -0.16 },
  { city: "Vijayawada", rate22: 13674, rate24: 15170, change: 0.21 },
  { city: "Mysuru", rate22: 13695, rate24: 15194, change: 0.09 },
  { city: "Kurnool", rate22: 13660, rate24: 15155, change: -0.24 },
  { city: "Mangaluru", rate22: 13701, rate24: 15201, change: 0.31 },
  { city: "Hubballi", rate22: 13668, rate24: 15163, change: 0.12 },
  { city: "Coimbatore", rate22: 13706, rate24: 15207, change: -0.08 },
  { city: "Tirupati", rate22: 13681, rate24: 15178, change: 0.17 },
  { city: "Warangal", rate22: 13655, rate24: 15149, change: 0.05 },
  { city: "Belagavi", rate22: 13690, rate24: 15189, change: -0.19 },
];

export const HERO_IMAGE =
  "https://images.pexels.com/photos/8442352/pexels-photo-8442352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
export const CRAFT_IMAGE =
  "https://images.pexels.com/photos/37485313/pexels-photo-37485313.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
export const SCALES_IMAGE =
  "https://images.pexels.com/photos/8666812/pexels-photo-8666812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
export const STORE_IMAGE =
  "https://images.pexels.com/photos/11048312/pexels-photo-11048312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
export const INDIAN_STORE_IMAGE =
  "https://images.pexels.com/photos/14707127/pexels-photo-14707127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
export const COUNTER_IMAGE =
  "https://images.pexels.com/photos/11179276/pexels-photo-11179276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export interface Stats {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  note: string;
}

export const TRUST_STATS: Stats[] = [
  { value: 14, suffix: "+", label: "Years of Excellence", note: "Serving South India since 2011" },
  { value: 200, suffix: "+", label: "Branches", note: "Largest gold-buying network in India" },
  {
    value: 1.5,
    suffix: " Cr+",
    decimals: 1,
    label: "Happy Customers",
    note: "Every valuation done in front of you",
  },
  { value: 99.6, suffix: "%", decimals: 1, label: "Payout Accuracy", note: "Against live IBJA benchmark" },
];

export interface ItemType {
  id: string;
  label: string;
  deduction: number;
  note: string;
}

export const ITEM_TYPES: ItemType[] = [
  { id: "jewellery", label: "Jewellery", deduction: 2.4, note: "Stones & solder removed from weight" },
  { id: "coin", label: "Coins", deduction: 0.8, note: "Mint-sealed, near pure assay" },
  { id: "bar", label: "Bars / Biscuits", deduction: 0.4, note: "Hallmarked bullion, fastest payout" },
  { id: "broken", label: "Broken / Old", deduction: 3.1, note: "Mixed karat lot, XRF sorted" },
];

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
  meta: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Walk in, or book a slot",
    body: "Visit any of our 200+ branches — open all seven days — or book a free valuation slot online and skip the queue. No appointment needed for standard jewellery.",
    meta: "Avg. wait: under 6 minutes",
  },
  {
    step: "02",
    title: "XRF purity test in front of you",
    body: "Your gold is weighed on a stamped 0.001g balance and scanned with a calibrated XRF karatmeter. You watch the reading on the customer-facing display the entire time.",
    meta: "Calibrated & certified monthly",
  },
  {
    step: "03",
    title: "Live rate, itemised offer",
    body: "The offer is built from today's live IBJA rate, the exact purity reading and gross weight. Every deduction is shown as a separate line — nothing hidden, nothing negotiated away.",
    meta: "Highest price guaranteed",
  },
  {
    step: "04",
    title: "Instant payment, your choice",
    body: "Accept the offer and money moves within minutes — IMPS / NEFT to your account, or cash within RBI limits. Carry a government ID and you are done the same visit.",
    meta: "Payout in 5–12 minutes",
  },
];

export interface WeBuyItem {
  id: string;
  title: string;
  body: string;
  rate: string;
  image: string;
  span: string;
  tag?: string;
}

export const WE_BUY: WeBuyItem[] = [
  {
    id: "ornamental",
    title: "Old & ornamental jewellery",
    body: "Necklaces, bangles, chains, rings, temple jewellery and inherited pieces — any condition, any karat, solder and stones deducted transparently before weighing.",
    rate: "Up to ₹15,200 / g",
    image: CRAFT_IMAGE,
    span: "lg:col-span-7 lg:row-span-2",
    tag: "Highest volume",
  },
  {
    id: "coins",
    title: "Gold coins",
    body: "Mint coins, commemorative issues and temple tokens assayed at 999 or 916.",
    rate: "Up to ₹15,180 / g",
    image:
      "https://images.pexels.com/photos/8442328/pexels-photo-8442328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    span: "lg:col-span-5",
  },
  {
    id: "bars",
    title: "Bars & biscuits",
    body: "Hallmarked bullion with assay certificate — paid at the tightest spread in the market.",
    rate: "Up to ₹15,196 / g",
    image: HERO_IMAGE,
    span: "lg:col-span-5",
    tag: "Fastest payout",
  },
  {
    id: "diamond",
    title: "Diamond & precious stones",
    body: "Loose and set diamonds, emeralds and rubies graded separately — never clubbed into gold weight.",
    rate: "Graded on 4C",
    image:
      "https://images.pexels.com/photos/38774780/pexels-photo-38774780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "lg:col-span-4",
  },
  {
    id: "silver",
    title: "Silver articles",
    body: "Pooja items, anklets, utensils and industrial silver bought at live spot rates.",
    rate: "Live spot",
    image:
      "https://images.pexels.com/photos/31209274/pexels-photo-31209274.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    span: "lg:col-span-4",
  },
  {
    id: "broken",
    title: "Broken & damaged gold",
    body: "Snapped chains, bent bangles, single earrings — sorted by XRF and paid per karat lot.",
    rate: "Per purity lot",
    image:
      "https://images.pexels.com/photos/4595719/pexels-photo-4595719.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    span: "lg:col-span-4",
  },
];

export interface CollectionItem {
  name: string;
  category: string;
  price: string;
  image: string;
  note: string;
}

export const COLLECTION: CollectionItem[] = [
  {
    name: "Bridal Choker Set",
    category: "Jewellery",
    price: "On request",
    image:
      "https://images.pexels.com/photos/7679654/pexels-photo-7679654.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    note: "22K · Temple work",
  },
  {
    name: "Vanti Chain, 40g",
    category: "Jewellery",
    price: "₹5.48 L",
    image:
      "https://images.pexels.com/photos/20858950/pexels-photo-20858950.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    note: "22K · Daily wear",
  },
  {
    name: "Gemstone Charm Pendant",
    category: "Diamonds",
    price: "₹1.92 L",
    image:
      "https://images.pexels.com/photos/38774780/pexels-photo-38774780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    note: "18K · Certified stones",
  },
  {
    name: "Minted Gold Coin, 10g",
    category: "Coins",
    price: "₹1.52 L",
    image:
      "https://images.pexels.com/photos/8442326/pexels-photo-8442326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    note: "24K · 999 fine",
  },
  {
    name: "Assay Bar, 100g",
    category: "Gold Bars",
    price: "₹15.20 L",
    image:
      "https://images.pexels.com/photos/8442330/pexels-photo-8442330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    note: "24K · Certificate included",
  },
  {
    name: "Traditional Beaded Set",
    category: "Jewellery",
    price: "On request",
    image: CRAFT_IMAGE,
    note: "22K · Handcrafted",
  },
];

export interface Advantage {
  title: string;
  body: string;
  proof: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    title: "Highest gold rate, guaranteed",
    body: "We benchmark against the live IBJA rate twice a day and match or beat any written quote from a recognised buyer on the same purity reading.",
    proof: "Rate revised 09:40 & 15:10 IST daily",
  },
  {
    title: "100% transparency",
    body: "Weight, purity, gross value and every deduction appear on a printed itemised slip. What we say is exactly what we pay — no hidden melting or wastage charges.",
    proof: "Itemised slip on every transaction",
  },
  {
    title: "Instant payment",
    body: "IMPS or NEFT to your bank within minutes of acceptance, or cash within RBI limits. Never a cheque, never a waiting period.",
    proof: "Median payout time: 8 minutes",
  },
  {
    title: "Expert evaluation",
    body: "Calibrated XRF karatmeters and stamped 0.001g balances at every counter, operated by trained appraisers who assess in full view of the customer.",
    proof: "Machines certified every 30 days",
  },
  {
    title: "Safe & secure",
    body: "RBI-compliant KYC, CCTV-covered counters, insured transit and complete privacy — your details are never shared with third-party jewellers.",
    proof: "Insured vault transit, all branches",
  },
  {
    title: "Trusted by millions",
    body: "Fourteen years, over 200 branches and 1.5 crore customers. A customer-first experience built one honest valuation at a time.",
    proof: "4.9 average across 12,480 reviews",
  },
];

export interface Branch {
  id: string;
  name: string;
  area: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  flagship?: boolean;
}

export const BRANCHES: Branch[] = [
  {
    id: "blr-mg",
    name: "MG Road Flagship",
    area: "MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    address: "No. 42, Prestige Meridian, MG Road, Bengaluru 560001",
    phone: "+91 80 4120 8800",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
    flagship: true,
  },
  {
    id: "blr-jp",
    name: "Jayanagar 4th Block",
    area: "Jayanagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "No. 118, 4th Block, Jayanagar, Bengaluru 560011",
    phone: "+91 80 2663 4100",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "blr-raj",
    name: "Rajajinagar Branch",
    area: "Rajajinagar",
    city: "Bengaluru",
    state: "Karnataka",
    address: "No. 71, Dr. Rajkumar Road, Rajajinagar, Bengaluru 560010",
    phone: "+91 80 2332 7700",
    hours: "9:30 AM – 6:30 PM · Open 7 days",
  },
  {
    id: "hyd-banjara",
    name: "Banjara Hills Hub",
    area: "Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    address: "Plot 18, Road No. 12, Banjara Hills, Hyderabad 500034",
    phone: "+91 40 2338 9100",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
    flagship: true,
  },
  {
    id: "hyd-kukat",
    name: "Kukatpally Branch",
    area: "Kukatpally",
    city: "Hyderabad",
    state: "Telangana",
    address: "MIG 214, KPHB Colony, Kukatpally, Hyderabad 500072",
    phone: "+91 40 2305 4400",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "chn-nagar",
    name: "T. Nagar Flagship",
    area: "T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "114 Usman Road, T. Nagar, Chennai 600017",
    phone: "+91 44 2815 4400",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
    flagship: true,
  },
  {
    id: "chn-anna",
    name: "Anna Nagar East",
    area: "Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "AE 12, 2nd Avenue, Anna Nagar East, Chennai 600102",
    phone: "+91 44 2621 8800",
    hours: "9:30 AM – 6:30 PM · Open 7 days",
  },
  {
    id: "vja-benz",
    name: "Benz Circle Branch",
    area: "Benz Circle",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    address: "MG Road, Near Benz Circle, Vijayawada 520010",
    phone: "+91 866 248 7700",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "mys-sr",
    name: "Sayyaji Rao Road",
    area: "Devaraja Mohalla",
    city: "Mysuru",
    state: "Karnataka",
    address: "228 Sayyaji Rao Road, Devaraja Mohalla, Mysuru 570001",
    phone: "+91 821 242 5500",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "knl-raj",
    name: "Rajvihar Circle",
    area: "Park Road",
    city: "Kurnool",
    state: "Andhra Pradesh",
    address: "Shop 4, Park Road, Rajvihar Circle, Kurnool 518001",
    phone: "+91 8518 229 300",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "mgl-hampton",
    name: "Hampankatta Branch",
    area: "Hampankatta",
    city: "Mangaluru",
    state: "Karnataka",
    address: "KS Rao Road, Hampankatta, Mangaluru 575001",
    phone: "+91 824 242 1900",
    hours: "9:30 AM – 6:30 PM · Open 7 days",
  },
  {
    id: "cbe-rs",
    name: "RS Puram Branch",
    area: "RS Puram",
    city: "Coimbatore",
    state: "Tamil Nadu",
    address: "1043 Avinashi Road, RS Puram, Coimbatore 641002",
    phone: "+91 422 437 6600",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
  {
    id: "hbb-club",
    name: "Club Road Branch",
    area: "Club Road",
    city: "Hubballi",
    state: "Karnataka",
    address: "24 Club Road, Vidyanagar, Hubballi 580029",
    phone: "+91 836 237 4400",
    hours: "9:30 AM – 6:30 PM · Open 7 days",
  },
  {
    id: "tpt-leela",
    name: "Leela Mahal Centre",
    area: "Leela Mahal",
    city: "Tirupati",
    state: "Andhra Pradesh",
    address: "19-3-43 Leela Mahal Circle, Tirupati 517501",
    phone: "+91 877 226 3300",
    hours: "9:00 AM – 6:00 PM · Open 7 days",
  },
];

export const STATES = ["All states", "Karnataka", "Telangana", "Tamil Nadu", "Andhra Pradesh"];

export interface Review {
  name: string;
  city: string;
  rating: number;
  when: string;
  text: string;
  amount: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Lakshmi Narasimhan",
    city: "Bengaluru",
    rating: 5,
    when: "2 weeks ago",
    text: "Sold my mother's old bangles here. They showed me the XRF reading on the screen, explained every deduction and paid by IMPS before I left the counter. ₹3.1 lakh more than the jeweller near my house offered.",
    amount: "Sold 84.2 g · MG Road",
  },
  {
    name: "Padmavathi Devi",
    city: "Hyderabad",
    rating: 5,
    when: "1 month ago",
    text: "I was nervous about selling gold for the first time. The staff at Banjara Hills were patient, gave me a printed itemised slip and never rushed me. Completely transparent process.",
    amount: "Sold 46.5 g · Banjara Hills",
  },
  {
    name: "Subhashini Chandrasekhar",
    city: "Chennai",
    rating: 5,
    when: "3 weeks ago",
    text: "Compared three buyers in T. Nagar. Attica matched the live rate exactly and had the lowest deduction. Money was in my account in eleven minutes.",
    amount: "Sold 132 g · T. Nagar",
  },
  {
    name: "Ramesh Babu K",
    city: "Vijayawada",
    rating: 4,
    when: "2 months ago",
    text: "Good rate and honest weighing. Only reason for four stars is that the branch was crowded on a Saturday — go on a weekday morning if you can.",
    amount: "Sold 28 g · Benz Circle",
  },
  {
    name: "Savitha Krishnamurthy",
    city: "Mysuru",
    rating: 5,
    when: "5 days ago",
    text: "Broken chain and a single earring — other shops refused to take them. Attica sorted it by karat on the machine and paid for both lots separately.",
    amount: "Sold 19.7 g · Sayyaji Rao Road",
  },
  {
    name: "Prakash Reddy",
    city: "Kurnool",
    rating: 5,
    when: "1 week ago",
    text: "Rate was ₹140 per gram higher than the local buyer. They even showed me the day's IBJA printout. This is how gold buying should work everywhere.",
    amount: "Sold 61 g · Rajvihar Circle",
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0.6 },
  { stars: 1, pct: 0.4 },
];

export interface Article {
  title: string;
  category: string;
  read: string;
  excerpt: string;
  featured?: boolean;
  image?: string;
}

export const ARTICLES: Article[] = [
  {
    title: "Gold vs Real Estate in India: Which Gives Better Returns?",
    category: "Investment",
    read: "9 min read",
    excerpt:
      "The two most beloved asset classes for Indian families. Both are tangible, both hold cultural significance, both have delivered strong returns historically — but liquidity, taxation and entry cost behave very differently.",
    featured: true,
    image: HERO_IMAGE,
  },
  {
    title: "185 Gram Gold Price Today — 22K, 24K & 18K Selling Rate",
    category: "Rate Guide",
    read: "4 min read",
    excerpt:
      "Live per-karat breakdown for 185 g, plus what you actually receive at the branch after purity testing and deductions.",
  },
  {
    title: "Sell Gold in Kurnool: Live Rate & Trusted Buyers",
    category: "City Guide",
    read: "6 min read",
    excerpt:
      "Today's Kurnool rate, how to calculate your own payout, and the checks to run before handing gold to any buyer.",
  },
  {
    title: "Gold vs Fixed Deposit: Which Is a Better Investment?",
    category: "Investment",
    read: "7 min read",
    excerpt:
      "Honest numbers on returns, risk and tax treatment — without pushing you towards either.",
  },
];

export const FAQS = [
  {
    q: "Where can I sell gold for the best price?",
    a: "Sell to a buyer who tests purity in front of you on a calibrated XRF karatmeter, quotes from the live IBJA rate and gives you an itemised written slip. Attica does all three at every one of our 200+ branches, and we match or beat any written quote from a recognised buyer on the same purity reading.",
  },
  {
    q: "Is my gold safe during the evaluation?",
    a: "Yes. Your gold never leaves the counter or your line of sight. Weighing happens on a stamped 0.001g balance and the XRF reading appears on a customer-facing display. Every counter is CCTV-covered, and the whole process is documented on a printed slip you keep.",
  },
  {
    q: "Do you deduct any charges from the payout?",
    a: "Only what is physically not gold: stones, solder, wax and any non-metal fittings are removed before weighing, and an assay charge of 0.4%–3.1% applies depending on item type. Every deduction is shown as a separate line on your slip and explained before you accept the offer.",
  },
  {
    q: "What documents do I need to bring?",
    a: "One valid government-issued photo ID (Aadhaar, PAN, passport, voter ID or driving licence) and your bank details if you want an IMPS or NEFT transfer. For cash payouts within RBI limits, the ID alone is sufficient.",
  },
  {
    q: "How fast is instant payment, really?",
    a: "Median payout time across our network is 8 minutes from offer acceptance. Bank transfers via IMPS land in 5–12 minutes; cash is handed over immediately within RBI-prescribed limits. We never issue cheques or ask you to wait.",
  },
  {
    q: "Can I sell broken, damaged or single-piece gold?",
    a: "Absolutely. Snapped chains, bent bangles, single earrings and inherited fragments are sorted by karat on the XRF machine and paid per purity lot — never rejected and never clubbed into a single low rate.",
  },
  {
    q: "Do you buy gold coins and bars?",
    a: "Yes. Mint-sealed coins assay at 999 and are paid at the tightest spread, while hallmarked bars with an assay certificate carry the lowest deduction of all categories (0.4%) and the fastest payout.",
  },
  {
    q: "Are your branches open on weekends?",
    a: "All Attica branches are open seven days a week, typically 9:00 AM to 6:00 PM, with a few branches running 9:30 AM to 6:30 PM. Weekday mornings are the least crowded if you prefer a quieter visit.",
  },
];

export const CONTACT = {
  phone: "+91 8880 300 300",
  phoneHref: "tel:+918880300300",
  email: "info@atticagoldcompany.com",
  whatsapp: "https://wa.me/918880300300",
  site: "atticagoldcompany.com",
  hours: "9:00 AM – 6:00 PM · Open all 7 days",
};

export const CITIES_SERVED = [
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Vijayawada",
  "Mysuru",
  "Kurnool",
  "Mangaluru",
  "Hubballi",
  "Coimbatore",
  "Tirupati",
  "Warangal",
  "Belagavi",
  "Guntur",
  "Nellore",
  "Madurai",
  "Salem",
];
