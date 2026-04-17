"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  Boxes,
  CreditCard,
  LayoutGrid,
  MessagesSquare,
  Headphones,
  Settings,
  TrendingUp,
  Users,
  BadgeCheck,
} from "lucide-react";
import { clsx } from "@/components/clsx";

const navPrimary = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/leads", label: "Leads", icon: Users, badge: "247", badgeTone: "indigo" as const },
  {
    href: "/conversations",
    label: "Conversations",
    icon: MessagesSquare,
    badge: "5",
    badgeTone: "red" as const,
  },
  { href: "/closing", label: "Closing", icon: TrendingUp },
  { href: "/support", label: "Support", icon: Headphones, badge: "3", badgeTone: "amber" as const },
] as const;

const navManage = [
  { href: "/agents", label: "Agents CEO", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Parametres", icon: Settings },
] as const;

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 shadow-sm">
        <Boxes className="h-4 w-4 text-white/90" />
      </div>
      <div>
        <div className="text-sm font-semibold tracking-tight text-white">
          LeadFlowai
        </div>
        <div className="mt-0.5 text-[10px] text-white/35">Workspace Pro</div>
      </div>
    </div>
  );
}

function NavPill({
  text,
  tone,
}: {
  text: string;
  tone: "indigo" | "red" | "amber";
}) {
  const tones: Record<typeof tone, string> = {
    indigo: "bg-indigo-500/25 text-indigo-200",
    red: "bg-rose-500/25 text-rose-200",
    amber: "bg-amber-500/25 text-amber-200",
  };
  return (
    <span
      className={clsx(
        "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
        tones[tone]
      )}
    >
      {text}
    </span>
  );
}

function NavGroup({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<{
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeTone?: "indigo" | "red" | "amber";
  }>;
}) {
  const pathname = usePathname();

  return (
    <div className="px-3 py-4">
      <div className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
        {label}
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition",
                active
                  ? "bg-indigo-500/20 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white/90"
              )}
            >
              <Icon className={clsx("h-4 w-4", active ? "opacity-100" : "opacity-70")} />
              <span className="whitespace-nowrap">{item.label}</span>
              {item.badge && item.badgeTone ? (
                <NavPill text={item.badge} tone={item.badgeTone} />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function AgentStatus() {
  const rows = [
    { name: "CEO", dot: "bg-emerald-400", right: "Actif" },
    { name: "Prospecteur", dot: "bg-emerald-400", right: "12 leads" },
    { name: "Repondeur", dot: "bg-amber-400", right: "5 conv." },
    { name: "Closing", dot: "bg-emerald-400", right: "7 opps." },
    { name: "Support", dot: "bg-slate-400", right: "3 tickets" },
  ] as const;

  return (
    <div className="mt-auto px-4 py-4">
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
        Statut Agents
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <span className={clsx("h-2 w-2 rounded-full", r.dot)} />
            <span className="flex-1 text-xs text-white/60">{r.name}</span>
            <span className="text-[10px] text-white/30">{r.right}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden h-screen w-[220px] flex-col bg-sidebar text-white md:flex">
      <div className="border-b border-white/10 px-4 py-[18px]">
        <Logo />
      </div>

      <NavGroup label="Navigation" items={navPrimary} />

      <div className="mx-3 border-t border-white/10" />

      <NavGroup label="Gestion" items={navManage} />

      <div className="mt-auto border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="flex-1">
            <div className="text-xs text-white/80">Abonnement actif</div>
            <div className="text-[10px] text-white/35">99 EUR/mois</div>
          </div>
          <BadgeCheck className="h-4 w-4 text-emerald-300/90" />
        </div>
      </div>

      <AgentStatus />
    </aside>
  );
}

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Abonnement actif
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageMeta =
    pathname?.startsWith("/leads")
      ? { title: "Base de Leads", subtitle: "247 prospects actifs" }
      : pathname?.startsWith("/conversations")
        ? { title: "Inbox Conversations", subtitle: "18 conversations actives" }
        : pathname?.startsWith("/closing")
          ? { title: "Pipeline de Closing", subtitle: "7 opportunites en cours" }
          : pathname?.startsWith("/support")
            ? { title: "Support Tickets", subtitle: "3 tickets ouverts" }
            : pathname?.startsWith("/agents")
              ? { title: "Supervision — Agent CEO", subtitle: "Orchestration en temps reel" }
              : pathname?.startsWith("/billing")
                ? { title: "Abonnement & Billing", subtitle: "Stripe — 99 EUR/mois" }
                : pathname?.startsWith("/settings")
                  ? { title: "Parametres", subtitle: "Workspace Acme SAS" }
          : { title: "Dashboard", subtitle: "Vue d’ensemble — Aujourd’hui" };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={pageMeta.title} subtitle={pageMeta.subtitle} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

