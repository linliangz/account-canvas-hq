import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

const PERMANENT_REDIRECTS = new Map([
  ["/guides/crm-for-key-account-managers", "/crm-for-key-account-managers"],
]);
const CANONICAL_HOST = "www.visioner.cc";
const SECURITY_HEADERS = {
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-permitted-cross-domain-policies": "none",
} as const;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function permanentRedirect(url: URL): Response {
  return withSecurityHeaders(Response.redirect(url.toString(), 308));
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const forwardedProtocol = request.headers.get("x-forwarded-proto");
      const cloudflareVisitor = request.headers.get("cf-visitor") || "";
      let needsCanonicalRedirect = false;

      if (
        url.protocol !== "https:" ||
        forwardedProtocol === "http" ||
        /"scheme"\s*:\s*"http"/i.test(cloudflareVisitor)
      ) {
        url.protocol = "https:";
        needsCanonicalRedirect = true;
      }

      if (url.hostname === "visioner.cc") {
        url.hostname = CANONICAL_HOST;
        needsCanonicalRedirect = true;
      }

      if (needsCanonicalRedirect) {
        return permanentRedirect(url);
      }

      const redirectPath = PERMANENT_REDIRECTS.get(url.pathname.replace(/\/$/, ""));
      if (redirectPath) {
        url.pathname = redirectPath;
        return permanentRedirect(url);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
