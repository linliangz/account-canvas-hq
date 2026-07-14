import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Traditional CRM vs Account Planning CRM",
  title: "Traditional CRM tracks the forecast. Account planning CRM helps work the account.",
  subtitle:
    "Visioner is built for Key Account Managers who need a daily workspace for relationships, stakeholders, projects, tasks, and account signals before the forecast asks for an update.",
  path: "/traditional-crm-vs-account-planning-crm",
  primaryKeyword: "Traditional CRM vs Account Planning CRM",
  audience: "KAMs and founders comparing pipeline CRM tools with account planning workflows",
  problem:
    "Traditional CRM systems are powerful systems of record, but they often serve managers who review pipeline and forecasts. Key Account Managers need a different daily view: what changed in the account, who matters, which relationship is cold, which stakeholder is missing, and what action should happen next. Account planning CRM fills that working layer.",
  outcomes: [
    "Understand where traditional CRM is still useful",
    "See what account planning CRM adds for KAM daily work",
    "Separate manager reporting from account owner execution",
    "Use Visioner alongside an existing CRM before a full migration",
  ],
  sections: [
    {
      title: "Traditional CRM is the system of record",
      body: "Salesforce, HubSpot, and similar CRMs are useful for company-wide records, pipeline stages, revenue reporting, and management dashboards.",
      bullets: [
        "Opportunity records and forecast fields",
        "Manager dashboards and pipeline reviews",
        "Company-wide consistency and reporting",
      ],
    },
    {
      title: "Account planning CRM is the working layer",
      body: "Visioner focuses on the account owner's daily questions: relationship coverage, stakeholder roles, project risks, tasks, notes, and signals.",
      bullets: [
        "Account overview before form fields",
        "Org chart and stakeholder coverage",
        "Tasks and relationship health in daily flow",
      ],
    },
    {
      title: "The best path can be both",
      body: "A KAM can use Visioner to work the account while keeping the existing CRM for official reporting. Over time, useful account context becomes cleaner and easier to share.",
      bullets: [
        "Start with three strategic accounts",
        "Capture work without forcing a CRM cleanup project",
        "Export or summarize account plan evidence later",
      ],
    },
  ],
  faq: [
    {
      question: "Does Visioner replace traditional CRM?",
      answer:
        "Not necessarily. Visioner is designed to start as the daily account planning layer for the KAM, while a traditional CRM can remain the official system of record.",
    },
    {
      question: "Why do KAMs need an account planning CRM?",
      answer:
        "KAMs manage a small number of complex accounts where people, influence, timing, and relationship health matter. Those workflows are often hard to see in a pipeline-first CRM view.",
    },
    {
      question: "When should a team use traditional CRM and Visioner together?",
      answer:
        "Use the traditional CRM for company reporting and Visioner for account-level execution: stakeholder mapping, relationship cadence, project notes, tasks, and account signals.",
    },
  ],
};

export const Route = createFileRoute("/traditional-crm-vs-account-planning-crm")({
  head: () =>
    pageHead({
      title: "Traditional CRM vs Account Planning CRM | Visioner",
      description:
        "Compare traditional CRM with account planning CRM. Visioner helps KAMs work strategic accounts with stakeholders, projects, tasks, relationship health, and signals.",
      path: "/traditional-crm-vs-account-planning-crm",
    }),
  component: () => <SeoLandingPage config={page} />,
});
