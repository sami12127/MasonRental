import { cars, getCarById, type Car } from "./cars";
import { faqs } from "./content";
import { IMAGE_SIZES, responsiveImg } from "../lib/responsiveImg";

/**
 * Titels, beschrijvingen en gestructureerde data (JSON-LD) per pagina.
 * Wordt gebruikt door het prerender-script (scripts/prerender.mjs) om de
 * <head> van elke pagina te vullen, en in de browser om de head bij te werken
 * bij een paginawissel.
 */

export const SITE_URL = "https://masonrental.nl";
const SITE_NAME = "Mason Rental";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const BUSINESS = {
  phone: "+31618623757",
  email: "info@masonrental.nl",
  street: "Vrijheidsdans 6",
  city: "Capelle aan den IJssel",
  region: "Zuid-Holland",
  kvk: "97892343",
  socials: [
    "https://instagram.com/rentbymason",
    "https://tiktok.com/@masonrental",
    "https://snapchat.com/add/masonrental",
  ],
};

const BUSINESS_ID = `${SITE_URL}/#bedrijf`;

export interface PageMeta {
  /** Pad zonder domein, bv. "/aanbod" */
  path: string;
  title: string;
  description: string;
  /** Bv. "noindex" voor pagina's die niet in Google horen */
  robots?: string;
  /** Belangrijkste foto boven de vouw, al in de <head> gepreload */
  preloadImage?: { src: string; srcSet?: string; sizes?: string };
  jsonLd: object[];
}

/** Alle pagina's die bij de build als losse HTML worden gerenderd. */
export const PRERENDER_ROUTES = [
  "/",
  "/aanbod",
  ...cars.map((car) => `/auto/${car.id}`),
  "/over-ons",
  "/contact",
  "/privacybeleid",
];

const prices = cars.map((car) => car.pricePerDay);

function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

/** Het bedrijf zelf, als AutoRental (een LocalBusiness-type van schema.org). */
function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absolute("/logo-512.png"),
    image: OG_IMAGE,
    description:
      "Luxe autoverhuur in Capelle aan den IJssel. Huur high-performance auto's zoals de Audi RS6 C8 en Audi RS3 8Y, vanaf 18 jaar.",
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: `€${Math.min(...prices)} - €${Math.max(...prices)} per dag`,
    currenciesAccepted: "EUR",
    paymentAccepted: "Bankoverschrijving, Tikkie",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: "NL",
    },
    areaServed: [
      { "@type": "City", name: BUSINESS.city },
      { "@type": "AdministrativeArea", name: BUSINESS.region },
    ],
    identifier: { "@type": "PropertyValue", propertyID: "KVK", value: BUSINESS.kvk },
    sameAs: BUSINESS.socials,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wagenpark",
      itemListElement: cars.map((car) => ({
        "@type": "Offer",
        url: absolute(`/auto/${car.id}`),
        itemOffered: { "@type": "Car", name: car.name },
        ...dayPrice(car),
      })),
    },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "nl-NL",
    publisher: { "@id": BUSINESS_ID },
  };
}

function dayPrice(car: Car) {
  return {
    price: car.pricePerDay,
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: car.pricePerDay,
      priceCurrency: "EUR",
      unitCode: "DAY",
      unitText: "per dag",
    },
  };
}

function carSchema(car: Car) {
  const url = absolute(`/auto/${car.id}`);
  const doors = parseInt(car.doors, 10);
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.name,
    description: car.description,
    url,
    image: car.gallery.map(absolute),
    brand: { "@type": "Brand", name: car.brand },
    bodyType: car.bodyType,
    vehicleTransmission: car.transmission,
    ...(Number.isNaN(doors) ? {} : { numberOfDoors: doors }),
    offers: {
      "@type": "Offer",
      url,
      availability: "https://schema.org/InStock",
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      seller: { "@id": BUSINESS_ID },
      ...dayPrice(car),
    },
  };
}

function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

const HOME: PageMeta = {
  path: "/",
  title: "Mason Rental | Luxe auto huren in Capelle aan den IJssel",
  description:
    "Luxe auto huren in Capelle aan den IJssel? Huur de Audi RS6 C8 of Audi RS3 8Y bij Mason Rental. Huren vanaf 18 jaar, snel geregeld via WhatsApp.",
  preloadImage: { src: "/hero-rs3.webp" },
  jsonLd: [businessSchema(), websiteSchema()],
};

