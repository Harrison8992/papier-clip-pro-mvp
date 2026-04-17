import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui";

function KpiCard({
  label,
  value,
  delta,
  deltaTone,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: "pos" | "neg" | "neutral";
}) {
  const tone =
    deltaTone === "pos"
      ? { cls: "text-emerald-600", icon: ArrowUpRight }
      : deltaTone === "neg"
        ? { cls: "text-rose-600", icon: ArrowDownRight }
        : { cls: "text-slate-500", icon: ArrowUpRight };
  const Icon = tone.icon;

  return (
    <Card className="p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div className={`mt-2 flex items-center gap-1.5 text-sm ${tone.cls}`}>
        <Icon className="h-4 w-4" />
        <span className="font-medium">{delta}</span>
      </div>
    </Card>
  );
}

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard label="Leads total" value="247" delta="+43 cette semaine" deltaTone="pos" />
      <KpiCard label="Conversations" value="18" delta="5 non lues" deltaTone="neutral" />
      <KpiCard label="RDV ce mois" value="12" delta="Taux conv. 4,9%" deltaTone="pos" />
      <KpiCard
        label="Tickets ouverts"
        value="3"
        delta="2 en attente +24h"
        deltaTone="neg"
      />
    </div>
  );
}

