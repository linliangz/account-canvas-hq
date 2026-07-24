const CANONICAL_ORIGIN = "https://www.visioner.cc";

export default {
  fetch(request: Request): Response {
    const incomingUrl = new URL(request.url);
    const destination = new URL(
      `${incomingUrl.pathname}${incomingUrl.search}`,
      CANONICAL_ORIGIN,
    );

    return new Response(null, {
      status: 308,
      headers: {
        location: destination.toString(),
        "cache-control": "public, max-age=3600",
        "strict-transport-security": "max-age=31536000",
        "x-content-type-options": "nosniff",
      },
    });
  },
};
