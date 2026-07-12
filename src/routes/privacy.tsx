import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Visioner CRM" },
      {
        name: "description",
        content:
          "Visioner CRM privacy policy for SaaS account planning, cloud services, email capture, enrichment, analytics, and support.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Scope",
    body: [
      "This Privacy Policy explains how Visioner CRM collects, uses, stores, and protects information when you use the Visioner website, web app, beta programs, support channels, and related cloud services.",
      "Visioner CRM is operated by Ronisens Inc. References to Visioner, we, us, or our mean Ronisens Inc. and the Visioner CRM product team.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account and registration information may include your name, email address, company, role, plan interest, workspace identifier, and support messages.",
      "Product data may include account names, customer domains, contacts, titles, phone numbers, notes, tags, projects, tasks, org charts, files, relationship health, account signals, and activity logs that you choose to enter, import, or sync.",
      "If you use optional cloud features such as BCC email capture, sync, backup, contact enrichment, or intelligence workflows, Visioner may process the selected data needed to provide those features. For email capture, this can include sender, recipients, subject, timestamps, attachments, message body, routing metadata, summaries, and project classification status.",
      "Usage and device information may include page views, feature events, browser or app version, operating system, timestamps, IP-derived rough region, errors, and diagnostic logs.",
    ],
  },
  {
    title: "3. Browser Workspace and Cloud Data",
    body: [
      "Visioner V1.0 is SaaS-first, but the browser may keep a local workspace cache for speed and continuity. Data you enter, import, sync, upload, route through cloud features, or send to support may be processed by Visioner to provide the service.",
      "Browser reset, cache clearing, or device loss may affect locally cached data. You are responsible for maintaining exports or backups for data that has not been synced or otherwise stored in the service.",
    ],
  },
  {
    title: "4. How We Use Information",
    body: [
      "We use information to provide and improve Visioner, create and maintain workspaces, route and summarize emails, generate local and cloud signals, process support requests, manage billing, prevent abuse, debug errors, analyze activation and retention, and communicate about the product.",
      "We do not sell your CRM content, account notes, project records, or private email content.",
    ],
  },
  {
    title: "5. Cloud Providers and Subprocessors",
    body: [
      "Visioner may use service providers for hosting, analytics, email delivery, payment processing, database storage, file storage, support, AI-assisted workflows, and contact enrichment. These providers process information only as needed to deliver the relevant service.",
      "Payment details are handled by payment processors such as Stripe or PayPal when enabled. Visioner does not intend to store full card numbers.",
    ],
  },
  {
    title: "6. Email Capture and Attachments",
    body: [
      "BCC email capture is an optional cloud feature. When enabled, emails sent to a Visioner capture address may be used to match verified senders, customer domains, account aliases, projects, contacts, and review queues.",
      "In V1, Waiting Reply status is a reminder based on the outbound email and user workflow. Automatic reply detection requires forwarded replies, mailbox rules, or future Gmail/Outlook authorization.",
      "We aim to minimize raw email retention over time by keeping metadata, summaries, routing decisions, and user-confirmed activity records where practical. During beta, retention behavior may evolve as the product matures.",
    ],
  },
  {
    title: "7. Third-Party Integrations and BYOK",
    body: [
      "Some enrichment features may allow you to enter your own third-party API key. During the current proof-of-concept design, Visioner does not store those API keys server-side and uses them only to perform the requested provider call.",
      "You are responsible for ensuring your use of third-party APIs, customer data, and enrichment results complies with applicable laws, provider terms, and your company policies.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We use reasonable technical and organizational measures to protect information, including HTTPS, access controls, secret management, audit logs for sensitive cloud calls, and limited internal access.",
      "No online service can guarantee perfect security. Please do not use Visioner as the only copy of critical legal, contractual, financial, or compliance records.",
    ],
  },
  {
    title: "9. Retention and Deletion",
    body: [
      "We retain information for as long as needed to provide the service, support users, comply with legal obligations, resolve disputes, prevent abuse, and improve the product.",
      "You may request deletion of account information or cloud-stored workspace data by contacting support. Some records may remain in backups, logs, billing records, or legal archives for a limited period where required or reasonably necessary.",
    ],
  },
  {
    title: "10. Your Choices",
    body: [
      "You can choose whether to use local-only features, register for cloud services, enable sync, import contacts, use BCC capture, upload files, or connect third-party APIs.",
      "You may export or delete local data using product controls where available. You may also contact support for help with cloud data access, correction, export, or deletion requests.",
    ],
  },
  {
    title: "11. International Use",
    body: [
      "Visioner may process information in the United States or other locations where we or our service providers operate. By using Visioner, you understand that information may be transferred and processed outside your country or region.",
    ],
  },
  {
    title: "12. Changes",
    body: [
      "We may update this Privacy Policy as Visioner develops. If changes are material, we will update the date on this page and take reasonable steps to notify users where appropriate.",
    ],
  },
];

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <a href="/" className="inline-flex items-center">
          <img src="/visioner-lockup.svg" alt="Visioner CRM" className="h-auto w-[132px]" />
        </a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: July 10, 2026</p>
        <p className="mt-6 text-[17px] leading-7 text-muted-foreground">
          Visioner CRM is built for strategic account work. That can include sensitive customer and
          relationship information, so our privacy posture emphasizes data minimization, clear
          cloud-feature boundaries, and explicit opt-in for sensitive workflows.
        </p>

        <div className="mt-10 space-y-8 text-[16px] leading-7 text-muted-foreground">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              For privacy questions, access requests, or deletion requests, contact{" "}
              <a
                className="font-medium text-accent hover:underline"
                href="mailto:support@visioner.cc"
              >
                support@visioner.cc
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
