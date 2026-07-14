import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const linksPath = process.env.SEO_GROWTH_LINKS_PATH || "artifacts/growth-links.json";
const outputJson = process.env.SEO_CONTENT_KIT_OUTPUT || "artifacts/seo-geo-content-kit.json";
const outputMarkdown = process.env.SEO_CONTENT_KIT_MARKDOWN || "artifacts/seo-geo-content-kit.md";

if (!existsSync(linksPath)) {
  throw new Error(`Tracked growth links are missing at ${linksPath}. Run growth:links first.`);
}

const links = JSON.parse(readFileSync(linksPath, "utf8"));
const angles = contentAngles();
const angle = angles[Number(links.roadmapWeek)] ?? angles[12];
const tracked = Object.fromEntries(links.links.map((item) => [item.content, item.url]));
const report = {
  generatedAt: new Date().toISOString(),
  sprint: links.sprint,
  roadmapWeek: links.roadmapWeek,
  primaryGoal: links.primaryGoal,
  canonicalPage: links.canonicalPage,
  requiredFounderEvidence: angle.requiredFounderEvidence,
  drafts: {
    founderInsight: founderInsightDraft(angle, tracked.founder_insight),
    productWorkflow: productWorkflowDraft(angle, tracked.product_workflow),
    communityContribution: communityDraft(angle, tracked.helpful_answer),
    practitionerReview: reviewDraft(angle, tracked.practitioner_review),
  },
  guardrails: [
    "Replace every bracketed prompt with truthful first-hand evidence or remove that sentence.",
    "Do not name a customer, contact, company, revenue result, or quote without permission.",
    "Answer the community question before mentioning Visioner; omit the link when it is not useful.",
    "Record the public URL and measured result after publishing; a draft is not completion evidence.",
  ],
};

write(outputJson, `${JSON.stringify(report, null, 2)}\n`);
const markdown = renderMarkdown(report);
write(outputMarkdown, markdown);
console.log(markdown);

function founderInsightDraft(angle, url) {
  return `${angle.hook}

${angle.problem}

What I have learned while building Visioner:

1. ${angle.lessonOne}
2. ${angle.lessonTwo}
3. ${angle.lessonThree}

${angle.limitation}

[Add one truthful sentence from your own KAM experience here.]

I am documenting the workflow and the tradeoffs here: ${url}`;
}

function productWorkflowDraft(angle, url) {
  return `A practical ${angle.workflowName} should be understandable in three steps:

Before: ${angle.before}

Action: ${angle.action}

Outcome: ${angle.outcome}

The product evidence this week is ${angle.evidence}. It is not a promise of an automated sales result; it is a way to make the next account decision easier to see.

[Add one current screenshot, short screen recording, or observed product limitation.]

See the full workflow: ${url}`;
}

function communityDraft(angle, url) {
  return `Question to answer: ${angle.communityQuestion}

Short answer: ${angle.communityAnswer}

A useful way to approach it:

- ${angle.communityStepOne}
- ${angle.communityStepTwo}
- ${angle.communityStepThree}

Tradeoff: ${angle.communityTradeoff}

[Answer the poster's specific situation before adding anything below.]

I wrote up the longer framework here in case it helps: ${url}`;
}

function reviewDraft(angle, url) {
  return `Hi [Name], I am testing one specific idea for Visioner this week: ${angle.reviewClaim}

You work close enough to strategic accounts to spot where this becomes unrealistic. Would you be willing to spend 10 minutes challenging the workflow on this page?

${url}

I am especially interested in what is missing, what feels like extra CRM work, and what you would never trust a tool to automate. No endorsement or public quote is expected.`;
}

