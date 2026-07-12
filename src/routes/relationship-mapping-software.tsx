import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Relationship Mapping Software",
  title: "Relationship mapping software for strategic account work.",
  subtitle:
    "Visioner helps account owners see who matters, who influences whom, which relationships are healthy, and where the decision chain still has gaps.",
  path: "/relationship-mapping-software",
  primaryKeyword: "Relationship Mapping Software",
  audience: "KAMs and strategic account owners who need stakeholder visibility inside complex customer organizations",
  problem:
    "In large accounts, relationship risk is often invisible until a deal stalls or renewal pressure appears. The account owner may know a few friendly contacts, but not the reporting lines, missing decision roles, blockers, or executive sponsors. Visioner turns relationship mapping into part of the account plan.",
  outcomes: [
    "Visualize account relationships and reporting lines",
    "Track relationship health and last meaningful touch",
    "Spot missing decision roles before they become project risks",
    "Use relationship signals to decide the next account action",
  ],
  sections: [
    {
      title: "Org chart plus account context",
      body:
        "Visioner connects org chart structure to contacts, departments, reporting lines, and account work so the relationship map stays useful beyond a diagram.",
      bullets: [
        "Account-level org chart",
        "Reporting lines and unknown seats",
        "Contact details, tags, and activity history",
      ],
    },
    {
      title: "Relationship health at a glance",
      body:
        "The relationship map should show more than names and titles. Visioner uses relationship health and cadence reminders to highlight which contacts need attention.",
      bullets: [
        "Health indicator per contact",
        "Last meaningful touch context",
        "Signals for stale relationships",
      ],
    },
    {
      title: "Decision coverage by project",
      body:
        "Different projects need different people. Visioner lets projects carry their own stakeholder roles, so the account owner can see whether the right decision chain is covered.",
      bullets: [
        "Executive sponsor, buyer, champion, blocker, and technical roles",
        "Project-specific risks and activities",
        "Missing-seat signals for incomplete coverage",
      ],
    },
  ],
  faq: [
    {
      question: "What is relationship mapping software?",
      answer:
        "Relationship mapping software helps account teams visualize contacts, reporting lines, influence, stakeholder roles, relationship health, and gaps inside a customer account.",
    },
    {
      question: "How is relationship mapping different from an org chart?",
      answer:
        "An org chart shows structure. Relationship mapping also shows influence, health, role coverage, risks, and the next actions needed to improve coverage.",
    },
    {
      question: "Can Visioner map relationships without perfect data?",
      answer:
        "Yes. Unknown contacts and incomplete reporting lines can be represented as placeholders and turned into account signals.",
    },
  ],
};

export const Route = createFileRoute("/relationship-mapping-software")({
  head: () => pageHead({
    title: "Relationship Mapping Software | Visioner",
    description:
      "Visioner is relationship mapping software for strategic accounts: org charts, stakeholder roles, relationship health, reporting lines, and account signals.",
    path: "/relationship-mapping-software",
  }),
  component: () => <SeoLandingPage config={page} />,
});
