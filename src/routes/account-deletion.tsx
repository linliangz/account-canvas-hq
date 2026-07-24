import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Mail, ShieldCheck, Smartphone } from "lucide-react";

import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/account-deletion")({
  head: () =>
    pageHead({
      title: "Account and Data Deletion — Visioner CRM",
      description:
        "Request deletion of a Visioner Cloud account or data, or learn how to erase on-device Visioner Personal data on Android and iOS.",
      path: "/account-deletion",
    }),
  component: AccountDeletionPage,
});

function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <a href="/" className="inline-flex items-center">
          <img src="/visioner-lockup.svg" alt="Visioner CRM" className="h-auto w-[132px]" />
        </a>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Privacy
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Account and Data Deletion
        </h1>
        <p className="mt-4 text-muted-foreground">
          <time dateTime="2026-07-19">Last updated: July 19, 2026</time>
        </p>
        <p className="mt-6 text-[17px] leading-7 text-muted-foreground">
          Visioner keeps Personal on-device data separate from an optional Work Cloud account. Use
          the path below that matches the data you want to remove.
        </p>

        <div className="mt-10 space-y-6 text-[16px] leading-7 text-muted-foreground">
          <section className="rounded-2xl border border-border bg-card p-6">
            <Smartphone className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              Erase Visioner Personal data on your phone
            </h2>
            <p className="mt-2">
              Personal does not require a Visioner account. In the Android or iOS app, open Personal
              Today, choose <strong className="text-foreground">Erase Personal data</strong>, and
              confirm. This removes Visioner Personal relationships, private notes and touch
              history, Personal tasks, pending shared drafts, and reminders stored by Visioner on
              that device.
            </p>
            <p className="mt-2">
              This action does not delete entries in Android Contacts or Apple Contacts, external
              Calendar events, or Work Cloud data. Those remain under their own app or service
              controls.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <Cloud className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              Request deletion of a Work Cloud account or data
            </h2>
            <p className="mt-2">
              Email us from the address registered with Visioner. Use the subject
              <strong className="text-foreground"> Visioner account deletion</strong> and tell us
              whether you want to delete your full account or specific Cloud data.
            </p>
            <a
              href="mailto:support@visioner.cc?subject=Visioner%20account%20deletion"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Email support@visioner.cc
            </a>
            <p className="mt-4 text-sm leading-6">
              We may verify your identity and workspace ownership before acting. Team workspaces may
              require an owner or administrator decision so one member cannot delete records that
              belong to the organization. Eligible account-associated Cloud data will be deleted or
              de-identified; records required for legal, financial, security, fraud prevention, or
              dispute purposes may be retained only as needed.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface/60 p-6">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              Disconnect is not account deletion
            </h2>
            <p className="mt-2">
              <strong className="text-foreground">Disconnect Cloud</strong> in the mobile app
              removes the encrypted session, local Work cache, conflicts, and unsynced Work data
              from that device. It does not delete your Visioner Cloud account, delete the Team
              workspace, or sign out other devices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Need help?</h2>
            <p className="mt-2">
              For an access, correction, export, or deletion request, contact{" "}
              <a
                className="font-medium text-accent hover:underline"
                href="mailto:support@visioner.cc"
              >
                support@visioner.cc
              </a>
              . Do not email passwords, access tokens, one-time codes, or unredacted customer
              records.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
              <a
                className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
                href="/privacy"
              >
                Privacy Policy
              </a>
              <a
                className="rounded-lg border border-border px-4 py-2 hover:bg-surface-muted"
                href="/support"
              >
                Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
