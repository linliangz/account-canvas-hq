import { createFileRoute } from "@tanstack/react-router";
import { Globe, LifeBuoy, Mail, ShieldCheck } from "lucide-react";
import { marketingSignupUrl } from "../lib/marketing-links";

const SIGNUP_URL = marketingSignupUrl("support", "/support");

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Visioner CRM" },
      {
        name: "description",
        content:
          "Contact Visioner CRM support for SaaS beta access, account planning setup, billing, privacy, and product feedback.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <a href="/" className="inline-flex items-center">
          <img src="/visioner-lockup.svg" alt="Visioner CRM" className="h-auto w-[132px]" />
        </a>

        <div className="mt-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Support
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            We are still close to every early user.
          </h1>
          <p className="mt-5 text-[17px] leading-7 text-muted-foreground">
            Visioner CRM is in beta. If something feels confusing, broken, or just not sharp enough
            for real Key Account work, send it in. Early feedback directly shapes the product.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <a
            href="mailto:support@visioner.cc?subject=Visioner%20CRM%20Support"
            className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <Mail className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Email Support</h2>
            <p className="mt-2 text-muted-foreground">
              For beta access, bugs, account questions, billing, privacy, or product feedback.
            </p>
            <p className="mt-4 font-semibold text-accent">support@visioner.cc</p>
          </a>

          <a
            href={SIGNUP_URL}
            className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
          >
            <Globe className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold">Start or Resume</h2>
            <p className="mt-2 text-muted-foreground">
              Register for the web app or return to your Visioner workspace.
            </p>
            <p className="mt-4 font-semibold text-accent">Open Visioner App</p>
          </a>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Globe,
              title: "SaaS Beta",
              body: "Visioner V1.0 is SaaS-first. Free users can start online with up to three accounts before upgrading to Basic.",
            },
            {
              icon: ShieldCheck,
              title: "Privacy Requests",
              body: "For access, correction, export, or deletion requests, email support with the address used for your Visioner profile.",
            },
            {
              icon: LifeBuoy,
              title: "Response Time",
              body: "During beta, support is founder-led. We aim to respond quickly, but response time may vary before a full support desk is in place.",
            },
          ].map((item) => (
            <section
              key={item.title}
              className="rounded-2xl border border-border bg-surface/60 p-5"
            >
              <item.icon className="h-5 w-5 text-accent" />
              <h2 className="mt-3 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Helpful Links</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
            <a
              className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
              href="/"
            >
              Landing Page
            </a>
            <a
              className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
              href="https://app.visioner.cc"
            >
              Web App
            </a>
            <a
              className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
              href={SIGNUP_URL}
            >
              Start Free
            </a>
            <a
              className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
              href="/privacy"
            >
              Privacy Policy
            </a>
            <a
              className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
              href="/terms"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
