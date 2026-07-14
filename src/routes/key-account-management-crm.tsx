import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Key Account Management CRM",
  title: "Key account management CRM for the person working the account.",
  subtitle:
    "Visioner gives Key Account Managers a daily CRM workspace for account plans, projects, contacts, org charts, relationship health, tasks, and account signals.",
  path: "/key-account-management-crm",
  primaryKeyword: "Key Account Management CRM",
  audience:
    "Key Account Managers who need a CRM view built around strategic account work, not only pipeline reporting",
  problem:
    "A key account management CRM should help the account owner understand the account, not only update fields for management review. KAMs need to see revenue context, active projects, stakeholder coverage, relationship health, follow-ups, and risks together. Visioner is built around that daily operating rhythm.",
  outcomes: [
    "Run strategic account work from one account-first workspace",
    "Connect projects to contacts, roles, risks, and activities",
    "Use relationship health and signals to decide what to do next",
    "Start with three accounts before a team-wide CRM rollout",
  ],
  sections: [
    {
      title: "Account-first CRM",
      body: "Visioner starts from the account and the work inside it: revenue path, projects, stakeholders, tasks, notes, email activity, and relationship coverage.",
      bullets: [
        "Portfolio home across key accounts",
        "Account overview for each customer",
        "No forced pipeline-only workflow",
      ],
    },
    {
      title: "People before fields",
      body: "Key account management depends on people and influence. Visioner keeps contacts, reporting lines, stakeholder roles, and relationship health close to every project.",
      bullets: [
        "Org chart per account",
        "Decision roles per project",
        "Relationship health and cadence reminders",
      ],
    },
    {
      title: "CRM as a byproduct",
      body: "Visioner is designed to make useful CRM records emerge from daily work: tasks, notes, project updates, contact activity, and BCC email capture beta.",
      bullets: [
        "Optional fields and soft completion",
        "Task board and weekly progress",
        "Activity capture without double entry",
      ],
    },
  ],
  faq: [
    {
      question: "What is a key account management CRM?",
      answer:
        "A key account management CRM helps KAMs manage strategic accounts with account plans, revenue context, projects, contacts, stakeholder mapping, tasks, activity, risks, and relationship health.",
    },
    {
      question: "How is Visioner different from a standard sales CRM?",
      answer:
        "Standard sales CRMs often focus on opportunities, stages, and forecasts. Visioner focuses on the KAM's daily account work: people, projects, relationship coverage, tasks, and account signals.",
    },
    {
      question: "Can Visioner work alongside Salesforce or HubSpot?",
      answer:
        "Yes. Visioner can start as a daily account planning workspace while the existing CRM remains the company system of record.",
    },
  ],
};

export const Route = createFileRoute("/key-account-management-crm")({
  head: () =>
    pageHead({
      title: "Key Account Management CRM | Visioner",
      description:
        "Visioner is a key account management CRM for KAMs to manage account plans, projects, contacts, org charts, relationship health, tasks, and signals.",
      path: "/key-account-management-crm",
    }),
  component: () => <SeoLandingPage config={page} />,
});
