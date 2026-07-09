import { createFileRoute } from "@tanstack/react-router";
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
  FileText,
  Building2,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Reusable primitives ---------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <div className="absolute inset-1.5 rounded-md border border-primary-foreground/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="text-lg font-semibold tracking-tight text-foreground">Visioner</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">CRM</span>
      </div>
    </div>
  );
}

function BtnPrimary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 ${className}`}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface-muted ${className}`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-muted px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--destructive)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warning)]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]/70" />
          </div>
          <div className="mx-auto text-xs text-muted-foreground">Visioner CRM · Portfolio Overview</div>
        </div>

        <div className="grid grid-cols-12">
          {/* Sidebar */}
          <aside className="col-span-3 border-r border-border bg-surface/60 p-4">
            <Logo />
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
                    i.active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  <i.icon className="h-3.5 w-3.5" />
                  <span>{i.label}</span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="col-span-9 p-5">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio</div>
                <div className="mt-0.5 text-lg font-semibold text-foreground">5 Key Accounts</div>
              </div>
              <div className="hidden gap-2 md:flex">
                <div className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                  This Quarter
                </div>
                <div className="rounded-md bg-primary px-2.5 py-1 text-xs text-primary-foreground">+ Account</div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { k: "Coverage", v: "72%", sub: "stakeholders mapped" },
                { k: "Revenue Gap", v: "+$1.5M", sub: "next 4 quarters" },
                { k: "Signals", v: "8 new", sub: "since Monday" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-border bg-surface/70 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
                  <div className="mt-1 text-xl font-semibold text-foreground">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-12 border-b border-border bg-surface-muted px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                <div className="col-span-5">Account</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-2">Health</div>
                <div className="col-span-1.5">ARR</div>
                <div className="col-span-1.5 text-right">Gap</div>
              </div>
              {accounts.map((a) => (
                <div
                  key={a.name}
                  className="grid grid-cols-12 items-center border-b border-border/60 px-3 py-2.5 text-xs last:border-0 hover:bg-surface/60"
                >
                  <div className="col-span-5 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-semibold text-primary">
                      {a.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <span className="font-medium text-foreground">{a.name}</span>
                  </div>
                  <div className="col-span-2 text-muted-foreground">{a.stage}</div>
                  <div className="col-span-2 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${healthDot[a.health]}`} />
                    <span className="capitalize text-muted-foreground">{a.health}</span>
                  </div>
                  <div className="col-span-1.5 text-foreground">{a.arr}</div>
                  <div className="col-span-1.5 text-right font-medium text-[color:var(--success)]">{a.gap}</div>
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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#product" className="hover:text-foreground">Product</a>
            <a href="#workflow" className="hover:text-foreground">Workflow</a>
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
          <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              CRM for Key Account Managers
            </Eyebrow>
            <h1 className="text-5xl leading-[1.05] text-foreground md:text-6xl">
              CRM built for Key Account Managers,{" "}
              <em className="text-primary">not just their managers.</em>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">The everyday workspace for strategic accounts.</p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              Traditional CRMs are built for pipeline reporting. Visioner is built for daily account work —
              relationships, projects, tasks, decision chains, and revenue gaps — in one calm canvas.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <BtnPrimary>Start for Free <ArrowRight className="h-4 w-4" /></BtnPrimary>
              <BtnSecondary><Apple className="h-4 w-4" /> Download Mac Beta</BtnSecondary>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
              <a href="#product" className="hover:text-foreground">See Product Demo →</a>
              <a href="#pricing" className="hover:text-foreground">View Pricing →</a>
            </div>
          </div>

          <div className="mt-16">
            <ProductMockup />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Gap</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">
              Traditional CRMs create rows. Strategic account work happens in relationships.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Salesforce and HubSpot are powerful — but they're optimized for managers, forecasts, dashboards, and
              pipeline reviews. Key Account Managers need a day-to-day operating canvas. Complex accounts involve
              many stakeholders, shifting org charts, hidden decision makers, stale relationships, and long sales
              cycles. Visioner reduces CRM input burden and turns incomplete account knowledge into signals and
              next actions.
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
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-xl text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Product</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">
              One workspace for the account you actually work every day.
            </h2>
            <p className="mt-4 text-muted-foreground">
              An account planning CRM designed around how KAMs actually operate — not around what managers want to
              report.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Building2, title: "Portfolio Home", body: "Every account at a glance with health, gap, and momentum." },
              { icon: Users, title: "Accounts", body: "A dedicated canvas for every strategic customer you own." },
              { icon: ListChecks, title: "Global Tasks", body: "Work the day from one board across all accounts." },
              { icon: KanbanSquare, title: "Projects Kanban & List", body: "Track initiatives, POCs, and expansion motions." },
              { icon: Users, title: "Contacts List & Cards", body: "Rich contact profiles with relationship notes." },
              { icon: Network, title: "Org Chart per Account", body: "Map reporting lines and decision chains visually." },
              { icon: Sparkles, title: "Intelligence per Account", body: "News, changes, and next actions surfaced for you." },
              { icon: Mail, title: "Email Log with BCC Capture", body: "Silent BCC archive keeps history without effort." },
              { icon: FileText, title: "Account Plan Export", body: "One-click plan for QBRs and internal reviews." },
            ].map((f) => (
              <div key={f.title} className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-surface-muted text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>KAM Workflow</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">From account chaos to next best action.</h2>
            <p className="mt-4 text-muted-foreground">
              A repeatable strategic account management rhythm — without the spreadsheet sprawl.
            </p>
          </div>

          <ol className="mx-auto mt-12 max-w-4xl space-y-3">
            {[
              "Create or import accounts",
              "Import contacts from CSV",
              "Map stakeholders and reporting lines",
              "Track projects and revenue gap",
              "Work tasks from the global task board",
              "Capture emails through BCC",
              "Refresh account signals and intelligence",
              "Export account plan or review internally",
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </div>
                <span className="text-foreground">{step}</span>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Differentiation */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Why Visioner</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">Designed for KAMs, not only Sales VPs.</h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-border bg-surface-muted p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Traditional CRM</div>
              </div>
              <div className="border-b border-border bg-primary/5 p-5">
                <div className="text-xs uppercase tracking-wider text-primary">Visioner CRM</div>
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
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>Intelligence</Eyebrow>
              <h2 className="text-4xl text-foreground md:text-5xl">Signals before surprises.</h2>
              <p className="mt-5 text-muted-foreground">
                Visioner watches your accounts so you don't have to refresh five tabs. Local Signals are generated
                from your CRM data. Cloud Intelligence refreshes news, summarizes relevant changes, and suggests
                next actions.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  ["Local Signals", "Generated from your CRM data — gaps, stale contacts, silent projects."],
                  ["Cloud Intelligence", "Refreshes news, summarizes changes, and drafts next actions."],
                  ["Inspire Me", "Recommends target personas and drafts outreach that actually fits."],
                  ["Contact Enrichment & Org Discovery", "Powered by Visioner Credits when you need them."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <div className="font-medium text-foreground">{t}</div>
                      <div className="text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">Signals · Aria Financial Group</div>
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground">Live</span>
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
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.tag}</div>
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
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <Eyebrow>Local-first + Cloud</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">Start locally. Add cloud only when it helps.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Apple className="h-4 w-4" /> Local core — free
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Accounts, contacts, projects, org chart, tasks", "CSV import and export", "Local signals from your CRM data", "Desktop app can run fully offline"].map((x) => (
                  <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                <Globe className="h-4 w-4" /> Cloud — opt in
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["BCC email capture", "Cloud backup and sync", "Intelligence, enrichment, credits", "Team workspace and shared accounts"].map((x) => (
                  <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">Pricing that scales with your book.</h2>
            <p className="mt-4 text-muted-foreground">
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
              cta="Start Free"
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
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <Eyebrow>Download</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">Use Visioner in the browser or on your Mac.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <Globe className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-2xl text-foreground">Start Free in Browser</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The browser version supports cloud sync and all paid cloud features. No install required.
              </p>
              <BtnPrimary className="mt-6">Open Web App <ArrowRight className="h-4 w-4" /></BtnPrimary>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <Apple className="h-6 w-6 text-foreground" />
              <h3 className="mt-4 text-2xl text-foreground">Download Mac Beta</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The Mac version supports local-first usage and optional sync. Turn cloud off entirely if you prefer.
              </p>
              <BtnSecondary className="mt-6">Download for macOS</BtnSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-4xl text-foreground md:text-5xl">Answers, before you ask.</h2>
          </div>
          <div className="mt-10 space-y-3">
            {[
              ["Is Visioner replacing Salesforce?", "No. Visioner is the account planning canvas KAMs use daily. Many customers keep Salesforce as the system of record for pipeline reporting and use Visioner for strategic account management."],
              ["Can I use it without cloud sync?", "Yes. The Mac app runs fully local. Cloud features are opt-in and only activate when you sign in."],
              ["What is BCC Capture?", "A silent BCC alias that archives your outbound email against the right account and contact automatically — so email history builds itself."],
              ["Can I import contacts from HubSpot or Zoho?", "Yes, via CSV. Map columns once and Visioner will keep the mapping for future imports."],
              ["What are Visioner Credits?", "A shared unit used for cloud intelligence tasks like contact enrichment, org discovery, and Inspire Me runs. Plans include a monthly allowance."],
              ["Is the Community public?", "The Community is available to signed-in users. Content is not indexed publicly by default."],
              ["Can teams share accounts?", "Yes, on the Team plan. Shared accounts, roles, team BCC routing, and manager exports are included."],
            ].map(([q, a]) => (
              <details
                key={q as string}
                className="group rounded-xl border border-border bg-card px-5 py-4 open:shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                  <span className="font-medium">{q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 className="text-5xl text-foreground md:text-6xl">
            Start with <em className="text-primary">three key accounts.</em>
          </h2>
          <p className="mt-4 text-muted-foreground">
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
            <a href="#product" className="hover:text-foreground">Product</a>
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
      <div className={`flex items-center gap-3 border-r ${border} p-5 text-sm text-muted-foreground`}>
        <Minus className="h-4 w-4 text-muted-foreground/60" />
        {left}
      </div>
      <div className={`flex items-center gap-3 ${border} bg-primary/[0.03] p-5 text-sm text-foreground`}>
        <Check className="h-4 w-4 text-primary" />
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
          ? "border-primary bg-card shadow-[var(--shadow-lift)]"
          : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{name}</div>
        {highlight && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Popular
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold text-foreground">{price}</span>
        <span className="text-sm text-muted-foreground">{perUser ? "/user/mo" : "/mo"}</span>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{tagline}</div>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
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
