export type LeadSource = "linkedin" | "website" | "manual";
export type LeadStatus = "new" | "contacted" | "replied" | "qualified" | "lost";

export type Lead = {
  name: string;
  company: string;
  role: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  lastContactLabel: string;
  createdAt?: unknown;
};

