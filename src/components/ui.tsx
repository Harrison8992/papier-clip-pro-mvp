import { clsx } from "@/components/clsx";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-slate-200/70 bg-white shadow-soft",
        className ?? ""
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  right,
  className,
}: {
  title: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-3 border-b border-slate-200/70 px-5 py-4",
        className ?? ""
      )}
    >
      <div className="text-sm font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      {right}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
        className ?? ""
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20",
        className ?? ""
      )}
      {...rest}
    />
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?:
    | "neutral"
    | "indigo"
    | "blue"
    | "green"
    | "amber"
    | "red"
    | "violet";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-50 text-indigo-700",
    blue: "bg-sky-50 text-sky-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-rose-50 text-rose-700",
    violet: "bg-violet-50 text-violet-700",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
        tones[tone] ?? tones.neutral
      )}
    >
      {children}
    </span>
  );
}

