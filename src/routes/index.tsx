import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Globe,
  Users,
  KanbanSquare,
  Mail,
  Sparkles,
  Network,
  Signal,
  ListChecks,
  Building2,
  ChevronRight,
  Heart,
  MessagesSquare,
  LayoutGrid,
  Sunrise,
  Target,
  FolderKanban,
  Send,
  UserPlus,
  Lightbulb,
  FileText,
} from "lucide-react";

import { organizationJsonLd, pageHead, softwareApplicationJsonLd, websiteJsonLd } from "../lib/seo";
import { marketingSignupUrl } from "../lib/marketing-links";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Visioner — Account Planning CRM for Key Account Managers",
      description:
        "Visioner is the account planning CRM for Key Account Managers. Manage relationships, projects, tasks, and account signals in one daily workspace.",
      path: "/",
    }),
  component: LandingPage,
});

const SIGNUP_URL = marketingSignupUrl("homepage", "/");
const APP_URL = "https://app.visioner.cc/";
const LOGIN_URL = "https://app.visioner.cc/login";
/* ---------- Brand mark ---------- */

function Logo({
  className = "",
  size = 32,
  tagline = false,
}: {
  className?: string;
  size?: number;
  tagline?: boolean;
}) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Visioner home">
      <img
        src="/visioner-mark.svg"
        alt=""
        className="shrink-0 rounded-[9px]"
        style={{ width: size, height: size }}
      />
      <div className="flex flex-col leading-none">
        <span className="text-[17px] font-bold tracking-tight text-foreground">Visioner</span>
        {tagline && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Account Planning CRM
          </span>
        )}
      </div>
    </a>
  );
}

/* ---------- Rotating word highlight ---------- */

