import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Apple,
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
  Map,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Brand mark ---------- */

function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <VMark size={size} />
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="text-[17px] font-bold tracking-tight text-foreground">Visioner</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">CRM</span>
      </div>
    </div>
  );
}

function VMark({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-[9px] bg-primary overflow-hidden"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        className="text-primary-foreground"
        style={{ width: size * 0.78, height: size * 0.78 }}
        aria-hidden
      >
        {/* Vision dot — the insight the funnel is chasing */}
        <circle cx="16" cy="7.2" r="1.8" fill="var(--insight)" />

        {/* Open V / sales funnel / open book — two page-like planes
            angling in from the top corners with a wide gap at the bottom */}
        <path
          d="M4.2 10.5 L14 26.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        <path
          d="M27.8 10.5 L18 26.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.1"
          strokeLinecap="round"
        />
        {/* Inner gutter — a hint of the open book spine between the pages */}
        <path
          d="M11.2 13.6 L15.4 22"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M20.8 13.6 L16.6 22"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------- Rotating word highlight ---------- */

function RotatingHighlight({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative inline-flex h-[1.1em] items-center align-bottom overflow-hidden">
      {words.map((word, i) => (
        <span
          key={word}
          className="absolute left-0 whitespace-nowrap transition-all duration-500 ease-out"
          style={{
            opacity: mounted && i === index ? 1 : 0,
            transform: mounted && i === index ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{word}</span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Buttons ---------- */

function BtnPrimary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105 active:brightness-95 ${className}`}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition hover:bg-surface-muted ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      {children}
    </div>
  );
}

/* ---------- Product Mockup ---------- */

function ProductMockup() {
  const accounts = [
    { name: "Acme Robotics", stage: "Expansion", health: "strong", arr: "$1.4M", gap: "+$320K" },
    { name: "Northwind Logistics", stage: "Renewal", health: "watch", arr: "$860K", gap: "+$180K" },
    { name: "Helios Energy Systems", stage: "Discovery", health: "risk", arr: "$0", gap: "+$500K" },
    { name: "Aria Financial Group", stage: "Expansion", health: "strong", arr: "$2.1M", gap: "+$410K" },
    { name: "Meridian BioSystems", stage: "Renewal", health: "watch", arr: "$540K", gap: "+$95K" },
  ];
  const healthDot: Record<string, string> = {
    strong: "bg-[color:var(--success)]",
    watch: "bg-[color:var(--warning)]",
    risk: "bg-[color:var(--destructive)]",
  };

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/10 via-secondary/40 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--destructive)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warning)]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]/80" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground">Visioner CRM · Portfolio Overview</div>
        </div>

        <div className="grid grid-cols-12">
          <aside className="col-span-3 border-r border-border bg-surface/60 p-4">
            <Logo size={26} />
            <nav className="mt-6 space-y-1 text-sm">
              {[
                { label: "Portfolio", icon: Building2, active: true },
                { label: "Accounts", icon: Users },
                { label: "Tasks", icon: ListChecks },
                { label: "Projects", icon: KanbanSquare },
                { label: "Contacts", icon: Users },
                { label: "Intelligence", icon: Sparkles },
                { label: "Email Log", icon: Mail },
              ].map((i) => (
                <div
                  key={i.label}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 ${
                    i.active ? "bg-secondary text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  <i.icon className="h-3.5 w-3.5" />
                  <span>{i.label}</span>
                </div>
              ))}
            </nav>
          </aside>

          <main className="col-span-9 p-5">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Portfolio</div>
                <div className="mt-0.5 text-lg font-semibold text-foreground">5 Key Accounts</div>
              </div>
              <div className="hidden gap-2 md:flex">
                <div className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  This Quarter
                </div>
                <div className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">+ Account</div>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { k: "Coverage", v: "72%", sub: "stakeholders mapped" },
                { k: "Revenue Gap", v: "+$1.5M", sub: "next 4 quarters" },
                { k: "Signals", v: "8 new", sub: "since Monday" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-border bg-surface/70 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.k}</div>
                  <div className="mt-1 text-xl font-bold text-foreground">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-12 border-b border-border bg-surface-muted px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-4">Account</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-2">Health</div>
                <div className="col-span-2">ARR</div>
                <div className="col-span-2 text-right">Gap</div>
              </div>
              {accounts.map((a) => (
                <div
                  key={a.name}
                  className="grid grid-cols-12 items-center border-b border-border/60 px-3 py-2.5 text-xs last:border-0 hover:bg-surface/60"
                >
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-secondary text-[10px] font-semibold text-primary">
                      {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <span className="font-medium text-foreground">{a.name}</span>
                  </div>
                  <div className="col-span-2 text-muted-foreground">{a.stage}</div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${healthDot[a.health]}`} />
                    <span className="capitalize text-muted-foreground">{a.health}</span>
                  </div>
                  <div className="col-span-2 text-foreground">{a.arr}</div>
                  <div className="col-span-2 text-right font-semibold text-[color:var(--success)]">{a.gap}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#product" className="hover:text-foreground">Product</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#download" className="hover:text-foreground">Download</a>
            <a href="#" className="hover:text-foreground">Sign in</a>
          </nav>
          <div className="flex items-center gap-2">
            <BtnPrimary>Start for Free <ArrowRight className="h-4 w-4" /></BtnPrimary>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-secondary/50 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-16 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--insight)]" />
              CRM for Key Account Managers
            </Eyebrow>
            <h1 className="text-[40px] font-bold text-foreground md:text-[56px]">
              CRM built for Key Account Managers,{" "}
              <span className="text-accent">not just their bosses.</span>
            </h1>
            <p className="mt-5 text-lg font-medium text-foreground/80 md:text-xl">
              The everyday workspace for strategic accounts.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-[17px]">
              Visioner helps account owners manage revenue, projects, stakeholders, relationship health,
              email logs, and account signals in one calm operating canvas.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BtnPrimary>Start for Free <ArrowRight className="h-4 w-4" /></BtnPrimary>
              <BtnSecondary><Apple className="h-4 w-4" /> Download Mac Beta</BtnSecondary>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-muted-foreground">
              <a href="#product" className="hover:text-foreground">See Product Demo →</a>
              <a href="#pricing" className="hover:text-foreground">View Pricing →</a>
            </div>
          </div>

          <div className="mt-14">
            <ProductMockup />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Gap</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Traditional CRMs create rows. Strategic account work happens in relationships.
            </h2>
            <p className="mt-5 text-[17px] text-muted-foreground">
              Salesforce and HubSpot are optimized for managers, forecasts, and pipeline reviews.
              Key Account Managers need a day-to-day operating canvas — one that turns incomplete account
              knowledge into signals and next actions.
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
              <div key={c.title} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
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
              Six memorable capabilities — built for how KAMs actually operate.
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
                icon: Mail,
                title: "BCC Auto Log",
                body: "BCC outbound emails to Visioner and automatically route conversations to the right account, contact, and project.",
              },
              {
                icon: LayoutGrid,
                title: "Account Plan",
                body: "Bring revenue, projects, stakeholders, tasks, notes, and risks into one account plan your team can actually use.",
              },
              {
                icon: MessagesSquare,
                title: "Account Community",
                body: "Join gated communities for accounts you work on, exchange non-confidential insights, and discover useful patterns.",
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
          </div>
        </div>
      </section>

      {/* Simple 3-step workflow */}
      <section id="product" className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              From account chaos to next best action.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: "1", icon: Map, title: "Map the account", body: "Import contacts, build the org chart, and identify stakeholder gaps." },
              { n: "2", icon: KanbanSquare, title: "Work the account", body: "Manage projects, tasks, meetings, and relationship health from one account canvas." },
              { n: "3", icon: Sparkles, title: "Capture and learn", body: "Log emails, refresh signals, and turn account intelligence into next actions." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {s.n}
                  </div>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why Visioner</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Designed for KAMs, not only Sales VPs.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-border bg-surface-muted p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Traditional CRM</div>
              </div>
              <div className="border-b border-border bg-secondary/50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Visioner CRM</div>
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
              <h2 className="text-3xl font-bold text-foreground md:text-[40px]">Signals before surprises.</h2>
              <p className="mt-5 text-[17px] text-muted-foreground">
                Visioner watches your accounts so you don't have to refresh five tabs. Local Signals come from
                your CRM data. Cloud Intelligence refreshes news and suggests next actions.
              </p>
              <ul className="mt-6 space-y-4 text-[15px]">
                {[
                  ["Local Signals", "Generated from your CRM data — gaps, stale contacts, silent projects."],
                  ["Cloud Intelligence", "News and account changes, summarized with recommended next actions."],
                  ["Inspire Me", "Contact discovery and outreach drafts tuned to each account."],
                  ["Contact Enrichment", "Enrichment with user approval — you review before it lands in your CRM."],
                  ["Visioner Credits", "One shared unit for cloud actions like enrichment, discovery, and Inspire Me."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--insight)]/15">
                      <Sparkles className="h-3 w-3 text-[color:var(--insight)]" />
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">{t}</div>
                      <div className="text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">Signals · Aria Financial Group</div>
                <span className="rounded-full bg-[color:var(--insight)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--insight)]">Live</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { tag: "Org change", body: "New VP Ops announced — no relationship mapped yet.", tone: "warn" },
                  { tag: "Quiet account", body: "No inbound or outbound email in 21 days.", tone: "risk" },
                  { tag: "Expansion", body: "Public roadmap mentions the platform you sold in Q1.", tone: "good" },
                  { tag: "Renewal", body: "Contract review window opens in 6 weeks.", tone: "warn" },
                ].map((s) => (
                  <div key={s.body} className="flex items-start gap-3 rounded-lg border border-border bg-surface/60 p-3">
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
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.tag}</div>
                      <div className="text-sm text-foreground">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local + Cloud */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>Local-first + Cloud</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Start locally. Add cloud only when it helps.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Apple className="h-4 w-4" /> Free local core
              </div>
              <ul className="space-y-2 text-[15px] text-muted-foreground">
                {[
                  "Free local core — accounts, contacts, projects, org chart, tasks",
                  "Browser app with sync when you sign in",
                  "Mac app with optional local-only mode (cloud off entirely)",
                  "CSV import and export",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-secondary/40 p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Globe className="h-4 w-4" /> Paid cloud features
              </div>
              <ul className="space-y-2 text-[15px] text-muted-foreground">
                {[
                  "BCC email capture and routing",
                  "Cloud backup and multi-device sync",
                  "Intelligence, enrichment, and Visioner Credits",
                  "Team workspace and shared accounts",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                  </li>
                ))}
              </ul>
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
              Start free with three accounts. Upgrade only when you need cloud features or a team workspace.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <PricingCard
              name="Free"
              price="$0"
              tagline="For getting started"
              features={[
                "3 accounts",
                "Local contacts, projects, org chart, tasks",
                "CSV import/export",
                "Local signals",
                "3 Inspire Me runs/day after login",
                "No BCC capture",
              ]}
              cta="Select Free"
            />
            <PricingCard
              name="Basic"
              price="$12"
              tagline="For solo KAMs"
              features={[
                "10 accounts",
                "BCC outbound archive",
                "300 Visioner Credits/month",
                "100 archived emails/month",
                "Basic Intelligence",
                "Manual review queue",
              ]}
              cta="Select Basic"
            />
            <PricingCard
              name="Pro"
              price="$29"
              tagline="For serious operators"
              features={[
                "Unlimited accounts",
                "1,500 Visioner Credits/month",
                "1,000 archived emails/month",
                "Contact Enrichment",
                "Daily Signals",
                "Cloud backup",
                "Personal BCC alias",
              ]}
              cta="Select Pro"
              highlight
            />
            <PricingCard
              name="Team"
              price="$49"
              perUser
              tagline="For KAM teams"
              features={[
                "Team workspace",
                "5,000 shared Visioner Credits/month",
                "Shared accounts",
                "Roles",
                "Team BCC routing",
                "Manager export",
                "Priority support",
              ]}
              cta="Select Team"
            />
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>Download</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">
              Use Visioner in the browser or on your Mac.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <Globe className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">Start Free in Browser</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">
                The browser version supports cloud sync and all paid cloud features. No install required.
              </p>
              <BtnPrimary className="mt-6">Open Web App <ArrowRight className="h-4 w-4" /></BtnPrimary>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Apple className="h-6 w-6 text-foreground" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">Download Mac Beta</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">
                The Mac version supports local-first usage and optional sync. Turn cloud off entirely if you prefer.
              </p>
              <BtnSecondary className="mt-6">Download for macOS</BtnSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl font-bold text-foreground md:text-[40px]">Answers, before you ask.</h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              ["Is Visioner replacing Salesforce?", "No. Visioner is the account planning canvas KAMs use daily. Many customers keep Salesforce as the system of record for pipeline reporting and use Visioner for strategic account management."],
              ["Can I use it without cloud sync?", "Yes. The Mac app runs fully local. Cloud features are opt-in and only activate when you sign in."],
              ["What is BCC Capture?", "A silent BCC alias that archives your outbound email against the right account and contact automatically — so email history builds itself."],
              ["Can I import contacts from HubSpot or Zoho?", "Yes, via CSV. Map columns once and Visioner will keep the mapping for future imports."],
              ["What are Visioner Credits?", "A shared unit used for cloud actions like contact enrichment, org discovery, and Inspire Me runs. Plans include a monthly allowance."],
              ["Can teams share accounts?", "Yes, on the Team plan. Shared accounts, roles, team BCC routing, and manager exports are included."],
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
            Free to try. No pipeline reviews required. Just the account planning CRM your day actually needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BtnPrimary>Start for Free <ArrowRight className="h-4 w-4" /></BtnPrimary>
            <BtnSecondary><Apple className="h-4 w-4" /> Download Mac Beta</BtnSecondary>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <div className="flex flex-wrap items-center gap-5">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#download" className="hover:text-foreground">Download</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
          <div>© {new Date().getFullYear()} Visioner</div>
        </div>
      </footer>
    </div>
  );
}

function RowPair({ left, right, last }: { left: string; right: string; last: boolean }) {
  const border = last ? "" : "border-b border-border";
  return (
    <>
      <div className={`flex items-center gap-3 border-r ${border} p-5 text-[15px] text-muted-foreground`}>
        <Minus className="h-4 w-4 text-muted-foreground/60" />
        {left}
      </div>
      <div className={`flex items-center gap-3 ${border} bg-secondary/20 p-5 text-[15px] font-medium text-foreground`}>
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
}: {
  name: string;
  price: string;
  perUser?: boolean;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 ${
        highlight
          ? "border-accent bg-card shadow-[var(--shadow-lift)]"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{name}</div>
        {highlight && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
            Popular
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
        <BtnPrimary className="mt-6 w-full">{cta}</BtnPrimary>
      ) : (
        <BtnSecondary className="mt-6 w-full">{cta}</BtnSecondary>
      )}
    </div>
  );
}
