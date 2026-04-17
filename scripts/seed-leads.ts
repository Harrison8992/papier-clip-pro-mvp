import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import admin from "firebase-admin";

type LeadSeed = {
  name: string;
  company: string;
  role: string;
  source: "linkedin" | "website" | "manual";
  status: "new" | "contacted" | "replied" | "qualified" | "lost";
  score: number;
  lastContactLabel: string;
};

const leads: LeadSeed[] = [
  {
    name: "Marie Dupont",
    company: "TechVision SAS",
    role: "CMO",
    source: "linkedin",
    status: "replied",
    score: 82,
    lastContactLabel: "il y a 14 min",
  },
  {
    name: "Thomas Lefebvre",
    company: "Scalify",
    role: "Fondateur",
    source: "linkedin",
    status: "contacted",
    score: 65,
    lastContactLabel: "il y a 1h",
  },
  {
    name: "Sophie Martin",
    company: "DataSync",
    role: "VP Sales",
    source: "website",
    status: "new",
    score: 47,
    lastContactLabel: "il y a 2h",
  },
  {
    name: "Julien Bernard",
    company: "Growthlab",
    role: "CEO",
    source: "linkedin",
    status: "qualified",
    score: 91,
    lastContactLabel: "hier",
  },
  {
    name: "Camille Rousseau",
    company: "Nexora",
    role: "Directrice Mktg",
    source: "manual",
    status: "new",
    score: 38,
    lastContactLabel: "il y a 3h",
  },
  {
    name: "Antoine Petit",
    company: "CloudPeak",
    role: "CTO",
    source: "website",
    status: "replied",
    score: 74,
    lastContactLabel: "il y a 5h",
  },
  {
    name: "Léa Girard",
    company: "SalesForge",
    role: "SDR Lead",
    source: "linkedin",
    status: "contacted",
    score: 53,
    lastContactLabel: "avant-hier",
  },
  {
    name: "Nicolas Moreau",
    company: "Kando AI",
    role: "COO",
    source: "linkedin",
    status: "qualified",
    score: 88,
    lastContactLabel: "il y a 2 jours",
  },
  {
    name: "Emma Leroy",
    company: "Pivotly",
    role: "Responsable Comm.",
    source: "website",
    status: "lost",
    score: 22,
    lastContactLabel: "il y a 4 jours",
  },
  {
    name: "Paul Blanc",
    company: "RevMap",
    role: "Head of Growth",
    source: "linkedin",
    status: "new",
    score: 61,
    lastContactLabel: "il y a 30 min",
  },
];

function loadServiceAccount(): admin.ServiceAccount {
  const jsonInline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (jsonInline) {
    return JSON.parse(jsonInline) as admin.ServiceAccount;
  }

  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (filePath) {
    const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    const raw = readFileSync(abs, "utf8");
    return JSON.parse(raw) as admin.ServiceAccount;
  }

  throw new Error(
    "Missing service account. Set FIREBASE_SERVICE_ACCOUNT (path) or FIREBASE_SERVICE_ACCOUNT_JSON (inline JSON)."
  );
}

async function main() {
  const serviceAccount = loadServiceAccount();

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = admin.firestore();
  const batch = db.batch();

  for (const lead of leads) {
    const ref = db.collection("leads").doc();
    batch.set(ref, {
      ...lead,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  // eslint-disable-next-line no-console
  console.log(`Seeded ${leads.length} leads into Firestore collection "leads".`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

