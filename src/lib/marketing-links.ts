const APP_SIGNUP_URL = "https://app.visioner.cc/signup";

export function marketingSignupUrl(campaign: string, content?: string) {
  const url = new URL(APP_SIGNUP_URL);
  url.searchParams.set("utm_source", "visioner.cc");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", campaign);
  if (content) url.searchParams.set("utm_content", content.replace(/^\//, "") || "home");
  return url.toString();
}
