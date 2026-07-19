import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Visioner CRM" },
      {
        name: "description",
        content:
          "Visioner CRM privacy policy for the iOS Personal and Work spaces, SaaS account planning, cloud services, Apple integrations, email capture, analytics, and support.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Scope",
    body: [
      "This Privacy Policy explains how Visioner CRM collects, uses, stores, and protects information when you use the Visioner website, web app, iOS app, beta programs, support channels, and related cloud services.",
      "Visioner CRM is operated by Ronisens Inc. References to Visioner, we, us, or our mean Ronisens Inc. and the Visioner CRM product team.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account and registration information may include your name, email address, company, role, plan interest, workspace identifier, and support messages.",
      "Security information may include temporary one-time verification challenges, delivery status, failed-attempt counts, IP address, and browser information used to protect signup and login. Visioner stores one-time email codes only as cryptographic hashes, and codes expire after a short period.",
      "Product data may include account names, customer domains, contacts, titles, phone numbers, notes, tags, projects, tasks, org charts, files, relationship health, account signals, and activity logs that you choose to enter, import, or sync.",
      "If you use optional cloud features such as BCC email capture, sync, backup, contact enrichment, or intelligence workflows, Visioner may process the selected data needed to provide those features. For email capture, this can include sender, recipients, subject, timestamps, readable message text, attachment names and sizes, routing metadata, summaries, and project classification status. Visioner does not currently retain raw MIME or binary attachment files.",
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
    title: "4. iOS App, Personal Space, and Apple Permissions",
    body: [
      "The iOS app has separate Personal and Work spaces. Personal can be used without a Visioner account. Personal relationships, user-chosen cadence, importance, private context, snooze or pause state, and touch history are stored in a protected on-device vault by default and are not uploaded to Visioner Cloud merely because you use Personal.",
      "When you choose people from Apple Contacts, Visioner reads only the selected contact records needed for the feature, such as name, organization, title, email address, phone number, and linked profile URL. A device contact identifier may be stored locally to support explicit updates and avoid duplicates. Visioner does not upload your full address book or scan contacts you did not select.",
      "Contacts access is requested when you choose an import or synchronization action. Calendar Full Access is requested only when you enable the optional Visioner task calendar, and Visioner uses a dedicated calendar for task title and due-date synchronization. Notification permission is requested only when you enable reminders, and notification preview text is designed not to name a contact, customer, or task.",
      "Switching between Personal and Work does not move data. If you explicitly add a Personal person to a chosen Work Account, Visioner copies contact fields such as name, title, email address, phone number, and linked profile URL. Personal cadence, importance, last-touch time, context notes, and interaction history remain in Personal.",
      "Visioner does not read iMessage or SMS history. Email, Message, and Call actions use Apple-provided compose or system interfaces and remain user initiated. BCC email capture processes only messages that a user deliberately sends to a Visioner capture address. The Share Extension processes text or URLs that you explicitly share and may hold a minimal protected draft on device until the main app imports it.",
      "Work is the Visioner Cloud companion. After you sign in, selected Work records, offline edits, and captures may synchronize with the workspace as described elsewhere in this policy. Personal data remains outside that sync unless you perform the explicit contact-fields-only action above.",
    ],
  },
  {
    title: "5. How We Use Information",
    body: [
      "We use information to provide and improve Visioner, create and maintain workspaces, route and summarize emails, generate local and cloud signals, process support requests, manage billing, prevent abuse, debug errors, analyze activation and retention, and communicate about the product.",
      "We do not sell your CRM content, account notes, project records, or private email content.",
    ],
  },
  {
    title: "6. Cloud Providers and Subprocessors",
    body: [
      "Visioner may use service providers for hosting, analytics, email delivery, payment processing, database storage, file storage, support, AI-assisted workflows, and contact enrichment. These providers process information only as needed to deliver the relevant service.",
      "Payment details are handled by payment processors such as Stripe or PayPal when enabled. Visioner does not intend to store full card numbers.",
    ],
  },
  {
    title: "7. Email Capture and Attachments",
    body: [
      "BCC email capture is an optional cloud feature. When enabled, emails sent to a Visioner capture address may be used to match verified senders, customer domains, account aliases, projects, contacts, and review queues.",
      "In V1, Waiting Reply status is a reminder based on the outbound email and user workflow. Automatic reply detection requires forwarded replies, mailbox rules, or future Gmail/Outlook authorization.",
      "We aim to minimize raw email retention over time by keeping metadata, summaries, routing decisions, and user-confirmed activity records where practical. During beta, retention behavior may evolve as the product matures.",
    ],
  },
  {
    title: "8. Third-Party Integrations and BYOK",
    body: [
      "Some enrichment features allow an authorized workspace Owner or Admin to connect a third-party API key. Visioner encrypts connected keys in the workspace credential vault, does not return the plaintext key to the browser after connection, and uses it only for authorized provider calls initiated for that workspace.",
      "You are responsible for ensuring your use of third-party APIs, customer data, and enrichment results complies with applicable laws, provider terms, and your company policies.",
    ],
  },
  {
    title: "9. Security",
    body: [
      "We use reasonable technical and organizational measures to protect information, including HTTPS, access controls, secret management, audit logs for sensitive cloud calls, and limited internal access.",
      "Signup and login use a standard automated security check with a globally available one-time email-code fallback when the standard check is unavailable. One-time codes are short-lived, single-use, rate limited, and stored only as cryptographic hashes.",
      "No online service can guarantee perfect security. Please do not use Visioner as the only copy of critical legal, contractual, financial, or compliance records.",
    ],
  },
  {
    title: "10. Retention and Deletion",
    body: [
      "We retain information for as long as needed to provide the service, support users, comply with legal obligations, resolve disputes, prevent abuse, and improve the product.",
      "Personal relationships can be removed in the iOS app together with their private Visioner touch history. This does not delete the separate Apple contact or a Work contact that you previously created through an explicit copy. On-device app data is also subject to your iOS device, backup, and app-removal settings.",
      "You may request deletion of account information or cloud-stored workspace data by contacting support. Some records may remain in backups, logs, billing records, or legal archives for a limited period where required or reasonably necessary.",
    ],
  },
  {
    title: "11. Your Choices",
    body: [
      "You can choose whether to use Personal on device, sign in to Work cloud services, enable sync, select contacts, enable Calendar or notifications, use BCC capture, share content into Visioner, upload files, or connect third-party APIs. You can change Apple permissions later in iOS Settings, although the related feature may stop working.",
      "You may export or delete local data using product controls where available. You may also contact support for help with cloud data access, correction, export, or deletion requests.",
    ],
  },
  {
    title: "12. International Use",
    body: [
      "Visioner may process information in the United States or other locations where we or our service providers operate. By using Visioner, you understand that information may be transferred and processed outside your country or region.",
    ],
  },
  {
    title: "13. Changes",
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
        <p className="mt-4 text-muted-foreground">Last updated: July 18, 2026</p>
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
