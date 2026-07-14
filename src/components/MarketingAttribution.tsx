import { useEffect } from "react";

const STORAGE_KEY = "visioner_marketing_touch_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

type MarketingTouch = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_path?: string;
};

export function MarketingAttribution() {
  useEffect(() => {
    captureMarketingTouch();

    const preserveAttribution = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.hostname !== "app.visioner.cc" || destination.pathname !== "/signup") return;

      const touch = readTouch();
      if (!touch?.utm_source) return;
      for (const key of UTM_KEYS) {
        const value = touch[key];
        if (value) destination.searchParams.set(key, value);
      }
      if (touch.landing_path) destination.searchParams.set("landing_path", touch.landing_path);
      anchor.href = destination.toString();
    };

    document.addEventListener("click", preserveAttribution, true);
    return () => document.removeEventListener("click", preserveAttribution, true);
  }, []);

  return null;
}

function captureMarketingTouch() {
  const params = new URLSearchParams(window.location.search);
  const touch: MarketingTouch = { landing_path: window.location.pathname.slice(0, 160) };
  for (const key of UTM_KEYS) {
    const value = (params.get(key) || "").trim().slice(0, 160);
    if (value) touch[key] = value;
  }
  if (!touch.utm_source) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
  } catch {
    // Attribution is helpful, but storage restrictions must never block navigation.
  }
}

function readTouch(): MarketingTouch | null {
  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as MarketingTouch) : null;
  } catch {
    return null;
  }
}
