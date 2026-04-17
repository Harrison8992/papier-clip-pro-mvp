import { Card, Button, Input } from "@/components/ui";

function ToggleRow({
  label,
  sub,
  defaultChecked,
}: {
  label: string;
  sub: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="mt-0.5 text-xs text-slate-500">{sub}</div>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input className="peer sr-only" type="checkbox" defaultChecked={defaultChecked} />
        <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-indigo-600" />
        <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </label>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="text-sm font-semibold tracking-tight text-slate-900">
            Informations société
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-500">Nom de l’entreprise</div>
              <div className="mt-2">
                <Input defaultValue="Acme SAS" />
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Site web</div>
              <div className="mt-2">
                <Input defaultValue="https://acme.fr" />
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Persona cible</div>
              <div className="mt-2">
                <Input defaultValue="CMO, VP Sales, Fondateurs B2B SaaS" />
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Lien Calendly</div>
              <div className="mt-2">
                <Input defaultValue="https://calendly.com/acme/demo-30min" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-sm font-semibold tracking-tight text-slate-900">
            Comportement des agents
          </div>
          <div className="mt-4 space-y-4">
            <ToggleRow label="Prospection automatique" sub="Recherche quotidienne de leads" defaultChecked />
            <ToggleRow label="Réponses automatiques" sub="Inbox pilotée par l’agent" defaultChecked />
            <ToggleRow label="Relances automatiques" sub="J+3, J+7 selon le statut" />
            <ToggleRow label="Routage CEO actif" sub="Délégation intelligente des tâches" defaultChecked />
            <ToggleRow label="Notifications email" sub="Alertes sur leads qualifiés" defaultChecked />
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-sm font-semibold tracking-tight text-slate-900">
          Règles de délégation CEO
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 lg:grid-cols-2">
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            Lead score &gt; 70 → Closing agent
          </div>
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            Message entrant non qualifié → Répondeur
          </div>
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            Ticket priorité haute → Support immédiat
          </div>
          <div className="cursor-pointer rounded-lg bg-indigo-50 px-4 py-3 font-medium text-indigo-700">
            + Ajouter une règle
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button>Sauvegarder les changements</Button>
        </div>
      </Card>
    </div>
  );
}

