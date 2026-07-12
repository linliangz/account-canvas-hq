import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Account Mapping Software",
  title: "Account mapping software for complex customer relationships.",
  subtitle:
    "Visioner helps Key Account Managers map accounts by people, projects, reporting lines, stakeholder roles, relationship health, and next actions.",
  path: "/account-mapping-software",
  primaryKeyword: "Account Mapping Software",
  audience: "KAMs and strategic account owners who need to understand how a customer account really works",
  problem:
    "A large account is not a flat contact list. It is a changing map of departments, reporting lines, decision roles, champions, blockers, relationship strength, and project-specific influence. Account mapping software should help the account owner see that structure clearly and decide where to act next.",
  outcomes: [
    "Map contacts, departments, reporting lines, and unknown seats",
    "Connect account maps to active projects and decision roles",
    "Track relationship health and last meaningful touch",
    "Turn account gaps into local signals and next actions",
  ],
  sections: [
    {
      title: "More than a contact list",
      body:
        "Visioner turns account contacts into a working map: who reports to whom, which department they belong to, and which roles they play in the account plan.",
      bullets: [
        "Account-level org chart",
        "Departments and reporting lines",
        "Contact tags, notes, and activity history",
      ],
    },
    {
      title: "Project-aware mapping",
      body:
        "The same person can matter differently across projects. Visioner lets each project carry stakeholder roles, risks, activities, and relationship context.",
      bullets: [
        "Executive sponsor, economic buyer, champion, blocker, and technical roles",
        "Missing stakeholder seats",
        "Project activity tied to people",
      ],
    },
    {
      title: "Signals for what to do next",
      body:
        "An account map should guide action. Visioner highlights stale relationships, missing decision roles, quiet projects, and incomplete coverage as local account signals.",
      bullets: [
        "Relationship health reminders",
        "Unknown manager or decision maker signals",
        "Tasks connected to account coverage gaps",
      ],
    },
  ],
  faq: [
    {
      question: "What is account mapping software?",
      answer:
        "Account mapping software helps account owners visualize contacts, departments, reporting lines, stakeholder roles, relationship health, project influence, and account coverage gaps.",
    },
    {
      question: "How is account mapping different from stakeholder mapping?",
      answer:
        "Stakeholder mapping usually focuses on a decision or project. Account mapping is broader: it shows the customer account structure, relationships, roles, projects, and gaps over time.",
    },
    {
      question: "Can Visioner show unknown contacts in an account map?",
      answer:
        "Yes. Unknown managers, missing executive sponsors, or empty decision roles can be represented as placeholders so the KAM can see and resolve the gap later.",
    },
  ],
};

export const Route = createFileRoute("/account-mapping-software")({
  head: () => pageHead({
    title: "Account Mapping Software | Visioner",
    description:
      "Visioner is account mapping software for KAMs to map contacts, org charts, reporting lines, stakeholder roles, relationship health, projects, and account gaps.",
    path: "/account-mapping-software",
  }),
  component: () => <SeoLandingPage config={page} />,
});
