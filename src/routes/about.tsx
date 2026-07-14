import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Mail,
  Network,
  Signal,
  Target,
  Users,
} from "lucide-react";

import { absoluteUrl, breadcrumbJsonLd, pageHead } from "../lib/seo";
import { marketingSignupUrl } from "../lib/marketing-links";

const SIGNUP_URL = marketingSignupUrl("about", "/about");
const APP_URL = "https://app.visioner.cc/";

const facts = [
  ["Category", "Account Planning CRM"],
  [
    "Primary users",
    "Key Account Managers, Strategic Account Managers, and founders working a small number of high-value accounts",
  ],
  [
    "Best fit",
    "Complex accounts where stakeholders, reporting lines, relationship health, projects, and follow-up timing matter",
  ],
  ["Launch model", "SaaS-first V1.0 with a free three-account plan"],
  ["Product status", "Early commercial beta"],
  ["Support", "support@visioner.cc"],
];

const pillars = [
  {
    icon: Target,
    title: "Revenue context",
    body: "Visioner starts with the account owner's daily view: current ARR, target gap, active projects, and the work that changes the outcome.",
  },
  {
    icon: Network,
    title: "Stakeholder visibility",
    body: "Customer org charts, account maps, missing roles, decision chains, and relationship health sit close to the project work.",
  },
  {
    icon: ClipboardList,
    title: "Daily execution",
    body: "Tasks, notes, account signals, activity history, and BCC email capture are designed to reduce separate CRM update work.",
  },
];

const differentiators = [
  "Built for the person working the account, not only for the manager reviewing forecast.",
  "Optimized for depth inside a few strategic accounts, not high-volume lead management.",
  "Soft completion: incomplete information becomes a signal or risk, not a blocked form.",
  "Account planning, stakeholder mapping, tasks, projects, contacts, and activity live in one workspace.",
];

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Visioner | Account Planning CRM for Key Account Managers",
      description:
        "Visioner is an Account Planning CRM for Key Account Managers: a daily workspace for revenue, projects, stakeholders, relationship health, tasks, and account signals.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Visioner",
      url: absoluteUrl("/about"),
      description:
        "Visioner is an Account Planning CRM for Key Account Managers and strategic account owners.",
      isPartOf: {
        "@type": "WebSite",
        name: "Visioner",
        url: absoluteUrl("/"),
      },
      about: {
        "@type": "SoftwareApplication",
        name: "Visioner CRM",
        alternateName: ["Visioner", "Visioner Account Planning CRM"],
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absoluteUrl("/"),
        description:
          "Account planning CRM for Key Account Managers to manage strategic accounts, projects, stakeholders, tasks, relationship health, and account signals.",
      },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "About Visioner", path: "/about" },
    ]),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <header className="border-b border-border/60 bg-background/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2.5">
            <img src="/visioner-mark.svg" alt="" className="h-9 w-9" />
            <div className="leading-none">
              <div className="font-bold tracking-tight">Visioner</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Account Planning CRM
              </div>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <a
              href={APP_URL}
              className="hidden h-10 items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-surface-muted sm:inline-flex"
            >
              Open Web App
            </a>
            <a
              href={SIGNUP_URL}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
            >
              Start Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              About Visioner
            </div>
            <h1 className="max-w-4xl text-[40px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[58px]">
              Visioner is an Account Planning CRM for Key Account Managers.
            </h1>
            <p className="mt-6 max-w-3xl text-[18px] leading-8 text-muted-foreground">
              Visioner helps strategic account owners manage the work that traditional CRMs often
              flatten into rows: relationships, stakeholders, org charts, account plans, project
              context, tasks, follow-ups, and signals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SIGNUP_URL}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
              >
                Start your first 3 accounts <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/account-planning-crm"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
              >
                Learn the category
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Signal className="h-4 w-4 text-accent" />
              Product identity
            </div>
            <dl className="mt-5 space-y-4">
              {facts.map(([label, value]) => (
                <div key={label} className="border-b border-border/70 pb-4 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-6 text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{pillar.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-2xl border border-border bg-surface/40 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground">Why this exists</h2>
              <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
                KAMs are often judged through forecast systems that do not help them work the
                account. Visioner is designed to make the account plan useful every day, so the
                reporting layer becomes a byproduct of real account work.
              </p>
            </div>
            <div className="space-y-3">
              {differentiators.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-[15px] leading-6 text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Questions, partnerships, or beta feedback?</h2>
                <p className="mt-3 max-w-2xl text-primary-foreground/75">
                  Visioner is early. Feedback from working KAMs, founders, sales operators, and
                  strategic account leaders directly shapes the product.
                </p>
              </div>
              <a
                href="mailto:support@visioner.cc?subject=Visioner%20CRM%20question"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
              >
                <Mail className="h-4 w-4" />
                Contact Visioner
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
