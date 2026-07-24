import { createFileRoute } from "@tanstack/react-router";

import { GuidePage, type GuidePageConfig } from "../../components/GuidePage";
import { pageHead } from "../../lib/seo";

const guide: GuidePageConfig = {
  eyebrow: "Guide",
  title: "How to map stakeholders in a strategic account",
  description:
    "Stakeholder mapping helps a Key Account Manager see who influences the account, where relationships are weak, and which unknown seats create deal risk.",
  path: "/guides/how-to-map-stakeholders-in-a-strategic-account",
  dateModified: "2026-07-24",
  updatedAt: "Updated July 24, 2026",
  readingTime: "6 min read",
  sources: [
    {
      label: "Asana: Project stakeholder analysis and mapping",
      href: "https://asana.com/resources/project-stakeholder",
      note: "Reference for identifying, categorizing, and planning communication with stakeholders.",
    },
  ],
  summary: [
    "Start with the people you know, then separate reporting lines from project decision roles.",
    "Use unknown stakeholder slots deliberately. An unknown executive sponsor or economic buyer is a visible risk, not an empty field to ignore.",
    "Update the map through real account activity: meetings, emails, org changes, project reviews, and customer introductions.",
  ],
  sections: [
    {
      title: "Separate org structure from decision influence",
      body: [
        "The org chart shows reporting relationships. The stakeholder map shows decision influence. They overlap, but they are not the same thing.",
        "A director may report to a VP but have limited influence on budget approval. A procurement lead may not own the business problem but can slow the deal. A champion may not be senior but can unlock the path to the real buyer.",
      ],
      checklist: [
        "Who reports to whom?",
        "Who owns budget or final approval?",
        "Who can block, accelerate, or quietly influence the project?",
      ],
    },
    {
      title: "Define the roles before naming the people",
      body: [
        "Strategic accounts often have missing information. Instead of forcing a contact into every field, define the roles you need and mark unknown seats clearly.",
        "This makes the risk visible. If the economic buyer is unknown, the next action may be to ask a champion for context. If security is missing, the next action may be to schedule a technical review before procurement.",
      ],
      checklist: [
        "Executive sponsor",
        "Economic buyer",
        "Business owner and technical owner",
        "Procurement, legal, security, champion, blocker, and end users",
      ],
    },
    {
      title: "Track relationship quality, not just contact data",
      body: [
        "A stakeholder map is more useful when it shows relationship health. A name and title are not enough if the contact has not heard from you in six weeks.",
        "KAMs should pay special attention to high-influence contacts with low relationship health, newly promoted stakeholders, and contacts who appear in important projects but have no recent activity.",
      ],
      checklist: [
        "Last meaningful touch",
        "Supportive, neutral, or negative influence",
        "Relationship cadence and next touch",
      ],
    },
    {
      title: "Keep the map editable as the account changes",
      body: [
        "Large accounts change constantly. People move teams, new leaders arrive, and project ownership shifts. A stakeholder map must be easy to edit, or it will stop reflecting the account.",
        "The ideal workflow is visual: add a sibling, add a child, collapse a branch, open a contact, and connect project roles without turning the work into a spreadsheet.",
      ],
      checklist: [
        "Drag or reorganize reporting lines",
        "Collapse sub-teams when the account gets large",
        "Convert missing seats into next actions",
      ],
    },
  ],
  related: [
    { label: "Stakeholder Mapping CRM", href: "/stakeholder-mapping-crm" },
    {
      label: "Strategic Account Management Software",
      href: "/strategic-account-management-software",
    },
    {
      label: "What should an account plan include?",
      href: "/guides/what-should-an-account-plan-include",
    },
  ],
};

export const Route = createFileRoute("/guides/how-to-map-stakeholders-in-a-strategic-account")({
  head: () =>
    pageHead({
      title: "How to Map Stakeholders in a Strategic Account | Visioner",
      description:
        "A practical stakeholder mapping guide for strategic accounts: org structure, decision roles, unknown seats, relationship health, and KAM next actions.",
      path: "/guides/how-to-map-stakeholders-in-a-strategic-account",
      type: "article",
    }),
  component: () => <GuidePage config={guide} />,
});
