import { createFileRoute } from "@tanstack/react-router";

import { SeoLandingPage, type SeoLandingPageConfig } from "../components/SeoLandingPage";
import { pageHead } from "../lib/seo";

const page: SeoLandingPageConfig = {
  eyebrow: "Stakeholder Mapping CRM",
  title: "Stakeholder mapping CRM for complex account decisions.",
  subtitle:
    "Visioner helps KAMs map org charts, decision roles, unknown seats, relationship health, and project stakeholders so the account plan reflects how decisions really happen.",
  path: "/stakeholder-mapping-crm",
  primaryKeyword: "Stakeholder Mapping CRM",
  audience: "KAMs working accounts where buying committees, reporting lines, and influence paths matter",
  problem:
    "Complex deals are rarely decided by one contact. The sponsor, business owner, economic buyer, procurement team, legal team, IT, security, champion, and blocker can all change the outcome. A stakeholder mapping CRM makes those people and gaps visible before they surprise the deal.",
  outcomes: [
    "Map contacts, unknown roles, and reporting lines",
    "Tie stakeholders to projects and decision roles",
    "See which relationships are warm, cooling, or stale",
    "Turn missing stakeholders into account signals",
  ],
  sections: [
    {
      title: "Org chart as a working surface",
      body:
        "Visioner treats the org chart as a core account planning view, not an optional CRM decoration.",
      bullets: [
        "Reporting lines and department context",
        "Known contacts and placeholder seats",
        "Relationship health inside the map",
      ],
    },
    {
      title: "Decision chain by project",
      body:
        "Different projects inside the same account can have different stakeholders. Visioner connects people to the workstream where they matter.",
      bullets: [
        "Executive sponsor",
        "Economic buyer",
        "Business, technical, procurement, legal, and security roles",
      ],
    },
    {
      title: "Signals from missing coverage",
      body:
        "Stakeholder mapping is useful because it reveals what is missing. Visioner turns unknown roles and cooling relationships into prompts for action.",
      bullets: [
        "Unknown decision maker",
        "No champion assigned",
        "High-value project with weak executive coverage",
      ],
    },
  ],
  faq: [
    {
      question: "What is stakeholder mapping in CRM?",
      answer:
        "Stakeholder mapping identifies the people, roles, relationships, influence paths, and gaps that affect an account or project decision.",
    },
    {
      question: "Can I add unknown stakeholders?",
      answer:
        "Yes. Visioner is designed to represent unknown seats as risks, so incomplete information becomes visible instead of hidden.",
    },
    {
      question: "Does stakeholder mapping help with renewals?",
      answer:
        "Yes. Renewals often fail when the account owner relies on one friendly contact while economic, legal, procurement, or executive stakeholders are not mapped.",
    },
  ],
};

export const Route = createFileRoute("/stakeholder-mapping-crm")({
  head: () => pageHead({
    title: "Stakeholder Mapping CRM | Visioner",
    description:
      "Visioner is a stakeholder mapping CRM for org charts, decision roles, relationship health, project stakeholders, and account planning signals.",
    path: "/stakeholder-mapping-crm",
  }),
  component: () => <SeoLandingPage config={page} />,
});
