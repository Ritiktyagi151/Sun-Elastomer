import {
  BriefcaseMedical,
  Building2,
  Factory,
  FileCheck2,
  FlaskConical,
  MapPin,
  Pill,
  ShieldCheck,
  Syringe,
  Tablets,
  Truck,
} from "lucide-react";

export const company = {
  name: "Sun Elastomers Private Limited",
  shortName: "Sun Elastomers",
  gstin: "09AACCC9768N1ZS",
  registrationDate: "30/10/2018",
  registrationType: "Regular",
  constitution: "Private Limited Company",
  address: "Site-4, 62/2/2, Industrial Area Sahibabad, Ghaziabad, Uttar Pradesh - 201010",
  contactEmail: "info@sunelastomers.com",
  contactPhone: "+91 XXXXX XXXXX",
};

export const stats = [
  { label: "15+ Products", icon: Pill },
  { label: "6 Product Categories", icon: BriefcaseMedical },
  { label: "GST Registered", icon: FileCheck2 },
  { label: "Pan India Supply", icon: Truck },
];

export const leaders = [
  { name: "Sunny Sharma", role: "Director", state: "Delhi" },
  { name: "Ankit Aggarwal", role: "Director", state: "Delhi" },
  { name: "Narinderpal Kundanlal Kaushal", role: "Director", state: "Maharashtra" },
];

export const offerCategories = [
  {
    title: "Antibiotics - Injectable",
    icon: Syringe,
    text: "Cefepime, Cefoperazone + Sulbactam, Piperacillin + Tazobactam and Co-Amoxiclav injections.",
  },
  {
    title: "Antibiotics - Oral",
    icon: FlaskConical,
    text: "Amoxicillin + Clavulanate tablets, suspensions and sachets.",
  },
  {
    title: "Neuropathic / CNS",
    icon: Tablets,
    text: "Pregabalin capsule range for neuropathic and CNS care.",
  },
  {
    title: "Antidiabetic",
    icon: Pill,
    text: "Sitagliptin film coated tablet range.",
  },
  {
    title: "Dermatology",
    icon: FlaskConical,
    text: "Mupirocin ointment for dermatology applications.",
  },
  {
    title: "Gastroenterology",
    icon: Tablets,
    text: "Pantoprazole enteric coated tablet range.",
  },
];

export type ProductCategory =
  | "Antibiotics - Injectable"
  | "Antibiotics - Oral"
  | "Neuropathic / CNS"
  | "Antidiabetic"
  | "Dermatology"
  | "Gastroenterology";

export type Product = {
  slug: string;
  brand: string;
  generic: string;
  form: string;
  strength?: string;
  pack?: string;
  category: ProductCategory;
  composition: { ingredient: string; quantity: string; standard: string }[];
  compositionNote?: string;
};

