import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Key Account Manager Tools",
  title: "Key Account Manager tools for the account owner’s daily workflow.",
  subtitle:
    "Visioner gives KAMs a calm workspace for tasks, account plans, stakeholders, projects, relationship health, and signals without turning every update into CRM admin.",
  path: "/key-account-manager-tools",
  primaryKeyword: "Key Account Manager Tools",
  audience:
    "individual KAMs, strategic account managers, and founders who personally work important accounts",
  problem:
    "Most KAMs already use too many tools: CRM for reporting, spreadsheets for account plans, notes for customer context, email for activity history, and memory for relationship cadence. The problem is not a lack of software; it is that the daily account workflow is scattered.",
  outcomes: [
    "Start each day from portfolio priorities and tasks",
    "Keep account plans connected to real projects and people",
    "See relationship health and stale contacts before they become risk",
    "Use completed work as material for weekly updates",
  ],
  sections: [
    {
      title: "A home screen for account work",
      body: "Visioner is designed to be the place a KAM opens first: portfolio status, target gap, project priorities, urgent tasks, and relationship signals across important accounts.",
      bullets: [
        "Portfolio home",
        "Four-quadrant task board",
        "Account overview and project workspaces",
      ],
    },
    {
      title: "Tools for people and projects",
      body: "KAM work is built around people. Visioner keeps contacts, stakeholders, decision roles, org chart, projects, and activity history connected inside each account.",
      bullets: [
        "Contacts and relationship health",
        "Stakeholder roles and decision chains",
        "Org chart and missing coverage signals",
      ],
    },
    {
      title: "Less switching, less re-entry",
      body: "The best KAM tool should reduce repeated input. Visioner turns tasks, notes, and captured email activity into account context that can support account reviews later.",
      bullets: [
        "Soft completion instead of required-field anxiety",
        "Weekly progress from completed tasks",
        "BCC Capture for outbound email logging",
      ],
    },
  ],
  faq: [
    {
      question: "What tools does a Key Account Manager need?",
      answer:
        "A KAM needs account planning, project tracking, stakeholder mapping, org chart visibility, relationship reminders, task management, activity history, and reporting support.",
    },
    {
      question: "Can Visioner replace a task app or notes app?",
      answer:
        "For account-specific work, Visioner can centralize tasks, notes, contacts, and project context. It is not meant to replace every personal productivity tool.",
    },
    {
      question: "Is Visioner useful if my company already has a CRM?",
      answer:
        "Yes. Visioner can sit next to the company CRM as the KAM's daily account planning workspace while the corporate CRM remains the system of record.",
    },
  ],
};

export const Route = createFileRoute("/key-account-manager-tools")({
  head: () =>
    pageHead({
      title: "Key Account Manager Tools | Visioner",
      description:
        "Visioner gives Key Account Managers tools for account planning, stakeholders, projects, tasks, relationship health, signals, and activity capture.",
      path: "/key-account-manager-tools",
    }),
  component: () => <SeoLandingPage config={page} />,
});