function renderMarkdown(report) {
  const draftSections = [
    ["LinkedIn 1 — practical KAM insight", report.drafts.founderInsight],
    ["LinkedIn 2 — product workflow", report.drafts.productWorkflow],
    ["Community contribution", report.drafts.communityContribution],
    ["Practitioner review request", report.drafts.practitionerReview],
  ]
    .map(([title, body]) => `## ${title}\n\n${body}`)
    .join("\n\n");
  return `# Visioner SEO/GEO content kit — ${report.sprint}

Roadmap week ${report.roadmapWeek}: **${report.primaryGoal}**  
Canonical page: ${report.canonicalPage}

## Before publishing

Required first-hand evidence: **${report.requiredFounderEvidence}**

${report.guardrails.map((item) => `- ${item}`).join("\n")}

${draftSections}

## Seven-day record

- LinkedIn insight URL, impressions, and useful replies:
- LinkedIn workflow URL, impressions, and useful replies:
- Community answer URL and follow-up questions:
- Practitioner objection or correction:
- Attributed visits, signups, first Accounts, and paid conversions:
- Decision: keep, strengthen evidence, improve snippet, consolidate, or retire:
`;
}

function write(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, value);
}

function contentAngles() {
  return {
    1: {
      hook: "An early B2B product does not need fifty SEO pages. It needs one clear category claim and evidence that the right people understand it.",
      problem:
        "Key Account Managers use several different search phrases for the same daily problem, while broad CRM results are dominated by platforms designed for pipeline reporting.",
      lessonOne: "Measure branded and non-branded discovery separately.",
      lessonTwo:
        "Connect a visit to signup and first-Account creation before calling traffic useful.",
      lessonThree: "Improve one canonical answer instead of cloning keyword variations.",
      limitation:
        "The current search sample is small, so six impressions are directional evidence, not traction.",
      requiredFounderEvidence:
        "Search Console baseline, accepted sitemap, and one personal reason for building Visioner",
      workflowName: "category-validation loop",
      before: "A KAM problem is described with several overlapping CRM and account-planning terms.",
      action:
        "Publish one direct category answer, submit the canonical sitemap, and track the path from visit to first Account.",
      outcome:
        "The next content decision is based on search and activation evidence rather than page count.",
      evidence:
        "the verified Search Console property, crawlable sitemap, and privacy-safe acquisition attribution",
      communityQuestion:
        "How should an early B2B tool validate a new category without creating dozens of SEO pages?",
      communityAnswer:
        "Start with one canonical definition, one measurable user workflow, and direct practitioner feedback.",
      communityStepOne: "Name the user and the daily job in plain language.",
      communityStepTwo: "Measure whether visitors complete the first meaningful product action.",
      communityStepThree: "Consolidate overlapping pages before publishing another variation.",
      communityTradeoff:
        "A narrow category may grow slowly, but it produces cleaner product feedback than broad CRM traffic.",
      reviewClaim:
        "Account Planning CRM is a useful category for the daily workspace a KAM uses beside the corporate CRM.",
    },
    2: {
      hook: "An account plan is most valuable before the review meeting, not during the slide presentation.",
      problem:
        "Many account plans are complete enough for management review but too static for the KAM's next decision.",
      lessonOne: "Start with revenue position, active projects, and today's actions.",
      lessonTwo: "Expose missing stakeholders as risks instead of mandatory form errors.",
      lessonThree:
        "Keep the corporate CRM as the system of record when the organization requires it.",
      limitation:
        "Visioner is not a replacement for enterprise forecasting, territory management, or high-volume lead automation.",
      requiredFounderEvidence: "Current Account Overview screenshot and one explicit not-fit case",
      workflowName: "daily account-planning check",
      before: "Revenue, projects, stakeholders, and follow-ups are spread across separate tools.",
      action:
        "Review one account canvas for the gap, project movement, missing roles, and next actions.",
      outcome: "The KAM leaves with a short action list instead of another reporting chore.",
      evidence:
        "a current Account Overview screenshot and the stated coexistence boundary with corporate CRM",
      communityQuestion:
        "What should an account planning CRM do that a traditional CRM usually does not?",
      communityAnswer:
        "It should help the account owner decide what to do next, not merely report what already happened.",
      communityStepOne: "Show target position and active project context.",
      communityStepTwo: "Map stakeholder roles and reporting lines, including unknown seats.",
      communityStepThree: "Turn relationship gaps and completed work into follow-up evidence.",
      communityTradeoff:
        "A KAM workspace adds value only when it reduces duplicate entry and coexists cleanly with the company CRM.",
      reviewClaim:
        "A useful Account Planning CRM should be a daily operating workspace beside, not automatically a replacement for, the corporate CRM.",
    },
    3: {
      hook: "Most CRM dashboards answer a manager's question. A KAM starts the morning with a different list.",
      problem:
        "The account owner needs to know which relationship, project, and follow-up deserves attention today.",
      lessonOne: "Make tasks and account context visible together.",
      lessonTwo: "Let incomplete information become a signal, not a blocked form.",
      lessonThree: "Capture completed work so the weekly update is easier later.",
      limitation: "Daily usefulness matters more than adding every possible CRM module.",
      requiredFounderEvidence: "Typical-day workflow and current Portfolio or Task screenshot",
      workflowName: "KAM morning review",
      before:
        "The day's priorities are reconstructed from CRM, email, calendar, notes, and memory.",
      action:
        "Review portfolio signals, choose the account that needs attention, and act from its project and relationship context.",
      outcome:
        "The workspace becomes a home screen for account work rather than another reporting destination.",
      evidence: "the current Portfolio and Task workflow",
      communityQuestion: "What should a Key Account Manager review every morning?",
      communityAnswer:
        "Only the items that can change today's action: account gap, project movement, urgent work, relationship risk, and waiting follow-up.",
      communityStepOne: "Choose the account that needs attention.",
      communityStepTwo: "Check the project and people involved before acting.",
      communityStepThree: "Record the outcome once, close to the work.",
      communityTradeoff:
        "More dashboard metrics can make prioritization worse when they do not change a decision.",
      reviewClaim:
        "A KAM home screen should organize today's account decisions rather than reproduce a sales-manager dashboard.",
    },
    4: {
      hook: "A contact list tells you who you know. An account map tells you where the decision can still surprise you.",
      problem:
        "Large-account risk often sits in missing reporting lines, unknown roles, and overreliance on one champion.",
      lessonOne: "Keep reporting structure separate from project stakeholder roles.",
      lessonTwo: "Show unknown seats explicitly.",
      lessonThree: "Use relationship health to decide where attention is overdue.",
      limitation:
        "An org chart is evidence to verify, not proof of influence in a specific buying decision.",
      requiredFounderEvidence:
        "Current Org Chart screenshot, unknown slot, and relationship-health example",
      workflowName: "account-mapping review",
      before:
        "The KAM repeatedly contacts the same familiar people while decision coverage remains unclear.",
      action:
        "Map reporting lines, project roles, relationship health, and unknown stakeholder seats.",
      outcome: "Coverage gaps become visible before they become deal surprises.",
      evidence: "the current interactive Org Chart and relationship-health indicators",
      communityQuestion: "What is the difference between a CRM contact list and an account map?",
      communityAnswer:
        "A contact list stores people; an account map explains structure, decision roles, relationship strength, and missing coverage.",
      communityStepOne: "Map formal reporting lines.",
      communityStepTwo: "Assign project-specific stakeholder roles.",
      communityStepThree: "Mark unknown or weakly covered seats.",
      communityTradeoff: "A map becomes misleading when inferred data is shown as confirmed fact.",
      reviewClaim:
        "Account mapping should expose unknown decision coverage, not just arrange contact cards into an org chart.",
    },
    5: {
      hook: "A customer org chart is useful only when it can be narrowed to the part of the company the KAM can actually work.",
      problem:
        "Importing a thousand-person organization creates clutter unless the user can preview, filter, and selectively save relevant people.",
      lessonOne: "Preview provider data before writing to the private workspace.",
      lessonTwo: "Filter by department, level, and reporting depth.",
      lessonThree: "Preserve user edits when provider data refreshes.",
      limitation:
        "Provider coverage and accuracy vary, and customer-owned API access remains subject to the provider's terms.",
      requiredFounderEvidence: "THE ORG BYOK boundary and Manager Reveal preview",
      workflowName: "selective org intelligence workflow",
      before: "A known contact has an unknown manager or peer set.",
      action:
        "Preview the private provider result, confirm credit use, and add only the relevant reporting connection.",
      outcome:
        "The account map grows deliberately without importing an unusable company directory.",
      evidence: "the current BYOK Manager Reveal preview-before-write flow",
      communityQuestion:
        "How should a CRM use external org-chart data without overwhelming the account owner?",
      communityAnswer:
        "Treat provider data as a searchable preview and save only the people and reporting lines relevant to the account plan.",
      communityStepOne: "Keep the provider key customer-owned and encrypted.",
      communityStepTwo: "Show likely cost and source before the request.",
      communityStepThree: "Require a separate confirmation before adding data to the CRM.",
      communityTradeoff:
        "A full-company snapshot is comprehensive but often less usable than selective reveal and import.",
      reviewClaim:
        "External org data should reveal the next useful relationship, not dump an entire company directory into CRM.",
    },
    6: {
      hook: "A strategic account plan should be a decision document, not an inventory of every CRM field.",
      problem:
        "Plans become hard to maintain when they mix executive summary, project detail, contact data, and action tracking without hierarchy.",
      lessonOne: "Lead with objective, revenue position, and strategic context.",
      lessonTwo: "Connect projects to stakeholder coverage and risk.",
      lessonThree: "Use completed work as evidence of progress.",
      limitation:
        "There is no universal template; the useful depth depends on account complexity and review audience.",
      requiredFounderEvidence: "Current Account Plan export and practical checklist",
      workflowName: "account-plan review",
      before: "The KAM rebuilds a presentation from scattered operational data before each review.",
      action: "Maintain account context during daily work and export the current plan when needed.",
      outcome:
        "The report reflects the working account rather than a separate quarterly reconstruction.",
      evidence: "the current browser-to-PDF Account Plan and its live source sections",
      communityQuestion: "What should a strategic account plan include?",
      communityAnswer:
        "Enough information to explain the objective, revenue path, active initiatives, decision coverage, relationship risk, and next action.",
      communityStepOne: "State the account objective and commercial position.",
      communityStepTwo: "Show projects, stakeholders, risks, and unknowns.",
      communityStepThree: "End with accountable next actions and recent progress.",
      communityTradeoff:
        "A complete plan can still be unusable if daily updates require duplicate work.",
      reviewClaim:
        "An account-plan report should be generated from daily account work rather than maintained as a separate presentation.",
    },
    7: {
      hook: "Stakeholder mapping becomes useful when it changes the next conversation, not when every role box is filled.",
      problem:
        "Teams often confuse formal hierarchy, buying role, influence, and relationship strength.",
      lessonOne: "Map stakeholder roles per project.",
      lessonTwo: "Keep support, opposition, and influence visible separately.",
      lessonThree: "Turn unknown roles into explicit risks and tasks.",
      limitation:
        "Role labels are working hypotheses and should be updated as the buying process changes.",
      requiredFounderEvidence: "Project decision-chain and relationship-risk example",
      workflowName: "project stakeholder review",
      before:
        "A project appears healthy because several contacts are linked, but the actual decision chain is incomplete.",
      action:
        "Review required roles, support position, influence, reporting lines, and relationship health in the project context.",
      outcome: "The KAM identifies the next person or question needed to reduce decision risk.",
      evidence: "the current Project Stakeholders and Risks tabs",
      communityQuestion: "How do you map stakeholders in a complex strategic account?",
      communityAnswer:
        "Separate reporting structure from project role, influence, support level, and relationship strength.",
      communityStepOne: "List the roles required for this specific decision.",
      communityStepTwo: "Attach known contacts and keep unknown seats visible.",
      communityStepThree: "Create one action for the highest-risk gap.",
      communityTradeoff:
        "A detailed map can create false confidence when role assignments are not verified.",
      reviewClaim:
        "A stakeholder map should expose the next decision risk, not reward the team for filling every role field.",
    },
    8: {
      hook: "The best weekly account update is usually created by how the KAM works each day.",
      problem:
        "Tasks, emails, meetings, and project changes are often reconstructed at the end of the week.",
      lessonOne: "Keep tasks close to account context.",
      lessonTwo: "Capture outbound email without retyping the interaction.",
      lessonThree: "Archive completed work into weekly progress.",
      limitation:
        "Calendar remains better handled by the user's existing calendar system than by recreating a full calendar inside Visioner.",
      requiredFounderEvidence: "Task-to-weekly-progress and BCC Activity workflow",
      workflowName: "daily-to-weekly KAM workflow",
      before: "The KAM performs the work in several tools and later repeats it for reporting.",
      action:
        "Plan tasks, act from the account, capture relevant activity, and complete work in one flow.",
      outcome: "The weekly progress record is assembled from work already completed.",
      evidence: "the current Task, BCC Email Log, Activity, and Weekly Progress flow",
      communityQuestion:
        "How can a KAM reduce duplicate CRM updates without losing account history?",
      communityAnswer:
        "Capture evidence close to the action and reuse it for the account record and weekly summary.",
      communityStepOne: "Keep lightweight tasks tied to the account.",
      communityStepTwo: "Log the outbound interaction once.",
      communityStepThree: "Reuse completed work for weekly progress.",
      communityTradeoff: "Automatic capture needs clear content-retention and privacy boundaries.",
      reviewClaim:
        "A daily KAM workspace should make the weekly update a byproduct of completed work.",
    },
    9: {
      hook: "The right KAM software is not always the product with the longest feature list.",
      problem:
        "Enterprise platforms, CRM extensions, project tools, and personal workspaces solve different buyer problems.",
      lessonOne: "Evaluate the primary user and daily job first.",
      lessonTwo: "Score coexistence, data ownership, and update burden.",
      lessonThree: "Test one real account before committing to a rollout.",
      limitation:
        "Visioner is not the best fit when the buying requirement is primarily enterprise governance or high-volume sales automation.",
      requiredFounderEvidence: "Neutral evaluation scorecard and explicit not-fit cases",
      workflowName: "KAM software evaluation",
      before: "A buyer compares products with incompatible categories and counts features.",
      action:
        "Weight daily usefulness, account complexity, governance, integration, privacy, and operating cost.",
      outcome: "The shortlist matches the actual user and deployment model.",
      evidence: "the ungated 100-point KAM software evaluation scorecard",
      communityQuestion: "How should I choose software for Key Account Management?",
      communityAnswer:
        "Start with who will use it daily, then score the workflow, integration, governance, and data boundaries that matter to that user.",
      communityStepOne: "Define the primary user and three recurring jobs.",
      communityStepTwo: "Test one real account and measure update effort.",
      communityStepThree: "Separate must-have governance from optional feature breadth.",
      communityTradeoff:
        "A personal workspace can be faster to adopt but may not satisfy enterprise control requirements.",
      reviewClaim:
        "KAM software should be evaluated on daily usefulness and update burden, not only platform breadth.",
    },
    10: {
      hook: "A category becomes easier to trust when practitioners can challenge the definition in public.",
      problem:
        "A product website alone cannot establish category authority or reveal where its language is unrealistic.",
      lessonOne: "Use one consistent category description across credible profiles.",
      lessonTwo: "Contribute useful answers before asking for a link.",
      lessonThree: "Record objections and update the canonical source.",
      limitation: "Directory volume is not authority; relevance and crawlable context matter more.",
      requiredFounderEvidence: "Current guide hub and consistent category description",
      workflowName: "earned-reference loop",
      before: "Visioner describes itself consistently but has few independent references.",
      action:
        "Publish useful practitioner material, request critique, and submit only to relevant directories.",
      outcome: "External references provide discovery and product-language feedback.",
      evidence: "the current guide hub, directory kit, and practitioner review process",
      communityQuestion: "What makes a new B2B software category credible?",
      communityAnswer:
        "A clear job-to-be-done, repeatable practitioner language, first-hand evidence, and independent references.",
      communityStepOne: "Use one category phrase consistently.",
      communityStepTwo: "Publish evidence and limitations, not only claims.",
      communityStepThree: "Invite informed criticism and incorporate it.",
      communityTradeoff:
        "Broad promotional distribution can create links without trust or qualified demand.",
      reviewClaim:
        "Account Planning CRM should be defined by a repeatable KAM workflow, not by Visioner's feature list.",
    },
    11: {
      hook: "Search snippets should change because the evidence changed, not because a calendar says it is optimization week.",
      problem:
        "Low-volume pages are often rewritten before enough impressions exist to understand the query or CTR problem.",
      lessonOne: "Choose the highest-impression canonical page.",
      lessonTwo: "Change one title or description hypothesis at a time.",
      lessonThree: "Keep the page answer and snippet promise aligned.",
      limitation: "Do not infer CTR performance from fewer than 100 meaningful impressions.",
      requiredFounderEvidence:
        "Highest-impression low-CTR page and its current Search Console query set",
      workflowName: "evidence-led snippet refresh",
      before: "A canonical page receives impressions but few qualified clicks.",
      action:
        "Match its title, description, direct answer, and screenshot to the observed query intent.",
      outcome: "The next 28-day comparison tests one clear discovery hypothesis.",
      evidence: "Search Console impressions, queries, CTR, and the current page answer",
      communityQuestion: "When should an early B2B site rewrite its SEO title and description?",
      communityAnswer:
        "After the page is indexed and has enough query-level impressions to show a mismatch, not immediately after publishing.",
      communityStepOne: "Confirm indexing and canonical status.",
      communityStepTwo: "Read the actual queries and page intent.",
      communityStepThree: "Change one snippet hypothesis and wait for a comparable period.",
      communityTradeoff:
        "Fast iteration feels productive but can erase the baseline before it becomes interpretable.",
      reviewClaim:
        "Visioner's search snippets should be changed only when Search Console shows a clear intent or CTR mismatch.",
    },
    12: {
      hook: "A 90-day content plan is useful only if it ends with deletion and consolidation decisions.",
      problem:
        "Early sites accumulate overlapping pages faster than they accumulate evidence about which pages help discovery and activation.",
      lessonOne: "Retain pages with distinct intent and evidence.",
      lessonTwo: "Refresh pages with impressions but weak answers.",
      lessonThree: "Consolidate or retire pages with no unique job.",
      limitation:
        "Rankings and AI citations remain external outcomes; the controllable output is a cleaner, more useful source set.",
      requiredFounderEvidence:
        "90-day scorecard, conversion evidence, practitioner objections, and GEO citation review",
      workflowName: "content portfolio decision",
      before: "Twelve weeks of pages, posts, referrals, and product evidence have accumulated.",
      action:
        "Review discovery, activation, paid assists, objections, and citation accuracy by canonical intent.",
      outcome:
        "Visioner keeps a smaller set of stronger sources and a clearer next growth hypothesis.",
      evidence: "the completed SEO/GEO scorecard and fixed-prompt GEO review",
      communityQuestion:
        "How should an early SaaS decide which content to keep after its first SEO sprint?",
      communityAnswer:
        "Judge each page by unique intent, evidence quality, qualified discovery, activation assistance, and practitioner usefulness.",
      communityStepOne: "Retain pages with distinct intent and measurable usefulness.",
      communityStepTwo: "Refresh pages with evidence but weak presentation.",
      communityStepThree: "Redirect or retire pages that duplicate a stronger source.",
      communityTradeoff:
        "Removing pages can reduce superficial footprint while improving clarity and authority.",
      reviewClaim:
        "Visioner's next growth plan should be based on the pages and workflows that produced qualified evidence, not content volume.",
    },
  };
}
