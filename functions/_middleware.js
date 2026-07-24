const CANONICAL_HOST = "www.visioner.cc";
const WEBSITE_HOSTS = new Set(["visioner.cc", CANONICAL_HOST]);

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Permitted-Cross-Domain-Policies": "none",
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const forwardedProtocol =
    context.request.headers.get("x-forwarded-proto") ||
    url.protocol.replace(":", "");
  const cloudflareVisitor = context.request.headers.get("cf-visitor") || "";

  if (
    WEBSITE_HOSTS.has(url.hostname) &&
    (url.hostname !== CANONICAL_HOST ||
      forwardedProtocol !== "https" ||
      /"scheme"\s*:\s*"http"/i.test(cloudflareVisitor))
  ) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";

    return new Response(null, {
      status: 308,
      headers: {
        Location: url.toString(),
        ...SECURITY_HEADERS,
      },
    });
  }

  const response = await context.next();
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
