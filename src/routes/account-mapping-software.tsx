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
  audience:
    "KAMs and strategic account owners who need to understand how a customer account really works",
  dateModified: "2026-07-14",
  updatedAt: "Updated July 14, 2026",
  directAnswer:
    "Account mapping software helps a strategic account owner understand how a customer actually works: who reports to whom, which departments and projects connect people, where influence sits, how strong each relationship is, and which important roles are still unknown.",
  problem:
    "A large account is not a flat contact list. It is a changing map of departments, reporting lines, decision roles, champions, blockers, relationship strength, and project-specific influence. Account mapping software should help the account owner see that structure clearly and decide where to act next.",
  outcomes: [
    "Map contacts, departments, reporting lines, and unknown seats",
    "Connect account maps to active projects and decision roles",
    "Track relationship health and last meaningful touch",
    "Turn account gaps into local signals and next actions",
  ],
  evidence: {
    image: "/product-screenshots/visioner-org-chart.png",
    alt: "Visioner account map showing customer reporting lines and relationship health",
    caption:
      "A Visioner account map combines reporting lines with department and relationship-health context. Contacts remain connected to the wider account plan instead of living in an isolated diagram.",
  },
  fit: {
    for: [
      "Strategic accounts with several departments, projects, and decision roles",
      "KAMs who need to expose unknown managers, weak relationships, or missing stakeholders",
      "Account plans where the same contact can influence more than one project",
    ],
    notFor: [
      "A static employee directory with no account or project context",
      "Automatic bulk import of every employee at a customer regardless of relevance",
      "Treating inferred reporting lines as verified facts without KAM review",
    ],
  },
  related: [
    { label: "Customer Org Chart Software", href: "/customer-org-chart-software" },
    { label: "Stakeholder Mapping CRM", href: "/stakeholder-mapping-crm" },
    {
      label: "Account mapping guide for KAMs",
      href: "/guides/account-mapping-guide-for-key-account-managers",
    },
    {
      label: "How to map stakeholders",
      href: "/guides/how-to-map-stakeholders-in-a-strategic-account",
    },
  ],
  sections: [
    {
      title: "More than a contact list",
      body: "Visioner turns account contacts into a working map: who reports to whom, which department they belong to, and which roles they play in the account plan.",
      bullets: [
        "Account-level org chart",
        "Departments and reporting lines",
        "Contact tags, notes, and activity history",
      ],
    },
    {
      title: "Project-aware mapping",
      body: "The same person can matter differently across projects. Visioner lets each project carry stakeholder roles, risks, activities, and relationship context.",
      bullets: [
        "Executive sponsor, economic buyer, champion, blocker, and technical roles",
        "Missing stakeholder seats",
        "Project activity tied to people",
      ],
    },
    {
      title: "Signals for what to do next",
      body: "An account map should guide action. Visioner highlights stale relationships, missing decision roles, quiet projects, and incomplete coverage as local account signals.",
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
  head: () =>
    pageHead({
      title: "Account Mapping Software | Visioner",
      description:
        "Visioner is account mapping software for KAMs to map contacts, org charts, reporting lines, stakeholder roles, relationship health, projects, and account gaps.",
      path: "/account-mapping-software",
      type: "article",
      image: "/product-screenshots/visioner-org-chart.png",
    }),
  component: () => <SeoLandingPage config={page} />,
});
