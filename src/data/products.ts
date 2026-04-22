export type Category =
  | "tech"
  | "fashion"
  | "home"
  | "beauty"
  | "books"
  | "outdoors"
  | "kitchen"
  | "music";

export type Product = {
  id: string;
  title: string;
  brand: string;
  store: string;
  storeUrl: string;
  price: number; // USD cents
  originalPrice?: number;
  currency?: string;
  category: Category;
  image: string;
  color?: string;
  tags?: string[];
  description: string;
};

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "tech", label: "Tech", emoji: "◎" },
  { id: "fashion", label: "Fashion", emoji: "◇" },
  { id: "home", label: "Home", emoji: "◈" },
  { id: "beauty", label: "Beauty", emoji: "✦" },
  { id: "books", label: "Books", emoji: "☰" },
  { id: "outdoors", label: "Outdoors", emoji: "△" },
  { id: "kitchen", label: "Kitchen", emoji: "◐" },
  { id: "music", label: "Music", emoji: "♫" },
];

// Prices reflect approximate US retail at time of writing.
export const products: Product[] = [
  {
    id: "p_airpods_pro_2",
    title: "AirPods Pro (2nd generation) with USB‑C",
    brand: "Apple",
    store: "Apple",
    storeUrl: "https://www.apple.com/shop/buy-airpods/airpods-pro",
    price: 24900,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80",
    color: "#F2F2F2",
    tags: ["ANC", "Spatial Audio"],
    description:
      "Redesigned driver, updated H2 chip and adaptive audio. Everyone's favorite commute companion.",
  },
  {
    id: "p_kindle_paperwhite",
    title: "Kindle Paperwhite (16 GB)",
    brand: "Amazon",
    store: "Amazon",
    storeUrl: "https://www.amazon.com/dp/B0CFPJYX3X",
    price: 15999,
    originalPrice: 17999,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=1200&q=80",
    color: "#1b1b1d",
    tags: ["7‑inch", "Warm light"],
    description:
      'Glare‑free 7" display, weeks of battery and USB‑C. The one gadget that makes you read more.',
  },
  {
    id: "p_sony_wh1000xm5",
    title: "WH‑1000XM5 Wireless Headphones",
    brand: "Sony",
    store: "Best Buy",
    storeUrl: "https://www.bestbuy.com/site/sony/wh1000xm5/6505727.p",
    price: 39999,
    originalPrice: 44999,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1200&q=80",
    color: "#111",
    tags: ["ANC", "30h battery"],
    description:
      "Industry‑leading noise cancelling with eight microphones and the softest ear pads Sony has made.",
  },
  {
    id: "p_lego_orchid",
    title: "LEGO Icons Orchid Botanical (10311)",
    brand: "LEGO",
    store: "LEGO.com",
    storeUrl: "https://www.lego.com/en-us/product/orchid-10311",
    price: 4999,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    color: "#d4b0ff",
    tags: ["608 pcs", "No pollen"],
    description:
      "Hand‑assembled orchid bouquet that never wilts — a quiet showpiece for a bookshelf or windowsill.",
  },
  {
    id: "p_hydroflask",
    title: "Standard Mouth 21 oz Insulated Bottle",
    brand: "Hydro Flask",
    store: "Hydro Flask",
    storeUrl: "https://www.hydroflask.com/21-oz-standard-mouth",
    price: 3495,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
    color: "#2f5d8a",
    tags: ["Keeps cold 24h"],
    description:
      "Double‑wall vacuum insulated stainless steel. Condensation‑free exterior and Flex Cap.",
  },
  {
    id: "p_lululemon_align",
    title: 'Align High‑Rise Pant 25"',
    brand: "lululemon",
    store: "lululemon",
    storeUrl: "https://shop.lululemon.com/p/women-pants/Align-Pant-2/_/prod2020012",
    price: 9800,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80",
    color: "#2a2a2a",
    tags: ["Nulu™"],
    description:
      'Weightless, buttery‑soft Nulu fabric and a high‑rise cut that everybody asks about.',
  },
  {
    id: "p_uniqlo_down",
    title: "Ultra Light Down Seamless Parka",
    brand: "Uniqlo",
    store: "Uniqlo",
    storeUrl: "https://www.uniqlo.com/us/en/products/E469507-000",
    price: 12990,
    originalPrice: 16990,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80",
    color: "#0f1b2d",
    tags: ["Packable"],
    description:
      "Featherweight warmth that packs into its own pouch. The secret of everyone's travel capsule.",
  },
  {
    id: "p_stanley_quencher",
    title: "Quencher H2.0 FlowState 40 oz",
    brand: "Stanley",
    store: "Stanley 1913",
    storeUrl: "https://www.stanley1913.com/products/adventure-quencher-travel-tumbler-40-oz",
    price: 4500,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?auto=format&fit=crop&w=1200&q=80",
    color: "#e9cfc2",
    tags: ["Fits cupholders"],
    description:
      "The tumbler that started a cultural moment — double‑wall vacuum insulation with a reusable straw.",
  },
  {
    id: "p_dyson_airwrap",
    title: "Airwrap Multi‑styler Complete Long",
    brand: "Dyson",
    store: "Dyson",
    storeUrl: "https://www.dyson.com/hair-care/stylers/airwrap/complete-long",
    price: 59999,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aaa5f1c9b087?auto=format&fit=crop&w=1200&q=80",
    color: "#c8afff",
    tags: ["Coanda"],
    description:
      "Curl, wave, smooth and dry with air, not extreme heat. Comes with every attachment.",
  },
  {
    id: "p_laneige_mask",
    title: "Lip Sleeping Mask — Berry",
    brand: "Laneige",
    store: "Sephora",
    storeUrl: "https://www.sephora.com/product/lip-sleeping-mask-P420652",
    price: 2400,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=80",
    color: "#f6bfcf",
    tags: ["Overnight"],
    description:
      "Berry‑scented overnight lip mask with vitamin C. TikTok's darling, but it earns it.",
  },
  {
    id: "p_rhode_peptide",
    title: "Peptide Lip Treatment — Salted Caramel",
    brand: "Rhode",
    store: "rhode",
    storeUrl: "https://www.rhodeskin.com/products/peptide-lip-treatment",
    price: 1600,
    category: "beauty",
    image:
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&w=1200&q=80",
    color: "#c79271",
    tags: ["Vegan"],
    description:
      "A high‑shine, weightless tint that locks in moisture. The internet's lip gloss.",
  },
  {
    id: "p_steam_deck",
    title: "Steam Deck OLED (1 TB)",
    brand: "Valve",
    store: "Steam",
    storeUrl: "https://store.steampowered.com/steamdeck",
    price: 64900,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1640955011254-39734e60b16f?auto=format&fit=crop&w=1200&q=80",
    color: "#1a1a1a",
    tags: ["HDR OLED"],
    description:
      "The handheld that turned your backlog into a weekend. Gorgeous HDR OLED and better battery.",
  },
  {
    id: "p_nintendo_switch_oled",
    title: "Switch — OLED Model (White)",
    brand: "Nintendo",
    store: "Nintendo",
    storeUrl: "https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set/",
    price: 34999,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1200&q=80",
    color: "#f6f6f6",
    tags: ["7‑inch OLED"],
    description:
      'Vivid 7" OLED screen and a wider stand. Plus sixty-four gigs for all of your ports.',
  },
  {
    id: "p_moleskine",
    title: "Classic Hardcover Notebook (Large, Dotted)",
    brand: "Moleskine",
    store: "Moleskine",
    storeUrl: "https://us.moleskine.com/en/hard-cover-notebook-large-dotted-black-9788883701047",
    price: 2495,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=1200&q=80",
    color: "#222",
    tags: ["Dotted"],
    description:
      "240 ivory pages, the elastic closure everyone loves, and a ribbon that smells faintly like Milan.",
  },
  {
    id: "p_the_creative_act",
    title: "The Creative Act: A Way of Being",
    brand: "Rick Rubin",
    store: "Bookshop.org",
    storeUrl: "https://bookshop.org/p/books/the-creative-act-a-way-of-being-rick-rubin/18555769",
    price: 3200,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    color: "#eee3cf",
    tags: ["Hardcover"],
    description:
      "A legendary producer on listening, patience, and the practice of paying attention.",
  },
  {
    id: "p_muji_diffuser",
    title: "Ultrasonic Aroma Diffuser (Large)",
    brand: "MUJI",
    store: "MUJI",
    storeUrl: "https://www.muji.us/collections/new/products/ultrasonic-aroma-diffuser-large",
    price: 7900,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1598900438360-1c5b8a0fd0d9?auto=format&fit=crop&w=1200&q=80",
    color: "#ede6da",
    tags: ["Soft light"],
    description:
      "Quiet mist, a warm soft light, and a timer. The easiest way to make a room feel like yours.",
  },
  {
    id: "p_hay_dlm",
    title: "Hay DLM Side Table",
    brand: "Hay",
    store: "Design Within Reach",
    storeUrl: "https://www.dwr.com/accessories-furniture/dlm-side-table/100139.html",
    price: 22500,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    color: "#b9a389",
    tags: ["Powder‑coated"],
    description:
      "A small, friendly side table that is never in the way. A designer classic for a reason.",
  },
  {
    id: "p_lodge_cast_iron",
    title: "10.25‑Inch Seasoned Cast Iron Skillet",
    brand: "Lodge",
    store: "Lodge",
    storeUrl: "https://www.lodgecastiron.com/product/seasoned-cast-iron-skillet",
    price: 2499,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    color: "#1b1b1b",
    tags: ["Lifetime"],
    description:
      "Foundry‑seasoned, American‑made and built to last longer than you will.",
  },
  {
    id: "p_opinel_12",
    title: "No.12 Wooden Handle Chef's Knife",
    brand: "Opinel",
    store: "Opinel USA",
    storeUrl: "https://www.opinel-usa.com/products/n-12-chef-s-knife",
    price: 4900,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=1200&q=80",
    color: "#a06a3b",
    tags: ["Sandvik 12C27"],
    description:
      "French‑made beechwood handle and a razor‑sharp Sandvik blade. The everyday knife you reach for.",
  },
  {
    id: "p_aeropress",
    title: "AeroPress Original Coffee Press",
    brand: "AeroPress",
    store: "AeroPress",
    storeUrl: "https://aeropress.com/products/aeropress-original",
    price: 3999,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    color: "#2e2e2e",
    tags: ["1 cup, 1 minute"],
    description:
      "A cult brewer that makes a clean, rich cup at your desk, on the trail, or in a tiny kitchen.",
  },
  {
    id: "p_patagonia_nano",
    title: "Men's Nano Puff® Jacket",
    brand: "Patagonia",
    store: "Patagonia",
    storeUrl: "https://www.patagonia.com/product/mens-nano-puff-jacket/84222.html",
    price: 23900,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
    color: "#2b4f2b",
    tags: ["PrimaLoft®"],
    description:
      "Windproof, water‑resistant and warm even when wet. The most packable insulation Patagonia makes.",
  },
  {
    id: "p_onitsuka_mexico",
    title: "Mexico 66 — White / Blue",
    brand: "Onitsuka Tiger",
    store: "Onitsuka Tiger",
    storeUrl: "https://www.onitsukatiger.com/us/en-us/mexico-66/p/DL408.0146",
    price: 11000,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
    color: "#dce7ef",
    tags: ["Leather"],
    description:
      "Timeless profile introduced at the Mexico '68 Games. Slim silhouette, impossibly versatile.",
  },
  {
    id: "p_arcteryx_beta",
    title: "Beta AR Jacket — Men's",
    brand: "Arc'teryx",
    store: "Arc'teryx",
    storeUrl: "https://arcteryx.com/us/en/shop/mens/beta-ar-jacket",
    price: 59900,
    category: "outdoors",
    image:
      "https://images.unsplash.com/photo-1548865789-bb96b6d16d36?auto=format&fit=crop&w=1200&q=80",
    color: "#154d3a",
    tags: ["GORE‑TEX Pro"],
    description:
      "All‑round alpine hardshell in 3L GORE‑TEX Pro. Backcountry‑tested, city‑approved.",
  },
  {
    id: "p_fujifilm_x100vi",
    title: "X100VI Digital Camera (Silver)",
    brand: "Fujifilm",
    store: "B&H Photo",
    storeUrl: "https://www.bhphotovideo.com/c/product/1810081-REG/fujifilm_x100vi.html",
    price: 159900,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1606986601547-b0e2f8d14f0f?auto=format&fit=crop&w=1200&q=80",
    color: "#b7b7b7",
    tags: ["40MP", "IBIS"],
    description:
      "Fixed 23mm f/2, 40MP X‑Trans sensor and in‑body stabilization. The camera you actually carry.",
  },
  {
    id: "p_vinyl_turntable",
    title: "Debut Carbon EVO Turntable",
    brand: "Pro‑Ject",
    store: "Turntable Lab",
    storeUrl: "https://www.turntablelab.com/products/pro-ject-debut-carbon-evo-turntable",
    price: 59900,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1542456882-6bebfd3d0a44?auto=format&fit=crop&w=1200&q=80",
    color: "#0e0e0e",
    tags: ["Ortofon 2M Red"],
    description:
      "Carbon fiber tonearm, TPE‑damped feet and Ortofon's 2M Red pre‑installed. Just add records.",
  },
  {
    id: "p_sonos_era_300",
    title: "Era 300 Smart Speaker",
    brand: "Sonos",
    store: "Sonos",
    storeUrl: "https://www.sonos.com/en-us/shop/era-300",
    price: 44900,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    color: "#0d0d0d",
    tags: ["Spatial Audio"],
    description:
      "Six drivers pointed every which way for genuinely immersive Dolby Atmos at home.",
  },
  {
    id: "p_kindle_colorsoft",
    title: "Staub 5.5 qt Cocotte — Grenadine",
    brand: "Staub",
    store: "Williams Sonoma",
    storeUrl:
      "https://www.williams-sonoma.com/products/staub-cast-iron-round-cocotte-grenadine/",
    price: 40000,
    originalPrice: 50000,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1581789093215-afac3ed20ef9?auto=format&fit=crop&w=1200&q=80",
    color: "#c2262f",
    tags: ["Enameled iron"],
    description:
      "Self‑basting spikes inside the lid and that famous cherry‑red enamel. Stews and soups, sorted.",
  },
  {
    id: "p_instax",
    title: "instax mini 12 Instant Camera",
    brand: "Fujifilm",
    store: "Target",
    storeUrl: "https://www.target.com/p/-/A-88040867",
    price: 7999,
    category: "tech",
    image:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1200&q=80",
    color: "#a9c7ef",
    tags: ["Auto‑exposure"],
    description:
      "Point, twist, shoot. Prints palm‑sized memories at the party before it ends.",
  },
  {
    id: "p_bialetti",
    title: "Moka Express Stovetop (6 cup)",
    brand: "Bialetti",
    store: "Bialetti",
    storeUrl: "https://www.bialetti.com/us_en/moka-express.html",
    price: 4499,
    category: "kitchen",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784e6a?auto=format&fit=crop&w=1200&q=80",
    color: "#8a8a8a",
    tags: ["Made in Italy"],
    description:
      "The octagonal aluminum pot you've seen in every Italian kitchen since 1933.",
  },
  {
    id: "p_marshall_emberton",
    title: "Emberton II Portable Speaker",
    brand: "Marshall",
    store: "Marshall",
    storeUrl: "https://www.marshall.com/us/en/speakers/emberton-ii",
    price: 16999,
    category: "music",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=80",
    color: "#0b0b0b",
    tags: ["30h battery"],
    description:
      "True stereophonic sound from a brass‑knob palm‑sized package. Rain‑proof, road‑worthy.",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
