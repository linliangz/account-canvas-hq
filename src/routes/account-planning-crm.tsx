import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Account Planning CRM",
  title: "Account planning CRM for strategic accounts, not spreadsheet theater.",
  subtitle:
    "Visioner turns account plans into a working canvas: revenue targets, active projects, decision roles, relationship health, tasks, notes, and account signals in one place.",
  path: "/account-planning-crm",
  primaryKeyword: "Account Planning CRM",
  audience: "account owners who need account plans to guide real work, not just quarterly reviews",
  dateModified: "2026-07-14",
  updatedAt: "Updated July 14, 2026",
  directAnswer:
    "An account planning CRM is a daily workspace for managing a strategic customer across revenue, projects, stakeholders, relationships, and next actions. Unlike a pipeline CRM, it is organized around the depth of work inside a few key accounts rather than the volume of opportunities across a sales team.",
  problem:
    "Account plans often live in slides, spreadsheets, or static CRM fields. They become outdated because they are separated from the work itself. Visioner treats account planning as a daily operating system: every project update, task, relationship touch, and signal makes the plan more useful.",
  outcomes: [
    "Connect revenue targets to real account work",
    "See project risk and stakeholder coverage together",
    "Use completed tasks and activity as account plan evidence",
    "Export or summarize a clearer account plan later",
  ],
  evidence: {
    image: "/product-screenshots/visioner-account-overview.png",
    alt: "Visioner account overview showing strategic account tasks, projects, revenue progress, and local signals",
    caption:
      "A current Visioner account workspace. Revenue context stays visible, while tasks, projects, stakeholder gaps, and relationship signals remain close to the work.",
  },
  fit: {
    for: [
      "Key Account Managers responsible for a small number of complex, high-value customers",
      "Account plans where stakeholder coverage and relationship cadence affect project outcomes",
      "Teams that keep a corporate CRM but need a practical daily account workspace",
    ],
    notFor: [
      "High-volume lead capture, marketing automation, or SDR sequencing",
      "Replacing a finance-grade forecasting or enterprise system of record",
      "Automatically scraping private customer data without user review",
    ],
  },
  related: [
    { label: "CRM for Key Account Managers", href: "/crm-for-key-account-managers" },
    {
      label: "Traditional CRM vs Account Planning CRM",
      href: "/traditional-crm-vs-account-planning-crm",
    },
    {
      label: "What should an account plan include?",
      href: "/guides/what-should-an-account-plan-include",
    },
    {
      label: "How to choose KAM software",
      href: "/guides/how-to-choose-key-account-management-software",
    },
  ],
  sections: [
    {
      title: "A 10-minute daily account planning check",
      body: "A useful account plan should answer today's questions before it asks the KAM to maintain more fields. Review the account in this order, then update only what changed.",
      bullets: [
        "Confirm today's urgent and important tasks",
        "Review the next step, owner, and target date for active projects",
        "Check missing decision roles and relationships that need attention",
        "Log one meaningful update and leave incomplete information as a visible signal",
      ],
    },
    {
      title: "Overview before detail",
      body: "Start from the account overview: current ARR, target gap, projects, tasks, signals, and relationship reminders. Then drill into projects and stakeholders only when needed.",
      bullets: [
        "Portfolio and account overview",
        "Revenue path to target",
        "Priority work across projects",
      ],
    },
    {
      title: "Stakeholder-aware projects",
      body: "Every strategic project depends on a decision chain. Visioner lets projects carry stakeholders, roles, risks, activity, and notes instead of only a stage and close date.",
      bullets: [
        "Decision roles and missing seats",
        "Project activity and files",
        "Risks tied to people and next steps",
      ],
    },
    {
      title: "Signals from incomplete plans",
      body: "A strong account planning CRM should not punish missing information. It should surface the gap and help the account owner decide what to do next.",
      bullets: [
        "Economic buyer unknown",
        "Champion relationship cooling",
        "Project quiet for too long",
      ],
    },
    {
      title: "Use it beside the corporate CRM",
      body: "Visioner is designed as the KAM's daily account workspace. A corporate CRM can remain the system of record for company-wide pipeline governance, forecasting, permissions, and finance workflows; Visioner focuses on the people, projects, tasks, and evidence inside each strategic account.",
      bullets: [
        "Corporate CRM: shared pipeline governance and management reporting",
        "Visioner: daily account planning, stakeholder coverage, and next actions",
        "Current limitation: Visioner does not yet replace enterprise forecasting or marketing automation",
      ],
    },
  ],
  faq: [
    {
      question: "What is an account planning CRM?",
      answer:
        "An account planning CRM helps account owners manage the full account plan: revenue, projects, stakeholders, org chart, risks, tasks, notes, and relationship coverage.",
    },
    {
      question: "Is Visioner only for enterprise sales?",
      answer:
        "Visioner is most useful when the account is complex enough that people, influence, timing, and relationship coverage matter as much as the opportunity record.",
    },
    {
      question: "Can I start without complete data?",
      answer:
        "Yes. Visioner uses soft completion. Empty fields become signals and gaps, not blockers.",
    },
    {
      question: "Does an account planning CRM replace Salesforce or another corporate CRM?",
      answer:
        "Not necessarily. Many KAMs can use Visioner as their daily account workspace while the corporate CRM remains the company system of record for shared pipeline and forecasting.",
    },
  ],
};

export const Route = createFileRoute("/account-planning-crm")({
  head: () =>
    pageHead({
      title: "Account Planning CRM | Visioner",
      description:
        "Visioner is an account planning CRM for revenue, projects, stakeholders, tasks, relationship health, and strategic account signals.",
      path: "/account-planning-crm",
      type: "article",
      image: "/product-screenshots/visioner-account-overview.png",
    }),
  component: () => <SeoLandingPage config={page} />,
});
