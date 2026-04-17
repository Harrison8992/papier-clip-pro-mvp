import { Card, Button } from "@/components/ui";

const conversations = [
  {
    name: "Marie Dupont",
    company: "TechVision SAS",
    preview: "La partie closing m’intéresse…",
    unread: true,
    time: "09:31",
  },
  {
    name: "Julien Bernard",
    company: "Growthlab",
    preview: "Quand pouvez-vous planifier une démo ?",
    unread: true,
    time: "08:54",
  },
  {
    name: "Nicolas Moreau",
    company: "Kando AI",
    preview: "Merci pour les infos, je reviens vers vous",
    unread: false,
    time: "Hier",
  },
  {
    name: "Antoine Petit",
    company: "CloudPeak",
    preview: "Notre équipe a besoin de plus de détails",
    unread: true,
    time: "Hier",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function ConversationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-base font-semibold tracking-tight text-slate-900">
          Inbox Conversations
        </div>
        <Button variant="ghost" className="text-xs px-3 py-2">
          Tout marquer comme lu
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="grid h-[540px] grid-cols-1 md:grid-cols-[280px_1fr]">
          <div className="border-b border-slate-200/70 md:border-b-0 md:border-r">
            <div className="divide-y divide-slate-200/70">
              {conversations.map((c, idx) => {
                const active = idx === 0;
                return (
                  <div
                    key={c.name}
                    className={
                      "group flex cursor-pointer gap-3 px-4 py-3 transition " +
                      (active
                        ? "bg-indigo-50/70 border-l-2 border-indigo-600"
                        : "hover:bg-slate-50")
                    }
                  >
                    <div
                      className={
                        "grid h-9 w-9 flex-none place-items-center rounded-full text-xs font-semibold " +
                        (active
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-slate-50 text-slate-500")
                      }
                    >
                      {initials(c.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className={c.unread ? "text-sm font-semibold text-slate-900" : "text-sm text-slate-900"}>
                          {c.name}
                        </div>
                        <div className="text-xs text-slate-500">{c.time}</div>
                      </div>
                      <div className="mt-0.5 truncate text-xs text-slate-500">
                        {c.preview}
                      </div>
                    </div>
                    {c.unread ? (
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-indigo-600" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="border-b border-slate-200/70 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    Marie Dupont
                  </div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    CMO chez TechVision SAS
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-xs px-3 py-2">
                    Calendly
                  </Button>
                  <Button className="text-xs px-3 py-2">Qualifier</Button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              <div className="max-w-[75%] rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900">
                Bonjour, j’ai vu votre profil et j’ai quelques questions sur votre
                solution de prospection automatisée.
              </div>
              <div className="text-[11px] text-slate-500">Marie D. — 09:14</div>

              <div className="ml-auto max-w-[75%] rounded-xl bg-indigo-600 px-4 py-3 text-sm text-white">
                Bonjour Marie, avec plaisir ! Notre plateforme automatise l’ensemble du
                cycle de prospection grâce à 5 agents IA spécialisés. Qu’est-ce qui vous
                intéresse le plus ?
              </div>
              <div className="ml-auto w-fit rounded bg-indigo-600 px-2 py-1 text-[10px] text-white/80">
                Agent Repondeur — 09:17
              </div>

              <div className="max-w-[75%] rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-900">
                La partie closing m’intéresse — on perd beaucoup de leads en phase finale.
                Comment ça fonctionne ?
              </div>
              <div className="text-[11px] text-slate-500">Marie D. — 09:31</div>

              <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                Suggestion IA — Proposer un RDV Calendly pour approfondir la demo Closing
              </div>
            </div>

            <div className="border-t border-slate-200/70 p-4">
              <div className="flex gap-2">
                <input
                  className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Rediger une reponse..."
                />
                <Button className="text-xs px-4 py-2">Envoyer</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

