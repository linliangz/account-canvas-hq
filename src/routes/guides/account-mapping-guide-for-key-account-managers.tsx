import { createFileRoute } from "@tanstack/react-router";

import { GuidePage, type GuidePageConfig } from "../../components/GuidePage";
import { pageHead } from "../../lib/seo";

const guide: GuidePageConfig = {
  eyebrow: "Guide",
  title: "Account Mapping Guide for Key Account Managers",
  description:
    "A practical guide for Key Account Managers on building account maps with customer org charts, stakeholder roles, reporting lines, relationship health, projects, and next actions.",
  path: "/guides/account-mapping-guide-for-key-account-managers",
  dateModified: "2026-07-12",
  updatedAt: "Updated July 2026",
  readingTime: "7 min read",
  summary: [
    "An account map is not a contact list. It connects customer structure, decision roles, relationship health, projects, and next actions.",
    "The most useful account maps show both known relationships and unknown seats, so a KAM can see where coverage is weak.",
    "A living account map should become part of daily work: planning follow-ups, preparing meetings, logging activity, and reducing project risk.",
  ],
  sections: [
    {
      title: "Start with account structure",
      body: [
        "Begin with the customer organization, not the opportunity forecast. For a strategic account, the first question is usually: who sits where, who reports to whom, and which teams matter to the account plan?",
        "A good customer org chart should make departments, reporting lines, known contacts, and unknown seats visible without forcing the KAM to complete every field before the map becomes useful.",
      ],
      checklist: [
        "Map departments such as finance, IT, procurement, legal, operations, security, and business units.",
        "Add reporting lines when they are known, and leave explicit unknown manager or peer seats when they are not.",
        "Keep partial information visible. Incomplete account knowledge should become a signal, not a blocker.",
      ],
    },
    {
      title: "Layer project stakeholders on top",
      body: [
        "Org structure and project influence are related, but they are not the same map. The customer org chart explains hierarchy. The stakeholder map explains how a specific project will be approved, blocked, funded, reviewed, and adopted.",
        "For each active project, define the roles you need before assigning contacts. This prevents a common mistake: assuming the person you know best is also the person who controls the decision.",
      ],
      checklist: [
        "Identify executive sponsor, economic buyer, champion, blocker, business owner, technical owner, procurement, legal, security, and end users.",
        "Show unknown roles explicitly, such as Unknown Executive Sponsor or Unknown Security Owner.",
        "Connect each role back to the broader customer org chart so decision risk is grounded in real account structure.",
      ],
    },
    {
      title: "Add relationship health",
      body: [
        "A map of names and titles quickly becomes stale. Relationship health turns the map into a working surface by showing which people have recent meaningful activity and which relationships need attention.",
        "This is especially important for Key Account Managers because relationship coverage often creates opportunity before a project exists. A stale relationship with a high-influence contact is not just a networking gap; it can become revenue risk.",
      ],
      checklist: [
        "Track last meaningful touch, relationship cadence, and relationship strength.",
        "Prioritize high-influence contacts with low relationship health.",
        "Use relationship reminders to keep important contacts warm before an urgent project appears.",
      ],
    },
    {
      title: "Turn gaps into next actions",
      body: [
        "The point of account mapping is not to create a beautiful diagram. The point is to decide what to do next. Unknown seats, stale contacts, weak executive coverage, and missing procurement context should become tasks or account signals.",
        "For a KAM, this keeps planning practical. Instead of reporting that coverage is incomplete, the account plan can show a concrete next step: ask the champion for an intro, confirm the reporting line, schedule a technical review, or follow up before the QBR.",
      ],
      checklist: [
        "Convert unknown stakeholder roles into follow-up tasks.",
        "Flag stale relationships when important contacts pass the expected cadence.",
        "Review gaps before major meetings, renewals, proposals, and procurement steps.",
      ],
    },
    {
      title: "Keep the map alive",
      body: [
        "Large accounts change constantly. People move, teams reorganize, budgets shift, and new stakeholders appear. An account map is only valuable if it is easy enough to update during normal account work.",
        "That is why a KAM-friendly account map should connect activity logs, BCC email capture, contact updates, project notes, and account signals. The map should improve as the KAM works, not become another separate CRM chore.",
      ],
      checklist: [
        "Review account maps during weekly planning and before customer meetings.",
        "Use email and meeting activity to refresh relationship health automatically where possible.",
        "Keep old assumptions visible until they are confirmed or replaced.",
      ],
    },
  ],
  related: [
    { label: "Account Mapping Software", href: "/account-mapping-software" },
    { label: "Customer Org Chart Software", href: "/customer-org-chart-software" },
    { label: "Stakeholder Mapping CRM", href: "/stakeholder-mapping-crm" },
    { label: "Relationship Mapping Software", href: "/relationship-mapping-software" },
    {
      label: "How to map stakeholders",
      href: "/guides/how-to-map-stakeholders-in-a-strategic-account",
    },
  ],
};

export const Route = createFileRoute("/guides/account-mapping-guide-for-key-account-managers")({
  head: () =>
    pageHead({
      title: "Account Mapping Guide for Key Account Managers | Visioner",
      description:
        "A practical account mapping guide for Key Account Managers: customer org charts, stakeholder roles, reporting lines, relationship health, projects, and next actions.",
      path: "/guides/account-mapping-guide-for-key-account-managers",
      type: "article",
    }),
  component: () => <GuidePage config={guide} />,
});
