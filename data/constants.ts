import {
  Award,
  Beaker,
  BriefcaseMedical,
  ClipboardCheck,
  Factory,
  FlaskConical,
  Globe2,
  HeartHandshake,
  Mail,
  MapPin,
  Medal,
  Microscope,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Syringe,
  Tablets,
  Truck,
} from "lucide-react";
import { company, products as catalogProducts } from "@/data/products";

export const siteUrl = "https://www.sunelastomers.com";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/quality", label: "Quality" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export const productCategories = [
  {
    title: "Antibiotics - Injectable",
    category: "Antibiotics - Injectable",
    icon: Syringe,
    image: "/category-img/antibiotics-injectable.png",
    description: "ELSEFPIME, ELSEFOPERA, ELTAZOPIX and ELCLAVMIC injectable antibiotics.",
  },
  {
    title: "Antibiotics - Oral",
    category: "Antibiotics - Oral",
    icon: BriefcaseMedical,
    image: "/category-img/antibiotics-oral.png",
    description: "SUNMOX-CV, SUNLOX-DS and SIPMOX oral antibiotic range.",
  },
  {
    title: "Neuropathic / CNS",
    category: "Neuropathic / CNS",
    icon: Tablets,
    image: "/category-img/neuropathic-cns.png",
    description: "Sunpreg pregabalin capsule range.",
  },
  {
    title: "Antidiabetic",
    category: "Antidiabetic",
    icon: PackageCheck,
    image: "/category-img/antidiabetic.png",
    description: "Sunglip sitagliptin film coated tablets.",
  },
  {
    title: "Dermatology",
    category: "Dermatology",
    icon: FlaskConical,
    image: "/category-img/dermatology.png",
    description: "Bactosun mupirocin ointment.",
  },
  {
    title: "Gastroenterology",
    category: "Gastroenterology",
    icon: PackageCheck,
    image: "/category-img/gastroenterology.png",
    description: "Sunpant pantoprazole enteric coated tablet.",
  },
];

export const productCategorySlug = (category: string) =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getProductCategoryBySlug = (slug: string) =>
  productCategories.find((category) => productCategorySlug(category.category) === slug);

export const features = [
  { title: "GMP Compliant Manufacturing", icon: Factory, text: "Process discipline for critical pharma supply chains." },
  { title: "Strict Quality Control", icon: Microscope, text: "Testing-led validation from material to dispatch." },
  { title: "Global Export Standards", icon: Globe2, text: "Documentation and packaging aligned to export markets." },
  { title: "Custom Formulations", icon: FlaskConical, text: "Tailored compounds for performance requirements." },
  { title: "Decades of Expertise", icon: Medal, text: "Deep experience in elastomer manufacturing." },
  { title: "Regulatory Approvals", icon: ClipboardCheck, text: "Compliance-first support for regulated buyers." },
];

export const products = catalogProducts.map((product) => ({
  name: product.brand,
  category: product.category,
  spec: `${product.generic}${product.strength ? ` ${product.strength}` : ""}`,
  slug: product.slug,
  form: product.form,
  pack: product.pack,
}));

export const certifications = [
  { name: "WHO-GMP", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
  { name: "ISO 9001:2015", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
  { name: "ISO 14001", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
  { name: "CE Mark", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
  { name: "Drug License", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
  { name: "Export Compliance", body: "[TO BE UPDATED]", validity: "[TO BE UPDATED]" },
];

export const contactDetails = [
  { icon: MapPin, label: "Address", value: company.address },
  { icon: Phone, label: "Phone", value: company.contactPhone },
  { icon: Mail, label: "Email", value: company.contactEmail },
  { icon: Award, label: "GSTIN", value: company.gstin },
];

export const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Transparent commitments and traceable processes." },
  { icon: Sparkles, title: "Precision", text: "Fine tolerances for demanding pharma applications." },
  { icon: HeartHandshake, title: "Partnership", text: "B2B support built around buyer requirements." },
  { icon: Microscope, title: "Quality", text: "Testing discipline across every production stage." },
  { icon: Truck, title: "Reliability", text: "Dependable supply for domestic and export markets." },
  { icon: Beaker, title: "Innovation", text: "Continuous refinement of elastomer performance." },
];

export const pageDescriptions = {
  about:
    "Learn about Sun Elastomers Private Limited, a Regular GST registered pharmaceutical company based in Ghaziabad, Uttar Pradesh.",
  products:
    "Explore 15 pharmaceutical products across injectable antibiotics, oral antibiotics, CNS, antidiabetic, dermatology and gastroenterology categories.",
  manufacturing:
    "Discover Sun Elastomers Pvt Ltd manufacturing capabilities, clean processes, moulding infrastructure, packaging controls and export capacity.",
  quality:
    "Review Sun Elastomers Pvt Ltd quality assurance systems, testing procedures, QC stages and compliance-led laboratory practices.",
  certifications:
    "View Sun Elastomers Pvt Ltd certifications, regulatory compliance, pharma manufacturing approvals and company profile download options.",
  contact:
    "Contact Sun Elastomers Pvt Ltd for pharmaceutical elastomer product inquiries, custom requirements, export support and B2B partnerships.",
};
