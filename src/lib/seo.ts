const SITE_URL = "https://www.visioner.cc";
const SITE_NAME = "Visioner";
const PRODUCT_NAME = "Visioner CRM";
const DEFAULT_IMAGE = `${SITE_URL}/favicon-512x512.png`;

type PageHeadOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageHead({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_IMAGE,
}: PageHeadOptions) {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "application-name", content: SITE_NAME },
      { name: "description", content: description },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: socialImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

function publisher() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [PRODUCT_NAME, "Visioner Account Planning CRM"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_IMAGE,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...publisher(),
    description:
      "Visioner is an account planning CRM for Key Account Managers and strategic account owners.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [PRODUCT_NAME, "Visioner Account Planning CRM"],
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    about: "Account planning CRM for Key Account Managers",
    inLanguage: "en",
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: PRODUCT_NAME,
    alternateName: ["Visioner", "Visioner Account Planning CRM"],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Visioner CRM is an account planning CRM that helps Key Account Managers manage relationships, projects, tasks, account signals, stakeholder maps, and customer org charts.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    },
    featureList: [
      "Account planning workspace",
      "Key account task management",
      "Stakeholder mapping",
      "Customer org charts",
      "Relationship health tracking",
      "Account signals",
      "BCC email capture",
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  dateModified,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_IMAGE,
      },
    },
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image),
    datePublished: dateModified,
    dateModified,
  };
}

export function faqJsonLd(faq: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_IMAGE,
      },
    },
  };
}