function RotatingHighlight({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i: number) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative inline-block align-bottom">
      {words.map((word, i) => (
        <span
          key={word}
          className="transition-all duration-500 ease-out"
          style={{
            position: i === index ? "relative" : "absolute",
            left: 0,
            top: 0,
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Buttons ---------- */

function BtnPrimary({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const cls = `inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105 active:brightness-95 ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return <button className={cls}>{children}</button>;
}

function BtnSecondary({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const cls = `inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition hover:bg-surface-muted ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return <button className={cls}>{children}</button>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

/* ---------- Focused UI panels used in the day story ---------- */

function PanelFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[color:var(--destructive)]/60" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--warning)]/70" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--success)]/70" />
        </div>
        <div className="mx-auto text-[11px] font-medium text-muted-foreground">{title}</div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PanelPortfolioHome() {
  return (
    <PanelFrame title="Portfolio Home">
      <div className="grid grid-cols-3 gap-3">
        {[
          { k: "ARR", v: "$4.9M" },
          { k: "Target Gap", v: "+$1.5M" },
          { k: "Active Projects", v: "12" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border bg-surface/60 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {s.k}
            </div>
            <div className="mt-1 text-xl font-bold text-foreground">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-border">
        <div className="border-b border-border bg-surface-muted px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Today · Top tasks
        </div>
        {[
          "Prep QBR — Acme Robotics",
          "Reply to Northwind renewal ping",
          "Intro call: Aria Financial · Head of Ops",
        ].map((t) => (
          <div
            key={t}
            className="flex items-center gap-2 border-b border-border/60 px-3 py-2 text-sm text-foreground last:border-0"
          >
            <span className="h-3 w-3 rounded-full border border-border" />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function PanelTaskBoard() {
  const quads = [
    {
      k: "Do now",
      tone: "bg-[color:var(--destructive)]/15 text-[color:var(--destructive)]",
      tasks: ["QBR deck — Acme", "Renewal reply — Northwind"],
    },
    {
      k: "Schedule",
      tone: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]",
      tasks: ["Discovery — Helios", "Exec intro — Aria"],
    },
    {
      k: "Delegate",
      tone: "bg-[color:var(--insight)]/15 text-[color:var(--insight)]",
      tasks: ["SOW draft to legal"],
    },
    { k: "Later", tone: "bg-muted text-muted-foreground", tasks: ["Refresh org chart — Meridian"] },
  ];
  return (
    <PanelFrame title="Task Board · Today">
      <div className="grid grid-cols-2 gap-3">
        {quads.map((q) => (
          <div key={q.k} className="rounded-lg border border-border bg-surface/60 p-3">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${q.tone}`}
            >
              {q.k}
            </span>
            <div className="mt-2 space-y-1.5">
              {q.tasks.map((t) => (
                <div
                  key={t}
                  className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function PanelProjectDrawer() {
  return (
    <PanelFrame title="Project · Acme Robotics — Platform Expansion">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Revenue impact
          </div>
          <div className="mt-0.5 text-xl font-bold text-foreground">+$320K ARR</div>
        </div>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          Expansion
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Decision chain
          </div>
          <div className="mt-2 space-y-1 text-foreground">
            <div>• J. Rivera — VP Ops (Champion)</div>
            <div>• M. Chen — CFO (Approver)</div>
            <div>• A. Patel — Head of IT (Blocker?)</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Next steps
          </div>
          <div className="mt-2 space-y-1 text-foreground">
            <div>• Security review deck by Fri</div>
            <div>• Align on rollout scope</div>
            <div>• Confirm CFO sign-off window</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--warning)]" />
        Risk: IT security review not scheduled
      </div>
    </PanelFrame>
  );
}

function PanelBccLog() {
  return (
    <PanelFrame title="Activity · Aria Financial Group">
      <div className="space-y-2">
        <div className="rounded-lg border border-border bg-surface/60 p-3">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Send className="h-3 w-3" /> Sent · 2 min ago · via BCC
          </div>
          <div className="mt-1.5 text-sm font-medium text-foreground">
            Follow-up: renewal timing & exec intro
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            to J. Rivera · captured to Aria Financial › Renewal FY26
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
          Auto-linked to contact, account and project. No form to fill in.
        </div>
      </div>
    </PanelFrame>
  );
}

function PanelRelationshipHealth() {
  const rows = [
    { n: "J. Rivera — VP Ops", level: 82, tone: "bg-[color:var(--success)]" },
    { n: "M. Chen — CFO", level: 46, tone: "bg-[color:var(--warning)]" },
    { n: "A. Patel — Head of IT", level: 22, tone: "bg-[color:var(--destructive)]" },
  ];
  return (
    <PanelFrame title="Relationship Health">
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.n}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{r.n}</span>
              <span className="text-muted-foreground">{r.level}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div className={`h-full ${r.tone}`} style={{ width: `${r.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function PanelOrgChart() {
  return (
    <PanelFrame title="Org Chart · Acme Robotics">
      <div className="flex flex-col items-center gap-2 text-xs">
        <div className="rounded-md border border-border bg-surface/70 px-3 py-1.5 text-foreground">
          M. Chen — CFO
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-start gap-3">
          <div className="rounded-md border border-border bg-surface/70 px-3 py-1.5 text-foreground">
            J. Rivera — VP Ops
          </div>
          <div className="rounded-md border-2 border-dashed border-accent bg-secondary/40 px-3 py-1.5 text-primary">
            + D. Ono — Director, Data{" "}
            <span className="ml-1 rounded-full bg-accent px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-accent-foreground">
              new
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
        <Sparkles className="h-3 w-3 text-[color:var(--insight)]" />
        Discovered via Contact Intelligence · pending your approval
      </div>
    </PanelFrame>
  );
}

function PanelInspire() {
  return (
    <PanelFrame title="Inspire Me · Data security expansion">
      <div className="rounded-lg border border-border bg-surface/60 p-3 text-xs text-foreground">
        "I want to expand this account into the data security team."
      </div>
      <div className="mt-3 space-y-2">
        {[
          { r: "Head of InfoSec", why: "Owns security tooling budget" },
          { r: "SecOps Lead", why: "Day-to-day operator, needs quick wins" },
          { r: "CISO", why: "Executive sponsor for enterprise deals" },
        ].map((p) => (
          <div key={p.r} className="rounded-md border border-border bg-card px-3 py-2 text-xs">
            <div className="font-semibold text-foreground">{p.r}</div>
            <div className="text-muted-foreground">{p.why}</div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function PanelWeekly() {
  return (
    <PanelFrame title="Weekly Progress · This week">
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { k: "Tasks done", v: "18" },
          { k: "Meetings", v: "7" },
          { k: "Emails logged", v: "42" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border bg-surface/60 p-3">
            <div className="text-lg font-bold text-foreground">{s.v}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {s.k}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-border bg-surface/60 p-3 text-xs text-foreground">
        <div className="font-semibold">Highlights</div>
        <ul className="mt-1 space-y-1 text-muted-foreground">
          <li>• Acme QBR shipped — CFO confirmed FY26 scope</li>
          <li>• Northwind renewal timing locked to Feb</li>
          <li>• Aria org map expanded (+3 stakeholders)</li>
        </ul>
      </div>
    </PanelFrame>
  );
}

/* ---------- A Typical Day for a KAM ---------- */

const DAY_MOMENTS = [
  {
    time: "8:30 AM",
    icon: Sunrise,
    title: "Start from the daily workspace",
    body: "Visioner opens with Portfolio Home and today's Task Board. You see current ARR, target gap, active projects, and the most important tasks across accounts.",
    outcome: "Start the day knowing what matters.",
    Panel: PanelPortfolioHome,
  },
  {
    time: "9:15 AM",
    icon: Target,
    title: "Prioritize without pressure",
    body: "Tasks are organized by urgency and importance. Completed work is automatically archived into Weekly Progress, so real work becomes useful reporting material later.",
    outcome: "Less task anxiety, more visible progress.",
    Panel: PanelTaskBoard,
  },
  {
    time: "10:30 AM",
    icon: FolderKanban,
    title: "Work the project, not the database",
    body: "Inside a Project, you see stakeholders, decision chain, risks, activities, files, next steps, and revenue impact in one place.",
    outcome: "Every deal has context, not just a stage.",
    Panel: PanelProjectDrawer,
  },
  {
    time: "11:00 AM",
    icon: Send,
    title: "Follow up and log automatically",
    body: "A key decision maker's relationship health is low. You send a follow-up email from your normal inbox and BCC Visioner. The email is automatically captured in the right account, project, and contact activity log.",
    outcome: "Communication history builds itself.",
    Panel: PanelBccLog,
    Panel2: PanelRelationshipHealth,
  },
  {
    time: "1:30 PM",
    icon: UserPlus,
    title: "Expand the org map",
    body: "Visioner highlights missing roles and relationship gaps. With user-approved Contact Intelligence, you can research a likely manager, peer, or missing stakeholder and choose whether to add them to the Org Chart.",
    outcome: "The account map becomes more complete over time.",

    Panel: PanelOrgChart,
  },
  {
    time: "3:00 PM",
    icon: Lightbulb,
    title: "Inspire Me",
    body: 'You ask: "I want to expand this account into the data security team." Visioner suggests three possible target personas, why they matter, and a draft outreach message.',
    outcome: "Better account expansion ideas without starting from a blank page.",
    Panel: PanelInspire,
  },
  {
    time: "5:30 PM",
    icon: FileText,
    title: "End with a useful record",
    body: "Completed tasks, project notes, email activity, and relationship touches become Weekly Progress. Later, Visioner can turn this into a manager update or account plan summary.",
    outcome: "Reporting becomes a byproduct of real work.",
    Panel: PanelWeekly,
  },
];

function DayStory() {
  return (
    <section id="product" className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>A Typical Day</Eyebrow>
          <h2 className="text-3xl font-bold text-foreground md:text-[44px]">
            A Typical Day for a KAM
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground">
            From morning priorities to project follow-ups, Visioner keeps revenue, relationships,
            tasks, and account signals in one calm workspace.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Vertical timeline spine (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />

          <div className="space-y-20 md:space-y-28">
            {DAY_MOMENTS.map((m, i) => {
              const flip = i % 2 === 1;
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="relative grid gap-8 md:grid-cols-2 md:items-center md:gap-14"
                >
                  {/* Dot on spine */}
                  <div className="pointer-events-none absolute left-1/2 top-6 hidden -translate-x-1/2 md:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-soft)]">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`${flip ? "md:order-2 md:pl-14" : "md:pr-14"}`}>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      <Icon className="h-3.5 w-3.5 md:hidden" />
                      {m.time}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground md:text-[28px]">{m.title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                      {m.body}
                    </p>
                    <div className="mt-4 flex items-start gap-2 rounded-lg border-l-2 border-accent bg-secondary/40 px-3 py-2 text-[14px] font-medium text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {m.outcome}
                    </div>
                  </div>

                  {/* Panel(s) */}
                  <div className={`${flip ? "md:order-1 md:pr-14" : "md:pl-14"}`}>
                    <div className="space-y-4">
                      <m.Panel />
                      {m.Panel2 && <m.Panel2 />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function LandingPage() {
  const structuredData = [organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd()];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo tagline />

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#product" className="hover:text-foreground">
              Product
            </a>
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="/guides" className="hover:text-foreground">
              Guides
            </a>
            <a href="/about" className="hover:text-foreground">
              About
            </a>
            <a href="#intelligence" className="hover:text-foreground">
              Intelligence
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href={SIGNUP_URL} className="hover:text-foreground">
              Start
            </a>
            <a href={LOGIN_URL} className="hover:text-foreground">
              Sign in
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <BtnPrimary href={SIGNUP_URL}>
              Start for Free <ArrowRight className="h-4 w-4" />
            </BtnPrimary>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-secondary/50 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center md:pt-28 md:pb-24">
          <Eyebrow>
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--insight)]" />
            Account Planning CRM for Key Account Managers
          </Eyebrow>
          <h1 className="text-[42px] font-bold leading-[1.05] text-foreground md:text-[64px]">
            The daily workspace for <span className="text-accent">Key Account Managers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
            Visioner is an account planning CRM that helps strategic account owners manage
            relationships, projects, tasks, and account signals without turning their day into CRM
            data entry.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <BtnPrimary href={SIGNUP_URL}>
              Start for Free <ArrowRight className="h-4 w-4" />
            </BtnPrimary>
            <BtnSecondary href={APP_URL}>
              <Globe className="h-4 w-4" /> Open Web App
            </BtnSecondary>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-muted-foreground">
            <a href="#product" className="hover:text-foreground">
              See a Typical Day →
            </a>
            <a href="#pricing" className="hover:text-foreground">
              View Pricing →
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Gap</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Traditional CRMs create rows. Strategic account work happens{" "}
              <span className="whitespace-nowrap">
                in <RotatingHighlight words={["Relationships", "Visibility", "Account Signals"]} />.
              </span>
            </h2>
            <p className="mt-5 text-[17px] text-muted-foreground">
              Salesforce and HubSpot are optimized for managers, forecasts, and pipeline reviews.
              Key Account Managers need a day-to-day operating canvas — one that turns incomplete
              account knowledge into signals and next actions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Network,
                title: "Relationship coverage",
                body: "See which stakeholders you know, who's cold, and which decision makers you've never met.",
              },
              {
                icon: KanbanSquare,
                title: "Project clarity",
                body: "Track every workstream inside an account — with owners, revenue impact, and next steps.",
              },
              {
                icon: Signal,
                title: "Account signals",
                body: "Get alerted on changes worth acting on: org moves, quiet accounts, renewal risk, gaps.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Core Features</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[44px]">
              Everything a Key Account Manager needs to work the account.
            </h2>
            <p className="mt-4 text-[17px] text-muted-foreground">
              The credible product pillars for how KAMs actually operate.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Network,
                title: "Visual Org Chart",
                body: "Map reporting lines, unknown seats, decision roles, and hidden gaps inside each strategic account.",
              },
              {
                icon: Heart,
                title: "Relationship Health",
                body: "See which relationships are warm, cooling, or stale with visual health indicators and cadence reminders.",
              },
              {
                icon: Signal,
                title: "Account Signals",
                body: "Turn missing stakeholders, stale contacts, renewal risks, and project gaps into clear next actions.",
              },
              {
                icon: KanbanSquare,
                title: "Task Board",
                body: "Prioritize by urgency and importance across accounts. Completed work rolls up into Weekly Progress automatically.",
              },
              {
                icon: FolderKanban,
                title: "Project Workspace",
                body: "One place for stakeholders, decision chain, risks, next steps, files, and revenue impact per workstream.",
              },
              {
                icon: Mail,
                title: "BCC Auto Log",
                body: "BCC outbound emails to Visioner and route conversations to the right account, contact, and project.",
              },
              {
                icon: LayoutGrid,
                title: "Account Plan",
                body: "Bring revenue, projects, stakeholders, tasks, notes, and risks into one account plan your team can actually use.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent/50 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}

            {/* Community — separate coming-soon card */}
            <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <MessagesSquare className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Coming soon
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Account Community</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                Join gated communities around accounts you work on and exchange non-confidential
                patterns with other operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Typical Day for a KAM */}
      <DayStory />

      {/* Differentiation */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why Visioner</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              The everyday workspace for strategic accounts.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-border bg-surface-muted p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Traditional CRM
                </div>
              </div>
              <div className="border-b border-border bg-secondary/50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Visioner
                </div>
              </div>
              {[
                ["Pipeline reporting", "Everyday account canvas"],
                ["Mandatory fields", "Soft completion"],
                ["Manager dashboards", "Relationship-first"],
                ["Opportunity-first", "Stakeholder and org visibility"],
                ["Heavy data entry", "Tasks, signals, and email capture"],
              ].map(([a, b], idx, arr) => (
                <RowPair key={a} left={a} right={b} last={idx === arr.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence */}
      <section id="intelligence" className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Intelligence</Eyebrow>
              <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
                Signals before surprises.
              </h2>
              <p className="mt-5 text-[17px] text-muted-foreground">
                Visioner starts with local signals from your own account data: stale contacts,
                missing stakeholders, quiet projects, renewal windows, and incomplete account plans.
                Advanced intelligence workflows for news, contact research, and enrichment will roll
                out gradually as paid cloud features.
              </p>
              <ul className="mt-6 space-y-4 text-[15px]">
                {[
                  {
                    t: "Local Signals",
                    d: "Generated from your own workspace data: relationship gaps, stale contacts, missing project roles, and overdue follow-ups.",
                    status: "Available now",
                    tone: "good",
                  },
                  {
                    t: "BCC Capture",
                    d: "Paid cloud capture routes outbound email into the right account and contact when you BCC Visioner.",
                    status: "Basic",
                    tone: "good",
                  },
                  {
                    t: "News & Inspire Me",
                    d: "Refresh source-linked account news or search for relevant people, then save useful results into your workspace.",
                    status: "Basic",
                    tone: "good",
                  },
                  {
                    t: "Org Intelligence",
                    d: "Pro users can connect their own THE ORG account to preview reporting lines and reveal direct managers before importing anything.",
                    status: "Pro",
                    tone: "good",
                  },
                ].map(({ t, d, status, tone }) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--insight)]/15">
                      <Sparkles className="h-3 w-3 text-[color:var(--insight)]" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-foreground">{t}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            tone === "good"
                              ? "bg-[color:var(--success)]/15 text-[color:var(--success)]"
                              : tone === "warn"
                                ? "bg-[color:var(--warning)]/15 text-[color:var(--warning)]"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      <div className="mt-0.5 text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">
                  Signals · Aria Financial Group
                </div>
                <span className="rounded-full bg-[color:var(--insight)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--insight)]">
                  Live
                </span>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    tag: "Org change",
                    body: "New VP Ops announced — no relationship mapped yet.",
                    tone: "warn",
                  },
                  {
                    tag: "Quiet account",
                    body: "No inbound or outbound email in 21 days.",
                    tone: "risk",
                  },
                  {
                    tag: "Expansion",
                    body: "Public roadmap mentions the platform you sold in Q1.",
                    tone: "good",
                  },
                  {
                    tag: "Renewal",
                    body: "Contract review window opens in 6 weeks.",
                    tone: "warn",
                  },
                ].map((s) => (
                  <div
                    key={s.body}
                    className="flex items-start gap-3 rounded-lg border border-border bg-surface/60 p-3"
                  >
                    <span
                      className={`mt-1 h-1.5 w-1.5 rounded-full ${
                        s.tone === "good"
                          ? "bg-[color:var(--success)]"
                          : s.tone === "warn"
                            ? "bg-[color:var(--warning)]"
                            : "bg-[color:var(--destructive)]"
                      }`}
                    />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {s.tag}
                      </div>
                      <div className="text-sm text-foreground">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[44px]">
              Pricing that scales with your book.
            </h2>
            <p className="mt-4 text-[17px] text-muted-foreground">
              Start free with three accounts and cloud sync. Upgrade for email capture,
              source-linked intelligence, org mapping, or governed team collaboration.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <PricingCard
              name="Free"
              price="$0"
              tagline="For getting started"
              features={[
                "3 accounts",
                "Contacts, projects, tasks, org chart",
                "CSV import & export",
                "Account signals",
                "Multi-device cloud sync",
                "No BCC capture",
              ]}
              cta="Start Free"
              href={SIGNUP_URL}
            />
            <PricingCard
              name="Basic"
              price="$12"
              tagline="For solo KAMs"
              features={[
                "10 accounts",
                "BCC outbound archive",
                "100 archived emails/month",
                "Manual review queue",
                "100 Visioner Credits/month",
                "Saved News and Inspire Me",
              ]}
              cta="Select Basic"
              href={marketingSignupUrl("homepage_pricing", "basic", "/pricing?plan=basic")}
              highlight
            />
            <PricingCard
              name="Pro"
              price="$29"
              tagline="For serious operators"
              features={[
                "30 accounts",
                "Everything in Basic",
                "1,500 Visioner Credits/month",
                "THE ORG BYOK mapping",
                "Private manager reveals",
                "Account Plan PDF export",
              ]}
              cta="Select Pro"
              href={marketingSignupUrl("homepage_pricing", "pro", "/pricing?plan=pro")}
            />
            <PricingCard
              name="Team"
              price="$49"
              perUser
              tagline="For KAM teams"
              features={[
                "Everything in Pro",
                "Shared accounts",
                "Owner, Admin & Member roles",
                "Account Plan review",
                "Account leads & collaborators",
                "Seat limits and audit trail",
              ]}
              cta="Select Team"
              href={marketingSignupUrl("homepage_pricing", "team", "/pricing?plan=team")}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Answers, before you ask.
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              [
                "Is Visioner replacing Salesforce?",
                "No. Visioner is the account planning CRM KAMs use daily. Many customers keep Salesforce as the system of record for pipeline reporting and use Visioner for strategic account management.",
              ],
              [
                "Do I need to install a Mac app?",
                "No. V1.0 is SaaS-first. Start in the browser with three free accounts.",
              ],
              [
                "What is BCC Capture?",
                "A paid cloud beta that archives outbound email against the right account and contact by verified sender and customer domain. When the project is unclear, Visioner creates a review item instead of guessing.",
              ],
              [
                "Who is Visioner for?",
                "Visioner is built for Key Account Managers, Strategic Account Managers, and founders who personally work a small number of high-value accounts.",
              ],
              [
                "What makes Visioner different from a traditional CRM?",
                "Traditional CRMs are optimized for records, forecasts, and manager reporting. Visioner is optimized for daily account work: relationships, stakeholder coverage, tasks, signals, and account planning.",
              ],
              [
                "Can I use Visioner for only 3–5 strategic accounts?",
                "Yes. That is the ideal starting point. Visioner is designed for depth inside a few important accounts, not high-volume lead management.",
              ],
              [
                "What is free, and what requires a paid plan?",
                "Free includes three accounts, core account planning, local signals, CSV import/export, and multi-device cloud sync. Basic adds BCC Capture, 100 monthly Visioner Credits, News, and Inspire Me. Pro adds private org intelligence and Account Plan export. Team adds governed shared workspaces.",
              ],
            ].map(([q, a]) => (
              <details
                key={q as string}
                className="group rounded-xl border border-border bg-card px-5 py-4 open:shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                  <span className="font-semibold">{q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[15px] text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold text-foreground md:text-[52px]">
            Start with <span className="text-accent">three key accounts.</span>
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground">
            Free to try. No pipeline reviews required. Just the account planning CRM your day
            actually needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BtnPrimary href={SIGNUP_URL}>
              Start for Free <ArrowRight className="h-4 w-4" />
            </BtnPrimary>
            <BtnSecondary href={APP_URL}>
              <Globe className="h-4 w-4" /> Open Web App
            </BtnSecondary>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-muted-foreground md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <Logo tagline />
            <p className="mt-4 max-w-sm leading-6">
              Account Planning CRM for Key Account Managers who need a calmer daily workspace.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3" aria-label="Footer">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="/guides" className="hover:text-foreground">
              Guides
            </a>
            <a href="/about" className="hover:text-foreground">
              About
            </a>
            <a href="/support" className="hover:text-foreground">
              Support
            </a>
            <a href="/privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground">
              Terms
            </a>
          </nav>
          <div className="md:text-right">© {new Date().getFullYear()} Visioner</div>
        </div>
      </footer>
    </div>
  );
}

function RowPair({ left, right, last }: { left: string; right: string; last: boolean }) {
  const border = last ? "" : "border-b border-border";
  return (
    <>
      <div
        className={`flex items-center gap-3 border-r ${border} p-5 text-[15px] text-muted-foreground`}
      >
        <Minus className="h-4 w-4 text-muted-foreground/60" />
        {left}
      </div>
      <div
        className={`flex items-center gap-3 ${border} bg-secondary/20 p-5 text-[15px] font-medium text-foreground`}
      >
        <Check className="h-4 w-4 text-accent" />
        {right}
      </div>
    </>
  );
}

function PricingCard({
  name,
  price,
  perUser,
  tagline,
  features,
  cta,
  highlight,
  badge,
  href,
}: {
  name: string;
  price: string;
  perUser?: boolean;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
  href?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        highlight ? "border-accent bg-card shadow-[var(--shadow-lift)]" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {name}
        </div>
        {highlight && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
            Popular
          </span>
        )}
        {!highlight && badge && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-foreground">{price}</span>
        <span className="text-sm text-muted-foreground">{perUser ? "/user/mo" : "/mo"}</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{tagline}</div>
      <ul className="mt-5 flex-1 space-y-2.5 text-[14px]">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {highlight ? (
        <BtnPrimary href={href} className="mt-6 w-full">
          {cta}
        </BtnPrimary>
      ) : (
        <BtnSecondary href={href} className="mt-6 w-full">
          {cta}
        </BtnSecondary>
      )}
    </div>
  );
}
