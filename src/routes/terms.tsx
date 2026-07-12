import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Visioner CRM" },
      {
        name: "description",
        content:
          "Visioner CRM terms of service for SaaS account planning, beta access, cloud features, integrations, billing, and support.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Agreement",
    body: [
      "These Terms of Service govern your access to and use of Visioner CRM, including the website, web app, beta programs, documentation, support channels, and related cloud services.",
      "Visioner CRM is operated by Ronisens Inc. By creating an account or using the service, you agree to these Terms and the Privacy Policy.",
    ],
  },
  {
    title: "2. Product Status",
    body: [
      "Visioner is currently an early commercial beta. Features, pricing, plans, integrations, availability, and data models may change as the product develops.",
      "You should not use the beta as the only system of record for legal, financial, regulated, or mission-critical records. Keep your own backups and exports where appropriate.",
    ],
  },
  {
    title: "3. Accounts and Access",
    body: [
      "You are responsible for the accuracy of registration information and for activity under your workspace. V1.0 uses cloud email/password accounts for access, billing, and entitlement checks.",
      "Cloud features may require sign-in, verified email addresses, plan entitlements, and additional permissions.",
    ],
  },
  {
    title: "4. SaaS and Cloud Features",
    body: [
      "Visioner may provide SaaS account-planning features such as accounts, contacts, projects, org charts, tasks, notes, CSV import/export, and account signals.",
      "Cloud features such as sync, backup, BCC capture, AI workflows, contact enrichment, team workspaces, billing, and account community features may require paid plans or explicit opt-in.",
    ],
  },
  {
    title: "5. Your Data and Responsibilities",
    body: [
      "You retain responsibility for the data you enter, import, upload, sync, or route through Visioner, including customer contact data, email content, attachments, notes, and project information.",
      "You represent that you have the rights and permissions needed to process that data in Visioner and that your use complies with applicable laws, contracts, company policies, and customer commitments.",
    ],
  },
  {
    title: "6. Acceptable Use",
    body: [
      "You may not use Visioner to violate law, infringe rights, send spam, harvest data unlawfully, bypass third-party terms, reverse engineer the service, attack the service, or interfere with other users.",
      "We may suspend or limit access if we reasonably believe use is abusive, unlawful, risky to the service, or harmful to other users.",
    ],
  },
  {
    title: "7. Integrations and BYOK",
    body: [
      "Some features may allow you to use your own third-party API keys or accounts. You are responsible for maintaining those accounts, paying the third-party provider, and complying with the provider's terms.",
      "Visioner does not guarantee third-party provider availability, data accuracy, credit pricing, or permission scope. Provider limits or terms may change outside Visioner's control.",
    ],
  },
  {
    title: "8. Payments and Plans",
    body: [
      "Published prices may be beta prices and may change before or after commercial launch. Paid features begin only when checkout, invoice, entitlement, or another payment mechanism is enabled and accepted.",
      "Unless otherwise stated at checkout, subscriptions renew until cancelled. Taxes, refunds, credits, and cancellations may be handled by the payment provider or by Visioner support depending on the payment path.",
    ],
  },
  {
    title: "9. Intellectual Property",
    body: [
      "Visioner, the website, app, design, code, logos, documentation, and product concepts are owned by Ronisens Inc. or its licensors.",
      "You may use Visioner only as permitted by these Terms. Feedback, suggestions, and product ideas may be used by Visioner without restriction or obligation.",
    ],
  },
  {
    title: "10. Beta Warranty Disclaimer",
    body: [
      "Visioner is provided as-is and as-available to the maximum extent permitted by law. We disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, and error-free performance.",
      "Account signals, enrichment results, AI outputs, summaries, revenue calculations, and reminders are decision-support tools. You remain responsible for reviewing and validating important outputs.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Ronisens Inc. and Visioner will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost revenue, lost data, or business interruption.",
      "To the maximum extent permitted by law, our aggregate liability for claims relating to Visioner will not exceed the amount you paid to Visioner for the service in the three months before the event giving rise to the claim, or USD $100 if you have not paid Visioner.",
    ],
  },
  {
    title: "12. Changes and Termination",
    body: [
      "We may modify, suspend, or discontinue parts of Visioner as the beta evolves. We may update these Terms from time to time and will update the date on this page.",
      "You may stop using Visioner at any time. We may terminate or suspend access if you violate these Terms or create risk for the service.",
    ],
  },
];

function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <a href="/" className="inline-flex items-center">
          <img src="/visioner-lockup.svg" alt="Visioner CRM" className="h-auto w-[132px]" />
        </a>
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: July 10, 2026</p>
        <p className="mt-6 text-[17px] leading-7 text-muted-foreground">
          These terms are written for the current Visioner CRM beta: SaaS account planning first,
          cloud features when useful, and paid services as they become production-ready.
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
              For support or questions about these Terms, contact{" "}
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
