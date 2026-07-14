import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Customer Org Chart Software",
  title: "Customer org chart software for account owners who need the real decision map.",
  subtitle:
    "Visioner helps Key Account Managers build customer org charts with reporting lines, departments, stakeholder roles, relationship health, and project context.",
  path: "/customer-org-chart-software",
  primaryKeyword: "Customer Org Chart Software",
  audience:
    "KAMs who need to understand customer structure, reporting lines, and decision influence inside strategic accounts",
  dateModified: "2026-07-14",
  updatedAt: "Updated July 14, 2026",
  directAnswer:
    "Customer org chart software gives account teams a visual map of reporting lines, departments, stakeholder roles, and relationship coverage inside a customer. For KAMs, the useful version connects that hierarchy to projects and next actions instead of stopping at a static company diagram.",
  problem:
    "A customer org chart is not just a diagram. For a Key Account Manager, it should show who reports to whom, which contacts matter for each project, which roles are unknown, whose relationship is cooling, and where the next action should happen. Visioner makes the customer org chart part of the account plan instead of a static side artifact.",
  outcomes: [
    "Create an org chart for each strategic account",
    "Show reporting lines, departments, and unknown seats",
    "Connect org chart contacts to projects and stakeholder roles",
    "Use relationship health to decide who needs attention",
  ],
  evidence: {
    image: "/product-screenshots/visioner-org-chart.png",
    alt: "Visioner customer org chart with reporting lines, departments, and relationship health",
    caption:
      "Visioner's customer org chart displays reporting lines and relationship status in the account workspace. The KAM can keep the chart focused on relevant contacts rather than importing an entire company directory.",
  },
  fit: {
    for: [
      "Customer hierarchies that change often or span several buying departments",
      "KAMs who need reporting structure and project influence in the same account plan",
      "Teams that want unknown roles to remain visible until they are verified",
    ],
    notFor: [
      "Publishing a complete private employee directory",
      "Assuming job title alone determines buying influence",
      "Replacing user review with unverified third-party organization data",
    ],
  },
  related: [
    { label: "Account Mapping Software", href: "/account-mapping-software" },
    { label: "Relationship Mapping Software", href: "/relationship-mapping-software" },
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
      title: "Org chart inside the account plan",
      body: "Visioner treats the customer org chart as part of daily account work. Contacts, departments, reporting lines, tasks, notes, and projects stay connected.",
      bullets: [
        "Account-level org chart view",
        "Department and report-to structure",
        "Contact detail and activity history",
      ],
    },
    {
      title: "Decision roles beyond hierarchy",
      body: "The person with the title is not always the person with influence. Visioner lets projects carry roles like economic buyer, executive sponsor, champion, blocker, technical owner, and procurement.",
      bullets: [
        "Project-specific stakeholder roles",
        "Unknown executive or buyer placeholders",
        "Risks tied to missing decision coverage",
      ],
    },
    {
      title: "Relationship health on the map",
      body: "A useful org chart should show relationship context. Visioner highlights stale contacts, weak coverage, and relationship reminders so the KAM can act before a project stalls.",
      bullets: [
        "Last meaningful touch context",
        "Relationship health indicators",
        "Local signals for stale or missing relationships",
      ],
    },
  ],
  faq: [
    {
      question: "What is customer org chart software?",
      answer:
        "Customer org chart software helps account teams visualize contacts, reporting lines, departments, stakeholder roles, and relationship coverage inside a customer account.",
    },
    {
      question: "How is a customer org chart useful for KAMs?",
      answer:
        "It helps KAMs understand who influences decisions, who reports to whom, which roles are missing, and which relationships need attention before renewal or expansion work gets stuck.",
    },
    {
      question: "Can Visioner show unknown people in the org chart?",
      answer:
        "Yes. Visioner can represent unknown managers, missing executive sponsors, or empty decision roles as placeholders, turning incomplete information into account signals.",
    },
  ],
};

export const Route = createFileRoute("/customer-org-chart-software")({
  head: () =>
    pageHead({
      title: "Customer Org Chart Software | Visioner",
      description:
        "Visioner is customer org chart software for KAMs to map reporting lines, departments, stakeholder roles, relationship health, and project decision coverage.",
      path: "/customer-org-chart-software",
    }),
  component: () => <SeoLandingPage config={page} />,
});
