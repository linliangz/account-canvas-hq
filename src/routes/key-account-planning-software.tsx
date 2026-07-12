import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Key Account Planning Software",
  title: "Key account planning software for the accounts that actually matter.",
  subtitle:
    "Visioner gives Key Account Managers a focused workspace for account overview, revenue path, project work, stakeholder maps, relationship health, tasks, and signals.",
  path: "/key-account-planning-software",
  primaryKeyword: "Key Account Planning Software",
  audience: "Key Account Managers who manage a small number of complex, high-value accounts",
  problem:
    "Key account planning requires depth: people, projects, renewal timing, expansion paths, stakeholder gaps, and relationship cadence. Standard CRM workflows are often optimized for pipeline volume, while static account plans are too easy to abandon. Visioner gives KAMs a planning workspace they can use every day.",
  outcomes: [
    "Manage renewal and expansion work account by account",
    "Map stakeholders, reporting lines, and unknown seats",
    "Keep tasks and relationship follow-ups visible",
    "Use account signals to decide what needs attention next",
  ],
  sections: [
    {
      title: "Built for small portfolios",
      body:
        "KAMs often own only a handful of large accounts. Visioner is optimized for depth inside each account instead of forcing a lead-volume sales workflow.",
      bullets: [
        "Portfolio metrics across key accounts",
        "Account tabs for overview, projects, contacts, org chart, and intelligence",
        "Free plan for the first three accounts",
      ],
    },
    {
      title: "Tie projects to decision chains",
      body:
        "A project is only as strong as the people behind it. Visioner connects projects to stakeholder roles, activities, risks, and relationship health.",
      bullets: [
        "Stakeholder roles per project",
        "Relationship health and last-touch context",
        "Activity and notes tied to the account plan",
      ],
    },
    {
      title: "Make planning lighter",
      body:
        "Visioner avoids mandatory-field pressure. Missing data becomes a useful signal: who is unknown, which relationship is cooling, and which project has gone quiet.",
      bullets: [
        "Soft completion instead of form blocking",
        "Local signals from account data",
        "Task board for urgent and important work",
      ],
    },
  ],
  faq: [
    {
      question: "What should key account planning software help with?",
      answer:
        "It should help with account overview, revenue progress, project status, stakeholder mapping, relationship health, tasks, notes, risks, and account plan updates.",
    },
    {
      question: "Is Visioner a replacement for Salesforce or HubSpot?",
      answer:
        "Visioner can start alongside a traditional CRM. It is designed as the daily account planning workspace for the KAM, not only the system of record for management reporting.",
    },
    {
      question: "Does Visioner require a complete account plan before use?",
      answer:
        "No. You can start with partial data. Missing stakeholders, stale relationships, and incomplete projects become signals to review.",
    },
  ],
};

export const Route = createFileRoute("/key-account-planning-software")({
  head: () => pageHead({
    title: "Key Account Planning Software | Visioner",
    description:
      "Visioner is key account planning software for KAM account overview, projects, stakeholders, org charts, relationship health, tasks, and signals.",
    path: "/key-account-planning-software",
  }),
  component: () => <SeoLandingPage config={page} />,
});
