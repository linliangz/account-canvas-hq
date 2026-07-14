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
  problem:
    "Account plans often live in slides, spreadsheets, or static CRM fields. They become outdated because they are separated from the work itself. Visioner treats account planning as a daily operating system: every project update, task, relationship touch, and signal makes the plan more useful.",
  outcomes: [
    "Connect revenue targets to real account work",
    "See project risk and stakeholder coverage together",
    "Use completed tasks and activity as account plan evidence",
    "Export or summarize a clearer account plan later",
  ],
  sections: [
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
  ],
};

export const Route = createFileRoute("/account-planning-crm")({
  head: () =>
    pageHead({
      title: "Account Planning CRM | Visioner",
      description:
        "Visioner is an account planning CRM for revenue, projects, stakeholders, tasks, relationship health, and strategic account signals.",
      path: "/account-planning-crm",
    }),
  component: () => <SeoLandingPage config={page} />,
});
