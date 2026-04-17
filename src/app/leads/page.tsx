"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Search } from "lucide-react";
import { db } from "@/lib/firebase";
import type { Lead, LeadStatus } from "@/lib/types";
import { Badge, Button, Card, CardHeader, Input } from "@/components/ui";

type LeadRow = Lead & { id: string };

const statusLabel: Record<LeadStatus, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  replied: "Répondu",
  qualified: "Qualifié",
  lost: "Perdu",
};

function statusTone(status: LeadStatus) {
  switch (status) {
    case "new":
      return "indigo";
    case "contacted":
      return "blue";
    case "replied":
      return "green";
    case "qualified":
      return "amber";
    case "lost":
      return "red";
  }
}

function sourceTone(source: Lead["source"]) {
  switch (source) {
    case "linkedin":
      return "blue";
    case "website":
      return "green";
    case "manual":
      return "violet";
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function LeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const next = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Lead) }));
        setRows(next);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return rows.filter((r) => {
      const statusOk = statusFilter === "all" ? true : r.status === statusFilter;
      if (!statusOk) return false;
      if (!s) return true;
      return (
        r.name.toLowerCase().includes(s) ||
        r.company.toLowerCase().includes(s) ||
        r.role.toLowerCase().includes(s)
      );
    });
  }, [rows, search, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-tight text-slate-900">
            Base de Leads
          </div>
          <div className="mt-0.5 text-sm text-slate-500">
            Connecté à Firestore — collection <span className="font-mono">leads</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-[260px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="pl-9"
            />
          </div>
          <select
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveau</option>
            <option value="contacted">Contacté</option>
            <option value="replied">Répondu</option>
            <option value="qualified">Qualifié</option>
            <option value="lost">Perdu</option>
          </select>
          <Button>+ Ajouter</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title={`Leads (${filtered.length})`}
          right={
            loading ? (
              <span className="text-xs font-medium text-slate-500">Chargement…</span>
            ) : null
          }
        />

        {error ? (
          <div className="px-5 py-5 text-sm text-rose-700">
            Erreur Firestore: {error}
          </div>
        ) : null}

        {!error && !loading && rows.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <div className="text-sm font-semibold text-slate-900">Aucun lead</div>
            <div className="mt-1 text-sm text-slate-500">
              Lance le seed pour injecter des données de test.
            </div>
            <div className="mt-4">
              <code className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-700">
                npm run seed:leads
              </code>
            </div>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200/70 bg-slate-50">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Prospect
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Entreprise
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Statut
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Dernier contact
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {filtered.map((l) => (
                <tr key={l.id} className="transition hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                        {initials(l.name)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{l.name}</div>
                        <div className="text-xs text-slate-500">{l.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-900">{l.company}</td>
                  <td className="px-4 py-4">
                    <Badge tone={sourceTone(l.source)}>{l.source}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge tone={statusTone(l.status)}>{statusLabel[l.status]}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full bg-indigo-600"
                          style={{ width: `${Math.max(0, Math.min(100, l.score))}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-500">{l.score}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500">
                    {l.lastContactLabel ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" className="h-9 px-3 text-xs">
                        Voir
                      </Button>
                      <Button className="h-9 px-3 text-xs">Contacter</Button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-sm text-slate-500" colSpan={7}>
                    Aucun résultat.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

