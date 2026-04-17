import { ActivityLogs } from "@/components/widgets/activity-logs";
import { KpiGrid } from "@/components/widgets/kpi-grid";
import { Card, CardHeader } from "@/components/ui";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <KpiGrid />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <CardHeader
            title="Logs d’activité agents"
            right={<span className="text-xs font-medium text-slate-500">En direct</span>}
          />
          <div className="px-5 py-2">
            <ActivityLogs limit={7} />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Pipeline closing
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Warm", color: "bg-amber-500", value: 3, pct: 38 },
                { label: "Calendly envoyé", color: "bg-indigo-600", value: 2, pct: 25 },
                { label: "RDV confirmé", color: "bg-emerald-500", value: 4, pct: 50 },
                { label: "Gagné", color: "bg-emerald-600", value: 3, pct: 25 },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <div className="text-sm text-slate-500">{row.label}</div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                      <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <div className="w-6 text-right text-sm font-semibold text-slate-900">
                      {row.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Taux de réponse
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-indigo-600">
              68%
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[68%] bg-indigo-600" />
            </div>
            <div className="mt-2 text-sm text-emerald-600">+8% vs mois dernier</div>
          </Card>

          <div className="rounded-xl bg-gradient-to-br from-slate-800 to-[#0d1421] p-6 text-white shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Prochain renouvellement
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">16 mai 2026</div>
            <div className="mt-1 text-sm text-white/60">99 EUR/mois — Stripe</div>
            <div className="mt-4 inline-flex rounded-full bg-indigo-400/20 px-3 py-1 text-xs font-semibold text-indigo-100">
              Actif
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

