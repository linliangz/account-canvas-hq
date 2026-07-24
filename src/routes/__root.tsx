import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { MarketingAttribution } from "../components/MarketingAttribution";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Visioner — Account Planning CRM for Key Account Managers" },
      {
        name: "description",
        content:
          "Visioner is the account planning CRM for Key Account Managers. Manage relationships, projects, tasks, and account signals in one daily workspace.",
      },
      { property: "og:title", content: "Visioner — Account Planning CRM for Key Account Managers" },
      {
        property: "og:description",
        content:
          "The daily workspace for Key Account Managers. Account planning CRM for people who actually work the account.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Visioner" },
      { property: "og:image", content: "https://www.visioner.cc/visioner-mark.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Visioner — Account Planning CRM for KAMs" },
      { name: "twitter:description", content: "The daily workspace for Key Account Managers." },
      { name: "twitter:image", content: "https://www.visioner.cc/visioner-mark.svg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { rel: "icon", href: "/visioner-mark.svg", type: "image/svg+xml", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "alternate",
        href: "/llms.txt",
        type: "text/plain",
        title: "Visioner LLM context",
      },
      {
        rel: "alternate",
        href: "/llms-full.txt",
        type: "text/plain",
        title: "Visioner detailed product context",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Visioner",
                legalName: "Ronisens Inc.",
                url: "https://www.visioner.cc/",
                logo: "https://www.visioner.cc/favicon-512x512.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "support@visioner.cc",
                  contactType: "customer support",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Visioner",
                alternateName: "Visioner CRM",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                url: "https://www.visioner.cc/",
                description:
                  "Account planning CRM for Key Account Managers to manage relationships, projects, tasks, and account signals.",
                offers: [
                  {
                    "@type": "Offer",
                    name: "Free",
                    price: "0",
                    priceCurrency: "USD",
                    url: "https://app.visioner.cc/signup",
                  },
                  {
                    "@type": "Offer",
                    name: "Basic",
                    price: "12",
                    priceCurrency: "USD",
                    url: "https://app.visioner.cc/pricing?plan=basic",
                  },
                  {
                    "@type": "Offer",
                    name: "Pro",
                    price: "29",
                    priceCurrency: "USD",
                    url: "https://app.visioner.cc/pricing?plan=pro",
                  },
                  {
                    "@type": "Offer",
                    name: "Team",
                    price: "49",
                    priceCurrency: "USD",
                    unitText: "user per month",
                    url: "https://app.visioner.cc/pricing?plan=team",
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MarketingAttribution />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
