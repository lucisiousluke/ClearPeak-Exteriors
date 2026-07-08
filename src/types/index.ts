import type { IconType } from "react-icons";

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  icon: IconType;
  tagline: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  startingPrice?: string;
  featured?: boolean;
}

export interface City {
  slug: string;
  name: string;
  county: string;
  blurb: string;
  heroImage: string;
  zipCodes: string[];
  neighborhoods: string[];
  lat: number;
  lng: number;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
  service: string;
  avatarInitials: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  service: string;
  beforeImage: string;
  afterImage: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  fieldType: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  width: "half" | "full";
  dynamicOptionsSource?: "none" | "services" | "cities";
  options?: string[];
}

export interface CtaButton {
  label: string;
  url: string;
  style?: "primary" | "secondary" | "outline" | "white";
}

export interface HomepageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  heroPrimaryCta: CtaButton;
  heroSecondaryCta: CtaButton;
  trustBadges: string[];
}

export interface GlobalCtaContent {
  headline: string;
  subtext: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
}
