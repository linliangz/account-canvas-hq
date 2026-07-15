import { ArrowRight, Check, ChevronRight, Globe, Network, Signal } from "lucide-react";

import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "../lib/seo";
import { marketingSignupUrl } from "../lib/marketing-links";

const APP_URL = "https://app.visioner.cc/";

export type SeoLandingPageConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  path: string;
  primaryKeyword: string;
  audience: string;
  problem: string;
  directAnswer?: string;
  dateModified?: string;
  updatedAt?: string;
  evidence?: {
    image: string;
    alt: string;
    caption: string;
  };
  fit?: {
    for: string[];
    notFor: string[];
  };
  comparison?: {
    title: string;
    intro: string;
    rows: Array<{
      approach: string;
      bestFor: string;
      tradeoff: string;
    }>;
  };
  related?: Array<{ label: string; href: string }>;
  outcomes: string[];
  sections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

const relatedPages = [
  { label: "About Visioner", href: "/about" },
  { label: "All KAM guides", href: "/guides" },
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
  {
    label: "Account mapping guide",
    href: "/guides/account-mapping-guide-for-key-account-managers",
  },
  {
    label: "What should an account plan include?",
    href: "/guides/what-should-an-account-plan-include",
  },
  {
    label: "How to map stakeholders",
    href: "/guides/how-to-map-stakeholders-in-a-strategic-account",
  },
  {
    label: "A KAM's daily workflow",
    href: "/guides/key-account-manager-daily-workflow",
  },
  {
    label: "How to choose KAM software",
    href: "/guides/how-to-choose-key-account-management-software",
  },
  {
    label: "Account Planning CRM vs KAM Platform",
    href: "/guides/account-planning-crm-vs-key-account-management-platform",
  },
  {
    label: "KAM daily workflow",
    href: "/guides/key-account-manager-daily-workflow",
  },
];

export function SeoLandingPage({ config }: { config: SeoLandingPageConfig }) {
  const signupUrl = marketingSignupUrl("seo_landing", config.path);
  const structuredData = [
    ...(config.dateModified
      ? [
          articleJsonLd({
            title: config.title,
            description: config.subtitle,
            path: config.path,
            dateModified: config.dateModified,
            image: config.evidence?.image,
          }),
        ]
      : []),
    faqJsonLd(config.faq),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: config.primaryKeyword, path: config.path },
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
            <img src="/visioner-mark.svg" alt="Visioner" className="h-9 w-9" />
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
              href={signupUrl}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
            >
              Start Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-24">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {config.eyebrow}
            </div>
            <h1 className="max-w-4xl text-[40px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[58px]">
              {config.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-8 text-muted-foreground">
              {config.subtitle}
            </p>
            {config.updatedAt && (
              <div className="mt-4 text-sm text-muted-foreground">{config.updatedAt}</div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={signupUrl}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
              >
                Start your first 3 accounts <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={APP_URL}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
              >
                <Globe className="h-4 w-4" /> Open Web App
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Search intent
            </div>
            <h2 className="mt-3 text-2xl font-bold text-foreground">{config.primaryKeyword}</h2>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
              Built for {config.audience}. Visioner turns strategic account work into a daily
              workspace for priorities, stakeholders, relationships, and account signals.
            </p>
            <div className="mt-5 space-y-2.5">
              {config.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {config.directAnswer && (
        <section className="border-b border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 md:grid-cols-[220px_1fr] md:items-start">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Direct answer
            </div>
            <p className="text-[18px] leading-8 text-foreground">{config.directAnswer}</p>
          </div>
        </section>
      )}

      <section className="border-b border-border/60 bg-surface/40">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Signal className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Why this matters</h2>
            </div>
            <p className="text-[18px] leading-8 text-muted-foreground">{config.problem}</p>
          </div>
        </div>
      </section>

      {config.evidence && (
        <section className="border-b border-border/60">
          <figure className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]">
              <img
                src={config.evidence.image}
                alt={config.evidence.alt}
                className="block h-auto w-full"
                loading="lazy"
                width="1600"
                height="1000"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm leading-6 text-muted-foreground">
              {config.evidence.caption}
            </figcaption>
          </figure>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {config.sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Network className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{section.body}</p>
                <ul className="mt-5 space-y-2.5 text-[14px] text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {config.fit && (
        <section className="border-t border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-5xl gap-5 px-6 py-16 md:grid-cols-2 md:py-20">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">Visioner is a strong fit when</h2>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-muted-foreground">
                {config.fit.for.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">Visioner is not designed for</h2>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-muted-foreground">
                {config.fit.notFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-muted-foreground" aria-hidden>
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {config.comparison && (
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Choosing an approach
              </div>
              <h2 className="mt-3 text-3xl font-bold text-foreground">{config.comparison.title}</h2>
              <p className="mt-4 text-[17px] leading-8 text-muted-foreground">
                {config.comparison.intro}
              </p>
            </div>

            <div className="mt-8 hidden overflow-x-auto border-y border-border md:block">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <th className="px-4 py-3">Approach</th>
                    <th className="px-4 py-3">Best fit</th>
                    <th className="px-4 py-3">Tradeoff to expect</th>
                  </tr>
                </thead>
                <tbody>
                  {config.comparison.rows.map((row) => (
                    <tr key={row.approach} className="border-b border-border last:border-0">
                      <th className="px-4 py-4 align-top text-[15px] font-semibold text-foreground">
                        {row.approach}
                      </th>
                      <td className="px-4 py-4 align-top text-[15px] leading-7 text-muted-foreground">
                        {row.bestFor}
                      </td>
                      <td className="px-4 py-4 align-top text-[15px] leading-7 text-muted-foreground">
                        {row.tradeoff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border-y border-border md:hidden">
              {config.comparison.rows.map((row) => (
                <article key={row.approach} className="border-b border-border py-5 last:border-0">
                  <h3 className="text-[16px] font-semibold text-foreground">{row.approach}</h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Best fit
                      </dt>
                      <dd className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                        {row.bestFor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Tradeoff to expect
                      </dt>
                      <dd className="mt-1.5 text-[15px] leading-7 text-muted-foreground">
                        {row.tradeoff}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              Questions people ask before trying Visioner
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {config.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border bg-card px-5 py-4 open:shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-foreground">
                  <span className="font-semibold">{item.question}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Explore Visioner by search intent
                </h2>
                <p className="mt-2 text-[15px] text-muted-foreground">
                  Each page explains one way strategic account teams describe the same daily work.
                </p>
              </div>
              <div className="flex max-w-2xl flex-wrap gap-2">
                {(config.related ?? relatedPages).map((page) => (
                  <a
                    key={page.href}
                    href={page.href}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-secondary/50"
                  >
                    {page.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-[48px]">
            Start with three key accounts.
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground">
            Free to try. No pipeline review required. Just the account planning CRM your day
            actually needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={signupUrl}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
            >
              Start for Free <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
