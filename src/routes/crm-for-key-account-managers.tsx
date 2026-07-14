import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "CRM for Key Account Managers",
  title: "A CRM for Key Account Managers who actually work the account.",
  subtitle:
    "Visioner gives KAMs a daily workspace for account plans, projects, stakeholders, relationship health, tasks, and signals without forcing every update through a rigid pipeline form.",
  path: "/crm-for-key-account-managers",
  primaryKeyword: "CRM for Key Account Managers",
  audience: "Key Account Managers managing a small number of high-value strategic accounts",
  dateModified: "2026-07-14",
  updatedAt: "Updated July 14, 2026",
  directAnswer:
    "A CRM for Key Account Managers should help an account owner run a small number of complex customers every day. It should connect revenue goals, projects, stakeholders, relationship health, tasks, and account signals without turning the KAM's workspace into another pipeline reporting form.",
  problem:
    "Most CRMs were designed to help managers inspect pipeline, forecast revenue, and standardize reporting. KAMs need something different: a practical workspace that helps them decide who to contact, which project needs attention, where the relationship risk is, and what to do next inside a complex account.",
  outcomes: [
    "Manage 3-5 strategic accounts in depth",
    "Track projects, stakeholders, tasks, and relationship health together",
    "Turn missing roles and stale relationships into account signals",
    "Keep Salesforce or HubSpot as the record system if your company already uses one",
  ],
  evidence: {
    image: "/product-screenshots/visioner-portfolio-home.png",
    alt: "Visioner portfolio workspace showing revenue progress and projects across strategic accounts",
    caption:
      "Visioner's portfolio workspace keeps revenue progress and active account work together, then lets the KAM move into the project, contact, task, or org-chart context that needs attention.",
  },
  fit: {
    for: [
      "KAMs responsible for a few strategic accounts with long, multi-stakeholder buying cycles",
      "Account owners who need a daily workspace alongside an existing corporate CRM",
      "Renewal and expansion work where relationship coverage matters as much as pipeline stage",
    ],
    notFor: [
      "High-volume outbound prospecting, marketing automation, or lead scoring",
      "Replacing an enterprise CRM's finance, territory, or compensation workflows",
      "Managers who only need a roll-up forecast and do not work individual accounts",
    ],
  },
  related: [
    { label: "Account Planning CRM", href: "/account-planning-crm" },
    {
      label: "A KAM's daily workflow",
      href: "/guides/key-account-manager-daily-workflow",
    },
    {
      label: "Traditional CRM vs Account Planning CRM",
      href: "/traditional-crm-vs-account-planning-crm",
    },
    {
      label: "How to choose KAM software",
      href: "/guides/how-to-choose-key-account-management-software",
    },
  ],
  sections: [
    {
      title: "Built around the KAM day",
      body: "Visioner starts from the account owner's daily questions instead of a manager's forecast review. What matters today? Which project has risk? Which stakeholder has gone quiet?",
      bullets: [
        "Portfolio home for revenue and priority work",
        "Task board for urgent and important account actions",
        "Weekly progress from completed work",
      ],
    },
    {
      title: "Relationship-first account planning",
      body: "Strategic account work usually fails because the real decision chain is incomplete. Visioner makes stakeholders, decision roles, org chart gaps, and relationship health visible.",
      bullets: [
        "Org chart and stakeholder coverage",
        "Relationship health and cadence reminders",
        "Unknown seats and missing decision roles",
      ],
    },
    {
      title: "Less CRM data entry",
      body: "The goal is to reduce the feeling of 'feeding the CRM.' Visioner turns everyday work into useful account records: tasks, project notes, BCC email activity, and account signals.",
      bullets: [
        "Optional fields instead of blocking required forms",
        "BCC capture beta for outbound email logging",
        "Account signals from your own workspace data",
      ],
    },
  ],
  faq: [
    {
      question: "Is Visioner a replacement for Salesforce?",
      answer:
        "Not necessarily. Many teams can keep Salesforce as the official system of record while using Visioner as the daily account planning CRM for KAMs.",
    },
    {
      question: "Who is this best for?",
      answer:
        "Visioner is best for individual KAMs, Strategic Account Managers, founders, and account owners who manage a small number of complex, high-value accounts.",
    },
    {
      question: "Why not just use a normal CRM view?",
      answer:
        "A normal CRM view is usually opportunity-first and reporting-first. Visioner is account-first and relationship-first, so the work starts from people, projects, tasks, and account risks.",
    },
  ],
};

export const Route = createFileRoute("/crm-for-key-account-managers")({
  head: () =>
    pageHead({
      title: "CRM for Key Account Managers | Visioner",
      description:
        "Visioner is an account planning CRM for Key Account Managers who manage strategic accounts, stakeholders, projects, tasks, and relationship health.",
      path: "/crm-for-key-account-managers",
    }),
  component: () => <SeoLandingPage config={page} />,
});
