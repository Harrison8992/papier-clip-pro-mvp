import { Badge } from "@/components/ui";

type Agent = "CEO" | "Prospecteur" | "Répondeur" | "Closing" | "Support";

const seedLogs: Array<{
  agent: Agent;
  action: string;
  time: string;
  dot: "active" | "busy" | "idle";
}> = [
  {
    agent: "CEO",
    action: "Règle activée : lead score > 70 → Closing",
    time: "09:45",
    dot: "active",
  },
  {
    agent: "Prospecteur",
    action: "12 leads extraits (filtre : SaaS B2B, 50–500 emp.)",
    time: "09:43",
    dot: "active",
  },
  {
    agent: "Répondeur",
    action: "Réponse envoyée — relance J+3 programmée",
    time: "09:38",
    dot: "busy",
  },
  {
    agent: "Closing",
    action: "Lien Calendly envoyé (score 82)",
    time: "09:34",
    dot: "active",
  },
  {
    agent: "CEO",
    action: "Ticket prioritaire transmis au Support",
    time: "09:17",
    dot: "active",
  },
  {
    agent: "Support",
    action: "Ticket marqué résolu — aucune relance nécessaire",
    time: "09:03",
    dot: "idle",
  },
  {
    agent: "Prospecteur",
    action: "Enrichissement : 8 emails trouvés sur 12 nouveaux leads",
    time: "08:55",
    dot: "active",
  },
];

function agentTone(agent: Agent) {
  switch (agent) {
    case "CEO":
      return "violet";
    case "Prospecteur":
      return "blue";
    case "Répondeur":
      return "green";
    case "Closing":
      return "amber";
    case "Support":
      return "red";
  }
}

export function ActivityLogs({ limit }: { limit?: number }) {
  const logs = typeof limit === "number" ? seedLogs.slice(0, limit) : seedLogs;
  return (
    <div className="divide-y divide-slate-200/70">
      {logs.map((l, idx) => (
        <div key={idx} className="flex items-start gap-3 py-3">
          <Badge tone={agentTone(l.agent)}>{l.agent}</Badge>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-slate-900">{l.action}</div>
            <div className="mt-0.5 text-xs text-slate-500">{l.time}</div>
          </div>
          <div
            className={
              "mt-1.5 h-2 w-2 flex-none rounded-full " +
              (l.dot === "busy"
                ? "bg-amber-500"
                : l.dot === "idle"
                  ? "bg-slate-400"
                  : "bg-emerald-500")
            }
          />
        </div>
      ))}
    </div>
  );
}

