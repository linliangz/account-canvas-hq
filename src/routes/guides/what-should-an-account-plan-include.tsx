import { createFileRoute } from "@tanstack/react-router";

import { GuidePage, type GuidePageConfig } from "../../components/GuidePage";
import { pageHead } from "../../lib/seo";

const guide: GuidePageConfig = {
  eyebrow: "Guide",
  title: "What should an account plan include?",
  description:
    "A practical account plan should help a Key Account Manager decide what to do next, not just produce a static document for a quarterly review.",
  path: "/guides/what-should-an-account-plan-include",
  dateModified: "2026-07-24",
  updatedAt: "Updated July 24, 2026",
  readingTime: "5 min read",
  sources: [
    {
      label: "Gartner: Account Management Strategy Guide",
      href: "https://www.gartner.com/en/sales/topics/account-management-and-growth",
      note: "Account-planning context, including customer-centered planning and active plan use.",
    },
    {
      label: "McKinsey: How to unlock growth in the largest accounts",
      href: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/how-to-unlock-growth-in-the-largest-accounts",
      note: "Research context for relationship continuity and coordinated engagement in large accounts.",
    },
  ],
  summary: [
    "A useful account plan starts with revenue context: current ARR, target ARR, renewal timing, projected expansion, and the gap to target.",
    "The plan needs a living project view, a stakeholder map, relationship health, risks, and the next actions that move the account forward.",
    "The best account plan is updated through daily work: tasks completed, emails logged, stakeholder changes, and project notes.",
  ],
  sections: [
    {
      title: "Start with the business question",
      body: [
        "Most account plans become stale because they start as templates. The more useful question is simpler: what does the account owner need to know today to protect and grow this customer?",
        "For a KAM, that usually means revenue position, active projects, decision coverage, relationship health, and a small set of actions that deserve attention this week.",
      ],
      checklist: [
        "Current ARR or recurring revenue baseline",
        "Target ARR and gap to target",
        "Renewal date, expansion path, and top project risks",
      ],
    },
    {
      title: "Map projects to people",
      body: [
        "Strategic account work is rarely one opportunity with one buyer. A single account may have renewal, expansion, pilot, security, procurement, and executive alignment workstreams running at the same time.",
        "Every meaningful project should include the stakeholders who influence it: executive sponsor, economic buyer, champion, blocker, procurement, legal, security, technical owner, business owner, and end users.",
      ],
      checklist: [
        "Active projects and expected revenue impact",
        "Decision roles for each project",
        "Unknown seats shown as risks instead of hidden blanks",
      ],
    },
    {
      title: "Make relationship health operational",
      body: [
        "A relationship plan is not just a list of contacts. It should show who was contacted recently, which important contacts are going cold, and where the account owner has no relationship at all.",
        "For account planning, relationship health is useful when it creates a next action: follow up, ask for an intro, refresh a stakeholder title, or plan a meeting before a renewal window.",
      ],
      checklist: [
        "Last meaningful touch for each key contact",
        "Cadence reminders for strategic relationships",
        "Signals for stale contacts and missing senior coverage",
      ],
    },
    {
      title: "Turn the plan into a weekly operating rhythm",
      body: [
        "A strong account plan should not require a separate reporting ritual. It should be built from the work the KAM already does: tasks, notes, meetings, emails, and decisions.",
        "That is the reason Visioner treats the account plan as a daily workspace. The output for leadership can come later, but the source of truth should be where the KAM actually works.",
      ],
      checklist: [
        "Tasks organized by urgency and importance",
        "Completed work archived into weekly progress",
        "Activity history connected to account, project, and contact",
      ],
    },
  ],
  related: [
    { label: "Account Plan Template", href: "/account-plan-template" },
    { label: "Account Planning CRM", href: "/account-planning-crm" },
    { label: "CRM for Key Account Managers", href: "/crm-for-key-account-managers" },
  ],
};

export const Route = createFileRoute("/guides/what-should-an-account-plan-include")({
  head: () =>
    pageHead({
      title: "What Should an Account Plan Include? | Visioner",
      description:
        "A practical guide to what an account plan should include for Key Account Managers: revenue, projects, stakeholders, relationship health, risks, and next actions.",
      path: "/guides/what-should-an-account-plan-include",
      type: "article",
    }),
  component: () => <GuidePage config={guide} />,
});
