import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Account Planning Software",
  title: "Account planning software that stays close to the daily work.",
  subtitle:
    "Visioner helps account owners manage account plans, revenue targets, active projects, stakeholder coverage, relationship health, tasks, and account signals without living in spreadsheets.",
  path: "/account-planning-software",
  primaryKeyword: "Account Planning Software",
  audience: "KAMs, founders, and strategic account owners who need account plans to guide real action",
  problem:
    "Most account planning software is either a static template or a heavy CRM add-on. The account plan looks polished during review, then drifts away from daily work. Visioner keeps the plan connected to projects, contacts, tasks, activity, and relationship health so the account plan improves as the account owner works.",
  outcomes: [
    "Turn account plans into a daily workspace",
    "Keep revenue, projects, stakeholders, and tasks connected",
    "Surface incomplete stakeholder coverage as signals",
    "Prepare cleaner account reviews from work already captured",
  ],
  sections: [
    {
      title: "Start with the account",
      body:
        "Visioner starts from the account overview: current ARR, target gap, active projects, urgent tasks, relationship reminders, and local account signals.",
      bullets: [
        "Portfolio home across key accounts",
        "Account overview for revenue and work in progress",
        "Project, contact, and task context in one workspace",
      ],
    },
    {
      title: "Make the people visible",
      body:
        "Strategic accounts move through people, influence, reporting lines, and timing. Visioner gives the account plan a living stakeholder map instead of hiding relationships in notes.",
      bullets: [
        "Org chart and reporting lines",
        "Decision roles per project",
        "Unknown stakeholder seats and relationship gaps",
      ],
    },
    {
      title: "Reduce account plan upkeep",
      body:
        "The best account plan is the one the account owner actually updates. Visioner uses optional fields, soft completion, task progress, and email activity capture to reduce manual reporting.",
      bullets: [
        "Optional fields instead of hard blockers",
        "Tasks and weekly progress as planning evidence",
        "BCC capture beta for outbound activity logging",
      ],
    },
  ],
  faq: [
    {
      question: "What is account planning software?",
      answer:
        "Account planning software helps account owners manage revenue goals, projects, stakeholders, risks, relationship coverage, activity, and next actions for strategic accounts.",
    },
    {
      question: "How is Visioner different from an account plan template?",
      answer:
        "A template is a snapshot. Visioner is a working canvas that updates as projects, contacts, tasks, signals, and relationship activity change.",
    },
    {
      question: "Can Visioner be used by one person before a team rollout?",
      answer:
        "Yes. Visioner is designed to start with an individual KAM or founder managing a small portfolio of high-value accounts.",
    },
  ],
};

export const Route = createFileRoute("/account-planning-software")({
  head: () => pageHead({
    title: "Account Planning Software | Visioner",
    description:
      "Visioner is account planning software for revenue targets, active projects, stakeholder coverage, relationship health, tasks, and account signals.",
    path: "/account-planning-software",
  }),
  component: () => <SeoLandingPage config={page} />,
});