export const products: Product[] = [
  {
    slug: "elsefpime-1000mg",
    brand: "ELSEFPIME-1000mg",
    generic: "Cefepime for Injection USP",
    form: "Dry Powder Injection",
    strength: "1000mg",
    pack: "Vial in Monocarton + SWFI + PIL",
    category: "Antibiotics - Injectable",
    composition: [
      { ingredient: "Sterile Cefepime Hydrochloride Eq. to Cefepime", quantity: "1000mg", standard: "USP" },
      { ingredient: "L-Arginine (as stabilizer)", quantity: "q.s.", standard: "USP" },
    ],
  },
  {
    slug: "elsefopera-500mg",
    brand: "ELSEFOPERA-500mg",
    generic: "Cefoperazone & Sulbactam for Injection",
    form: "Dry Powder Injection",
    strength: "500mg",
    pack: "Vial in Monocarton + SWFI + PIL",
    category: "Antibiotics - Injectable",
    composition: [
      { ingredient: "Sterile Cefoperazone Sodium Eq. to Cefoperazone", quantity: "[TO BE UPDATED]", standard: "USP" },
      { ingredient: "Sterile Sulbactam Sodium Eq. to Sulbactam", quantity: "[TO BE UPDATED]", standard: "USP" },
    ],
  },
  {
    slug: "eltazopix-4500mg",
    brand: "ELTAZOPIX-4500mg",
    generic: "Piperacillin & Tazobactam for Injection USP",
    form: "Dry Powder Injection",
    strength: "4500mg",
    pack: "Vial in Monocarton + SWFI + PIL",
    category: "Antibiotics - Injectable",
    composition: [
      { ingredient: "Sterile Piperacillin Sodium Eq. to Piperacillin", quantity: "4000mg", standard: "USP" },
      { ingredient: "Sterile Tazobactam Sodium Eq. to Tazobactam", quantity: "500mg", standard: "USP" },
    ],
  },
  {
    slug: "elclavmic-1200mg",
    brand: "ELCLAVMIC-1200mg",
    generic: "Co-Amoxiclav for Injection BP",
    form: "Dry Powder Injection",
    strength: "1200mg",
    pack: "Vial in Monocarton + SWFI + PIL",
    category: "Antibiotics - Injectable",
    composition: [
      { ingredient: "Sterile Amoxicillin Sodium Eq. to Amoxicillin", quantity: "1000mg", standard: "BP" },
      { ingredient: "Sterile Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "200mg", standard: "BP" },
    ],
  },
  {
    slug: "sunmox-cv-625",
    brand: "SUNMOX-CV 625",
    generic: "Amoxicillin & Clavulanate Potassium Tablets USP",
    form: "Film Coated Tablet",
    strength: "625mg",
    category: "Antibiotics - Oral",
    composition: [
      { ingredient: "Amoxicillin Trihydrate Eq. to Amoxicillin", quantity: "500mg", standard: "USP" },
      { ingredient: "Diluted Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "125mg", standard: "BP" },
    ],
  },
  {
    slug: "sunmox-cv-1000",
    brand: "SUNMOX-CV 1000",
    generic: "Amoxicillin & Clavulanate Potassium Tablets USP",
    form: "Film Coated Tablet",
    strength: "1000mg",
    category: "Antibiotics - Oral",
    composition: [
      { ingredient: "Amoxicillin Trihydrate Eq. to Amoxicillin", quantity: "875mg", standard: "USP" },
      { ingredient: "Diluted Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "125mg", standard: "BP" },
    ],
  },
  {
    slug: "sunlox-ds-156-25mg-5ml",
    brand: "SUNLOX-DS 156.25mg/5ml",
    generic: "Amoxicillin & Potassium Clavulanate Oral Suspension BP",
    form: "Oral Suspension",
    strength: "156.25mg/5ml",
    category: "Antibiotics - Oral",
    compositionNote: "per 5ml",
    composition: [
      { ingredient: "Amoxicillin Trihydrate Eq. to Amoxicillin", quantity: "125mg", standard: "BP" },
      { ingredient: "Diluted Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "31.25mg", standard: "BP" },
    ],
  },
  {
    slug: "sunlox-ds-312-5mg-5ml",
    brand: "SUNLOX-DS 312.5mg/5ml",
    generic: "Amoxicillin & Potassium Clavulanate Oral Suspension BP",
    form: "Oral Suspension",
    strength: "312.5mg/5ml",
    category: "Antibiotics - Oral",
    compositionNote: "per 5ml",
    composition: [
      { ingredient: "Amoxicillin Trihydrate Eq. to Amoxicillin", quantity: "250mg", standard: "BP" },
      { ingredient: "Diluted Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "62.5mg", standard: "BP" },
    ],
  },
  {
    slug: "sipmox-1000-sachet",
    brand: "SIPMOX 1000 Sachet",
    generic: "Co-Amoxiclav Oral Suspension BP",
    form: "Sachet",
    strength: "1000mg per sachet",
    category: "Antibiotics - Oral",
    compositionNote: "per sachet",
    composition: [
      { ingredient: "Amoxicillin Trihydrate Eq. to Amoxicillin", quantity: "875mg", standard: "BP" },
      { ingredient: "Diluted Potassium Clavulanate Eq. to Clavulanic Acid", quantity: "125mg", standard: "BP" },
    ],
  },
  {
    slug: "sunpreg-75",
    brand: "Sunpreg 75",
    generic: "Pregabalin Capsule",
    form: "Capsule",
    strength: "75mg",
    category: "Neuropathic / CNS",
    composition: [{ ingredient: "Pregabalin", quantity: "75mg", standard: "BP" }],
  },
  {
    slug: "sunpreg-150",
    brand: "Sunpreg 150",
    generic: "Pregabalin Capsule",
    form: "Capsule",
    strength: "150mg",
    category: "Neuropathic / CNS",
    composition: [{ ingredient: "Pregabalin", quantity: "150mg", standard: "BP" }],
  },
  {
    slug: "sunglip-50",
    brand: "Sunglip 50",
    generic: "Sitagliptin Film Coated Tablets",
    form: "Film Coated Tablet",
    strength: "50mg",
    category: "Antidiabetic",
    composition: [{ ingredient: "Sitagliptin", quantity: "50mg", standard: "[TO BE UPDATED]" }],
  },
  {
    slug: "sunglip-100",
    brand: "Sunglip 100",
    generic: "Sitagliptin Film Coated Tablets",
    form: "Film Coated Tablet",
    strength: "100mg",
    category: "Antidiabetic",
    composition: [{ ingredient: "Sitagliptin", quantity: "100mg", standard: "[TO BE UPDATED]" }],
  },
  {
    slug: "bactosun",
    brand: "Bactosun",
    generic: "Mupirocin Ointment",
    form: "Ointment",
    strength: "20mg/g (2% w/w)",
    category: "Dermatology",
    composition: [{ ingredient: "Mupirocin", quantity: "20mg/g (2% w/w)", standard: "[TO BE UPDATED]" }],
  },
  {
    slug: "sunpant-40",
    brand: "Sunpant 40",
    generic: "Pantoprazole Enteric Coated Tablet",
    form: "Enteric Coated Tablet",
    strength: "40mg",
    category: "Gastroenterology",
    composition: [{ ingredient: "Pantoprazole", quantity: "40mg", standard: "[TO BE UPDATED]" }],
  },
];

export const featuredProductSlugs = ["elsefpime-1000mg", "sunmox-cv-625", "sunpreg-75"];

export const companyFacts = [
  { label: "GST Registered", value: company.gstin, icon: ShieldCheck },
  { label: "Private Limited", value: company.constitution, icon: Building2 },
  { label: "Uttar Pradesh Registered", value: "Ghaziabad, Uttar Pradesh", icon: MapPin },
  { label: "15 Products", value: "Across 6 categories", icon: Factory },
];

export const formBadgeClass = (form: string) => {
  const normalized = form.toLowerCase();
  if (normalized.includes("capsule")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (normalized.includes("injection")) return "bg-orange-50 text-orange-700 ring-orange-200";
  if (normalized.includes("suspension")) return "bg-purple-50 text-purple-700 ring-purple-200";
  if (normalized.includes("ointment")) return "bg-amber-50 text-amber-700 ring-amber-200";
  if (normalized.includes("tablet")) return "bg-blue-50 text-blue-700 ring-blue-200";
  return "bg-slate-50 text-slate-700 ring-slate-200";
};

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
