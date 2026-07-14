import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Key Account Management Software",
  title: "Key account management software for relationship-led revenue.",
  subtitle:
    "Visioner helps KAMs manage strategic accounts through account plans, projects, stakeholder maps, relationship health, tasks, and local account signals.",
  path: "/key-account-management-software",
  primaryKeyword: "Key Account Management Software",
  audience:
    "Key Account Managers who own renewal, expansion, stakeholder coverage, and executive relationships",
  problem:
    "Key account management is not the same as high-volume sales pipeline management. A KAM needs to understand people, influence, timing, renewal risk, expansion projects, and relationship health across a small number of important accounts. Standard CRM views often hide that work behind opportunity fields.",
  outcomes: [
    "Run a small portfolio of strategic accounts in depth",
    "Connect revenue targets to projects and relationship coverage",
    "Track org charts, stakeholders, tasks, and account signals together",
    "Create cleaner account updates from work already captured",
  ],
  sections: [
    {
      title: "Designed for account depth",
      body: "Visioner is built for KAMs who manage a few complex accounts, not hundreds of leads. The workspace starts from account context, relationship coverage, project status, and next actions.",
      bullets: [
        "Portfolio home for account-level priorities",
        "Account overview for revenue and active work",
        "Project workspaces for renewal and expansion motions",
      ],
    },
    {
      title: "Make stakeholder coverage visible",
      body: "Large accounts move through committees, influencers, and reporting lines. Visioner makes stakeholder roles, unknown seats, and relationship health visible before gaps become surprises.",
      bullets: [
        "Visual org chart per account",
        "Decision roles tied to projects",
        "Relationship health and cadence reminders",
      ],
    },
    {
      title: "Reduce CRM busywork",
      body: "The goal is to turn daily account work into useful records without forcing the KAM to maintain a separate reporting database.",
      bullets: [
        "Task board and weekly progress",
        "Optional fields and soft completion",
        "BCC Capture for outbound email activity",
      ],
    },
  ],
  faq: [
    {
      question: "What should key account management software include?",
      answer:
        "It should include account overview, revenue targets, active projects, stakeholder mapping, org chart, relationship health, tasks, notes, risks, and activity history.",
    },
    {
      question: "How is Visioner different from a standard CRM?",
      answer:
        "Visioner is account-first and relationship-first. Standard CRMs often focus on opportunity records and manager reporting, while Visioner focuses on daily KAM work.",
    },
    {
      question: "Can one KAM use Visioner before a team rollout?",
      answer:
        "Yes. Visioner starts as a self-serve workspace for individual KAMs and founders managing a small number of high-value accounts.",
    },
  ],
};

export const Route = createFileRoute("/key-account-management-software")({
  head: () =>
    pageHead({
      title: "Key Account Management Software | Visioner",
      description:
        "Visioner is key account management software for KAMs to manage account plans, stakeholders, projects, tasks, relationship health, and account signals.",
      path: "/key-account-management-software",
    }),
  component: () => <SeoLandingPage config={page} />,
});
