import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Strategic Account Management Software",
  title: "Strategic account management software for the operator, not only the forecast.",
  subtitle:
    "Visioner helps strategic account owners manage the moving parts that decide expansion and renewal: projects, relationships, tasks, org charts, risks, and account signals.",
  path: "/strategic-account-management-software",
  primaryKeyword: "Strategic Account Management Software",
  audience: "strategic account owners responsible for renewals, expansion, and executive alignment",
  problem:
    "Strategic account management is not high-volume lead management. It is a long game of coverage, timing, trust, influence, and project execution. Standard CRM dashboards show pipeline, but they rarely show whether the account owner actually has the right relationships and next actions.",
  outcomes: [
    "Run a small portfolio of important accounts",
    "Connect account strategy to daily tasks",
    "Keep track of relationship and stakeholder gaps",
    "Prepare cleaner account updates for leaders",
  ],
  sections: [
    {
      title: "Portfolio clarity",
      body:
        "See the accounts that matter, current ARR, target gap, projected revenue, and active work without opening five disconnected tools.",
      bullets: [
        "Revenue and project overview",
        "Account-level task queue",
        "Signals that point to next actions",
      ],
    },
    {
      title: "Coverage and influence",
      body:
        "Strategic account management depends on knowing who matters, who reports to whom, and which relationships need care.",
      bullets: [
        "Visual org chart",
        "Relationship health indicators",
        "Unknown stakeholders surfaced as risks",
      ],
    },
    {
      title: "Daily execution",
      body:
        "Visioner brings the work back to a daily rhythm: prioritize, follow up, log activity, improve the account map, and turn progress into useful records.",
      bullets: [
        "Task board and weekly progress",
        "Project workspace and activity logs",
        "BCC capture beta for outbound email history",
      ],
    },
  ],
  faq: [
    {
      question: "How is this different from sales pipeline software?",
      answer:
        "Pipeline software tracks opportunities. Strategic account management software also tracks relationships, decision chains, coverage gaps, tasks, and long-term account health.",
    },
    {
      question: "Can a single KAM use Visioner without a team rollout?",
      answer:
        "Yes. The free plan is designed for individual KAMs to start with three accounts before any team process is required.",
    },
    {
      question: "Does Visioner support account planning for renewals and expansion?",
      answer:
        "Yes. Visioner is designed around both renewal risk and expansion planning, especially where multiple stakeholders influence the path forward.",
    },
  ],
};

export const Route = createFileRoute("/strategic-account-management-software")({
  head: () => pageHead({
    title: "Strategic Account Management Software | Visioner",
    description:
      "Strategic account management software for KAMs to manage revenue, projects, org charts, relationship health, tasks, and account signals.",
    path: "/strategic-account-management-software",
  }),
  component: () => <SeoLandingPage config={page} />,
});
