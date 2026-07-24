import { ArrowRight, Check, ChevronRight, Download, FileText, Globe } from "lucide-react";

import { articleJsonLd, breadcrumbJsonLd } from "../lib/seo";
import { marketingSignupUrl } from "../lib/marketing-links";

const APP_URL = "https://app.visioner.cc/";

export type GuidePageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  author?: string;
  dateModified: string;
  updatedAt: string;
  readingTime: string;
  sources?: Array<{
    label: string;
    href: string;
    note: string;
  }>;
  summary: string[];
  evidence?: {
    image: string;
    alt: string;
    caption: string;
  };
  comparison?: {
    title: string;
    description: string;
    columns: string[];
    rows: Array<{
      criterion: string;
      values: string[];
    }>;
  };
  resource?: {
    title: string;
    description: string;
    href: string;
    label: string;
  };
  fit?: {
    for: string[];
    notFor: string[];
  };
  sections: Array<{
    title: string;
    body: string[];
    checklist?: string[];
  }>;
  related: Array<{
    label: string;
    href: string;
  }>;
};

export function GuidePage({ config }: { config: GuidePageConfig }) {
  const signupUrl = marketingSignupUrl("guide_content", config.path);
  const structuredData = [
    articleJsonLd({
      title: config.title,
      description: config.description,
      path: config.path,
      dateModified: config.dateModified,
      image: config.evidence?.image,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: config.title, path: config.path },
    ]),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
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

      <article>
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              {config.eyebrow}
            </div>
            <h1 className="max-w-4xl text-[40px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[58px]">
              {config.title}
            </h1>
            <p className="mt-6 max-w-3xl text-[18px] leading-8 text-muted-foreground">
              {config.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span>By {config.author || "Visioner product team"}</span>
              <span aria-hidden>•</span>
              <time dateTime={config.dateModified}>{config.updatedAt}</time>
              <span aria-hidden>•</span>
              <span>{config.readingTime}</span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Reviewed against the current Visioner product and the sources linked in this guide. No
              customer result, market rank, or performance outcome is implied.
            </p>
          </div>
        </section>

        <section className="border-b border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Quick answer
              </div>
              <h2 className="mt-3 text-2xl font-bold text-foreground">What to remember</h2>
            </div>
            <div className="grid gap-3">
              {config.summary.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-[15px] leading-7 text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {config.evidence && (
          <section className="border-b border-border/60">
            <figure className="mx-auto max-w-5xl px-6 py-12 md:py-16">
              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]">
                <img
                  src={config.evidence.image}
                  alt={config.evidence.alt}
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>
              <figcaption className="mt-4 max-w-4xl text-sm leading-6 text-muted-foreground">
                {config.evidence.caption}
              </figcaption>
            </figure>
          </section>
        )}

        {config.comparison && (
          <section className="border-b border-border/60 bg-surface/40">
            <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {config.comparison.title}
              </h2>
              <p className="mt-4 max-w-3xl text-[17px] leading-8 text-muted-foreground">
                {config.comparison.description}
              </p>
              <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead className="bg-secondary/60">
                    <tr>
                      <th className="border-b border-border px-4 py-3 text-sm font-bold text-foreground">
                        Decision criterion
                      </th>
                      {config.comparison.columns.map((column) => (
                        <th
                          key={column}
                          className="border-b border-border px-4 py-3 text-sm font-bold text-foreground"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.comparison.rows.map((row) => (
                      <tr key={row.criterion} className="border-b border-border/70 last:border-0">
                        <th className="px-4 py-4 align-top text-sm font-semibold text-foreground">
                          {row.criterion}
                        </th>
                        {row.values.map((value, index) => (
                          <td
                            key={`${row.criterion}-${config.comparison?.columns[index]}`}
                            className="px-4 py-4 align-top text-sm leading-6 text-muted-foreground"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {config.resource && (
          <section className="border-b border-border/60">
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
              <div className="grid gap-5 rounded-lg border border-accent/25 bg-accent/5 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    Practical resource
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-foreground">
                    {config.resource.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-muted-foreground">
                    {config.resource.description}
                  </p>
                </div>
                <a
                  href={config.resource.href}
                  download
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
                >
                  <Download className="h-4 w-4" /> {config.resource.label}
                </a>
              </div>
            </div>
          </section>
        )}

        {config.fit && (
          <section className="border-b border-border/60">
            <div className="mx-auto grid max-w-5xl gap-6 px-6 py-14 md:grid-cols-2 md:py-20">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-bold text-foreground">A strong fit</h2>
                <ul className="mt-5 space-y-3">
                  {config.fit.for.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-7 text-foreground">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-surface/50 p-6">
                <h2 className="text-xl font-bold text-foreground">Probably not the right fit</h2>
                <ul className="mt-5 space-y-3">
                  {config.fit.notFor.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-7 text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-[minmax(0,1fr)_260px] md:py-24">
            <div className="space-y-12">
              {config.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-[17px] leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.checklist && (
                    <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Practical checklist
                      </div>
                      <ul className="mt-4 space-y-3">
                        {section.checklist.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[15px] leading-7 text-foreground"
                          >
                            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-5 md:sticky md:top-24">
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Continue reading
              </div>
              <div className="mt-4 space-y-2">
                {config.related.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-secondary/50"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-secondary/50 p-4">
                <div className="text-sm font-bold text-foreground">
                  Try Visioner with 3 accounts
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Build an account plan, map stakeholders, and manage KAM tasks without a heavy CRM
                  setup.
                </p>
                <a
                  href={signupUrl}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] transition hover:brightness-105"
                >
                  Start Free <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={APP_URL}
                  className="mt-2 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
                >
                  <Globe className="h-4 w-4" /> Open Web App
                </a>
              </div>
            </aside>
          </div>
        </section>

        {config.sources && config.sources.length > 0 && (
          <section className="border-t border-border/60 bg-surface/40">
            <div className="mx-auto max-w-5xl px-6 py-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Sources and review basis
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                These references support the guide's category definitions and operating context.
                Visioner product details are checked against the current public product and pricing
                pages.
              </p>
              <ul className="mt-6 space-y-4">
                {config.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      rel="noreferrer"
                      className="font-semibold text-accent hover:underline"
                    >
                      {source.label}
                    </a>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>

      <footer className="border-t border-border/60 bg-surface/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <a href="/" className="font-bold text-foreground">
            Visioner
          </a>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="/crm-for-key-account-managers" className="hover:text-foreground">
              CRM for KAMs
            </a>
            <a href="/account-planning-crm" className="hover:text-foreground">
              Account Planning CRM
            </a>
            <a href="/account-plan-template" className="hover:text-foreground">
              Account Plan Template
            </a>
            <a href="/guides" className="hover:text-foreground">
              All Guides
            </a>
            <a href="/privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