export function getPageMeta(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (path === "/") return HOME;

  if (path === "/aanbod") {
    return {
      path,
      title: "Aanbod: luxe auto's huren | Mason Rental",
      description: `Bekijk het wagenpark van Mason Rental: de Audi RS6 C8 en Audi RS3 8Y. Luxe auto huren in Capelle aan den IJssel vanaf €${Math.min(...prices)} per dag.`,
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Aanbod", path: "/aanbod" },
        ]),
      ],
    };
  }

  if (path.startsWith("/auto/")) {
    const car = getCarById(path.slice("/auto/".length));
    if (!car) {
      return {
        path,
        title: "Auto niet gevonden | Mason Rental",
        description: "Deze auto bestaat niet of is niet meer beschikbaar.",
        robots: "noindex",
        jsonLd: [],
      };
    }
    return {
      path,
      title: `${car.name} huren vanaf €${car.pricePerDay} per dag | Mason Rental`,
      preloadImage: responsiveImg(car.gallery[0], IMAGE_SIZES.carMain, 16 / 10),
      description: `Huur de ${car.name} bij Mason Rental in Capelle aan den IJssel. ${car.tagline}. Vanaf €${car.pricePerDay} per dag, huren vanaf 18 jaar.`,
      jsonLd: [
        carSchema(car),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Aanbod", path: "/aanbod" },
          { name: car.name, path },
        ]),
      ],
    };
  }

  if (path === "/over-ons") {
    return {
      path,
      title: "Over ons | Mason Rental",
      preloadImage: responsiveImg("/over-ons.webp", IMAGE_SIZES.story),
      description:
        "Leer Mason Rental kennen: luxe autoverhuur uit Capelle aan den IJssel met persoonlijke service, heldere afspraken en auto's in topstaat.",
      jsonLd: [],
    };
  }

  if (path === "/contact") {
    return {
      path,
      title: "Contact & FAQ | Mason Rental",
      description:
        "Neem contact op met Mason Rental via WhatsApp, telefoon of e-mail, Vrijheidsdans 6 in Capelle aan den IJssel. Plus antwoorden op veelgestelde vragen over huren.",
      jsonLd: [businessSchema(), faqSchema()],
    };
  }

  if (path === "/privacybeleid") {
    return {
      path,
      title: "Privacybeleid | Mason Rental",
      description:
        "Lees hoe Mason Rental omgaat met je persoonsgegevens en welke cookies de website gebruikt.",
      jsonLd: [],
    };
  }

  // Onbekende URL's tonen de homepage (zie de "*"-route in App.tsx).
  return HOME;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** JSON veilig binnen een <script>-tag (geen "</script>" mogelijk). */
export function jsonLdString(data: object[]) {
  return JSON.stringify(data.length === 1 ? data[0] : data).replace(/</g, "\\u003c");
}

function preloadTag({ src, srcSet, sizes }: NonNullable<PageMeta["preloadImage"]>) {
  const responsive = srcSet
    ? ` imagesrcset="${srcSet}"${sizes ? ` imagesizes="${sizes}"` : ""}`
    : "";
  return `<link rel="preload" href="${src}"${responsive} as="image" fetchpriority="high" />`;
}

/** De SEO-tags voor in de <head>, als HTML-string (voor het prerender-script). */
export function renderHead(meta: PageMeta) {
  const url = absolute(meta.path);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    meta.robots ? `<meta name="robots" content="${meta.robots}" />` : "",
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Mason Rental logo – Luxe Auto Verhuur" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    meta.preloadImage ? preloadTag(meta.preloadImage) : "",
    meta.jsonLd.length
      ? `<script type="application/ld+json" id="structured-data">${jsonLdString(meta.jsonLd)}</script>`
      : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** Werkt de head bij na een paginawissel in de browser. */
export function applyMeta(meta: PageMeta) {
  const url = absolute(meta.path);
  document.title = meta.title;

  const setAttr = (selector: string, create: () => HTMLElement, attr: string, value: string | null) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (value === null) {
      el?.remove();
      return;
    }
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const newMeta = (key: "name" | "property", name: string) => () => {
    const el = document.createElement("meta");
    el.setAttribute(key, name);
    return el;
  };

  setAttr('meta[name="description"]', newMeta("name", "description"), "content", meta.description);
  setAttr('meta[name="robots"]', newMeta("name", "robots"), "content", meta.robots ?? null);
  setAttr('meta[property="og:url"]', newMeta("property", "og:url"), "content", url);
  setAttr('meta[property="og:title"]', newMeta("property", "og:title"), "content", meta.title);
  setAttr('meta[property="og:description"]', newMeta("property", "og:description"), "content", meta.description);
  setAttr('meta[name="twitter:title"]', newMeta("name", "twitter:title"), "content", meta.title);
  setAttr('meta[name="twitter:description"]', newMeta("name", "twitter:description"), "content", meta.description);
  setAttr(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement("link");
      el.rel = "canonical";
      return el;
    },
    "href",
    url
  );

  let script = document.getElementById("structured-data");
  if (!meta.jsonLd.length) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.id = "structured-data";
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = jsonLdString(meta.jsonLd);
}
