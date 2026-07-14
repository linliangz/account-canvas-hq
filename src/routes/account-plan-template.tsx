import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Account Plan Template",
  title: "An account plan template that becomes daily work.",
  subtitle:
    "Visioner gives KAMs the structure of an account plan template without trapping the plan in a static slide: revenue, projects, stakeholders, tasks, risks, notes, and relationship health stay connected.",
  path: "/account-plan-template",
  primaryKeyword: "Account Plan Template",
  audience:
    "KAMs and founders who need a practical strategic account plan they will actually update",
  problem:
    "Most account plan templates are useful once and stale a week later. They ask the right questions but live outside the account owner's daily workflow. Visioner turns the template into a living workspace where project updates, relationship touches, and completed tasks keep the plan current.",
  outcomes: [
    "Start from a clear account plan structure",
    "Update projects and stakeholders during daily work",
    "Capture notes, risks, tasks, and relationship health together",
    "Use completed activity as material for weekly or manager updates",
  ],
  sections: [
    {
      title: "What a useful account plan needs",
      body: "A practical account plan should answer: where are we against target, which projects matter, who influences the decision, what risks exist, and what action comes next?",
      bullets: [
        "Revenue target and gap",
        "Active projects and next steps",
        "Stakeholder coverage and relationship health",
      ],
    },
    {
      title: "From template to operating rhythm",
      body: "Visioner keeps the plan close to the work. Tasks, notes, project activity, and email logs become the evidence behind the account plan.",
      bullets: [
        "Four-quadrant task board",
        "Project activity and notes",
        "Weekly progress from completed work",
      ],
    },
    {
      title: "No required-field anxiety",
      body: "A good template should guide thinking, not block progress. Visioner uses soft completion: missing fields become signals instead of errors.",
      bullets: [
        "Unknown economic buyer",
        "Missing executive sponsor",
        "Stale relationship or quiet account",
      ],
    },
  ],
  faq: [
    {
      question: "Can Visioner replace my account plan slide deck?",
      answer:
        "Visioner can become the working source for the plan. You may still export or summarize it into a deck for leadership reviews later.",
    },
    {
      question: "What should an account plan include?",
      answer:
        "At minimum: account overview, revenue target, active projects, stakeholders, decision roles, relationship health, risks, tasks, and next steps.",
    },
    {
      question: "Is this useful before I have complete data?",
      answer:
        "Yes. In strategic accounts, incomplete information is normal. Visioner helps you see the gaps and decide what to learn next.",
    },
  ],
};

export const Route = createFileRoute("/account-plan-template")({
  head: () =>
    pageHead({
      title: "Account Plan Template for KAMs | Visioner",
      description:
        "A practical account plan template for KAMs: revenue, projects, stakeholders, tasks, risks, relationship health, and account signals in Visioner.",
      path: "/account-plan-template",
    }),
  component: () => <SeoLandingPage config={page} />,
});
