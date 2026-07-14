import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, ChevronRight } from "lucide-react";

import { breadcrumbJsonLd, collectionPageJsonLd, pageHead } from "../../lib/seo";

const SIGNUP_URL = "https://app.visioner.cc/signup";

const guides = [
  {
    title: "Account Mapping Guide for Key Account Managers",
    href: "/guides/account-mapping-guide-for-key-account-managers",
    description:
      "How to build a living account map with org chart structure, stakeholder roles, relationship health, and next actions.",
    keyword: "Account mapping guide",
  },
  {
    title: "What should an account plan include?",
    href: "/guides/what-should-an-account-plan-include",
    description:
      "A practical checklist for revenue context, active projects, stakeholder coverage, relationship health, risks, and next actions.",
    keyword: "Account plan checklist",
  },
  {
    title: "How to map stakeholders in a strategic account",
    href: "/guides/how-to-map-stakeholders-in-a-strategic-account",
    description:
      "A KAM-focused approach to org structure, decision roles, unknown seats, relationship health, and stakeholder risk.",
    keyword: "Stakeholder mapping guide",
  },
  {
    title: "CRM for Key Account Managers: what traditional CRM misses",
    href: "/guides/crm-for-key-account-managers",
    description:
      "Why KAMs need a daily account planning workspace, not only a pipeline reporting system.",
    keyword: "CRM for KAMs",
  },
  {
    title: "How to choose key account management software",
    href: "/guides/how-to-choose-key-account-management-software",
    description:
      "How to compare enterprise KAM platforms, CRM-native account planning, generic CRMs, and daily KAM workspaces.",
    keyword: "KAM software buyer guide",
  },
  {
    title: "Account Planning CRM vs Key Account Management Platform",
    href: "/guides/account-planning-crm-vs-key-account-management-platform",
    description:
      "When to choose a daily account planning CRM versus an enterprise KAM platform for team governance.",
    keyword: "Account planning CRM vs KAM platform",
  },
  {
    title: "Key Account Manager Daily Workflow: What to Check Every Morning",
    href: "/guides/key-account-manager-daily-workflow",
    description:
      "A practical morning workflow for portfolio review, tasks, projects, stakeholder gaps, relationship health, and follow-ups.",
    keyword: "KAM daily workflow",
  },
];

const keywordPages = [
  { label: "CRM for Key Account Managers", href: "/crm-for-key-account-managers" },
  { label: "Key Account Management CRM", href: "/key-account-management-crm" },
  { label: "Key Account Management Software", href: "/key-account-management-software" },
  { label: "Key Account Manager Tools", href: "/key-account-manager-tools" },
  { label: "Account Planning CRM", href: "/account-planning-crm" },
  { label: "Account Planning Software", href: "/account-planning-software" },
  { label: "Key Account Planning Software", href: "/key-account-planning-software" },
  {
    label: "Strategic Account Management Software",
    href: "/strategic-account-management-software",
  },
  { label: "Stakeholder Mapping CRM", href: "/stakeholder-mapping-crm" },
  { label: "Account Mapping Software", href: "/account-mapping-software" },
  { label: "Customer Org Chart Software", href: "/customer-org-chart-software" },
  { label: "Relationship Mapping Software", href: "/relationship-mapping-software" },
  { label: "Account Plan Template", href: "/account-plan-template" },
  {
    label: "Traditional CRM vs Account Planning CRM",
    href: "/traditional-crm-vs-account-planning-crm",
  },
];

const title = "Visioner Guides for Key Account Managers";
const description =
  "Guides for Key Account Managers on account planning, stakeholder mapping, strategic account management, relationship health, and CRM workflows.";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: `${title} | Visioner`,
      description,
      path: "/guides",
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  const structuredData = [
    collectionPageJsonLd({ title, description, path: "/guides" }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
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
          <a
            href={SIGNUP_URL}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
          >
            Start Free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Visioner Guides
          </div>
          <h1 className="max-w-4xl text-[40px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[58px]">
            Practical guides for Key Account Managers.
          </h1>
          <p className="mt-6 max-w-3xl text-[18px] leading-8 text-muted-foreground">
            Learn how to build better account plans, map stakeholders, manage relationship health,
            and choose CRM workflows that fit strategic account work.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.href}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <div className="mb-4 inline-flex rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {guide.keyword}
                </div>
                <h2 className="text-xl font-bold leading-tight text-foreground">{guide.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  {guide.description}
                </p>
                <a
                  href={guide.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  Read guide <ChevronRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Product search paths
                </div>
                <h2 className="mt-3 text-3xl font-bold text-foreground">
                  Explore the product by keyword.
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                  These pages explain Visioner by the phrases KAMs and founders are likely to
                  search.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywordPages.map((page) => (
                  <a
                    key={page.href}
                    href={page.href}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-secondary/50"
                  >
                    {page.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Start with three key accounts.</h2>
                <p className="mt-3 max-w-2xl text-primary-foreground/75">
                  Visioner turns account planning into a daily workspace for revenue, projects,
                  stakeholders, tasks, relationship health, and account signals.
                </p>
              </div>
              <a
                href={SIGNUP_URL}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
            {[
              "Account planning should guide daily work, not only quarterly reviews.",
              "Stakeholder mapping should expose missing influence, not hide it in notes.",
              "CRM should reduce account work friction, not add more required fields.",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-2 rounded-xl border border-border bg-surface/40 p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
