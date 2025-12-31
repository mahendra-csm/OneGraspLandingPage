
export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  cta: string;
}

export interface AssessmentArea {
  area: string;
  analysis: string;
  benefit: string;
}

export interface CourseDomain {
  domain: string;
  programs: string[];
}

export interface PartnerUniversity {
  name: string;
  logo: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix?: string;
}

export interface SuccessProfile {
  name: string;
  category: string;
  description: string;
  image: string;
}
