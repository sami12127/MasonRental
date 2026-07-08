export type SpecIcon =
  | "gearbox"
  | "doors"
  | "drivetrain"
  | "power"
  | "engine"
  | "body";

export type HighlightIcon =
  | "age"
  | "power"
  | "doors"
  | "topspeed"
  | "gearbox"
  | "acceleration"
  | "fuel"
  | "transmission"
  | "year"
  | "seats"
  | "engine"
  | "location";

export interface CarSpec {
  label: string;
  icon: SpecIcon;
}

export interface CarHighlight {
  icon: HighlightIcon;
  text: string;
}

export interface Car {
  id: string;
  name: string;
  /* Automerk — gebruikt voor het merk-filter op de aanbod-pagina */
  brand: string;
  tagline: string;
  /* Korte kenmerken die op de aanbod-card getoond worden */
  bodyType: string;
  transmission: string;
  doors: string;
  /* Hoofd-/card-afbeelding. Vervang door eigen foto in /public/cars */
  image: string;
  /* Optioneel: foto die bij hover op de aanbod-card verschijnt (val terug op gallery[1]) */
  hoverImage?: string;
  /* Alle foto's voor de galerij op de detailpagina (eerste = hoofdfoto) */
  gallery: string[];
  pricePerDay: number;
  deposit: number;
  description: string;
  /* Korte spec-chips op de wagenpark-card */
  specs: CarSpec[];
  /* "Handig om te weten" — icoon + tekst grid op de detailpagina */
  highlights: CarHighlight[];
  /* Uitgelichte kenmerken */
  features: string[];
}

export const cars: Car[] = [
  {
    id: "audi-rs6-c8",
    name: "Audi RS6 C8",
    brand: "Audi",
    tagline: "De ultieme performance stationwagen",
    bodyType: "Avant",
    transmission: "Automaat",
    doors: "5 Deurs",
    image: "/cars/rs6-1.webp",
    gallery: [
      "/cars/rs6-1.webp",
      "/cars/rs6-2.webp",
      "/cars/rs6-3.webp",
      "/cars/rs6-4.webp",
    ],
    pricePerDay: 750,
    deposit: 3000,
    description:
      "De Audi RS6 C8 combineert de ruimte en het comfort van een Avant met de prestaties van een supercar. Onder de motorkap ligt een 4.0 V8 biturbo die 600 pk levert, goed voor een sprint naar 100 km/u in slechts 3,6 seconden. Met permanente Quattro-vierwielaandrijving, adaptieve luchtvering en een intimiderende aanwezigheid is dit dé auto voor wie kracht en klasse wil combineren.",
    specs: [
      { label: "600 PK", icon: "power" },
      { label: "V8 Biturbo", icon: "engine" },
      { label: "Quattro", icon: "drivetrain" },
      { label: "Automaat", icon: "gearbox" },
      { label: "5 Deurs", icon: "doors" },
    ],
    highlights: [
      { icon: "age", text: "18+" },
      { icon: "power", text: "600 PK / 800 NM" },
      { icon: "doors", text: "5 Deurs" },
      { icon: "topspeed", text: "305 KM/H" },
      { icon: "gearbox", text: "Automaat" },
      { icon: "acceleration", text: "0-100 KM/H in 3.6s" },
      { icon: "fuel", text: "Benzine SuperPlus 98" },
      { icon: "transmission", text: "8-traps automaat" },
      { icon: "year", text: "2021" },
      { icon: "seats", text: "5 zitplaatsen" },
      { icon: "engine", text: "4.0 V8 Biturbo" },
      { icon: "location", text: "Amsterdam" },
    ],
    features: [
      "Dynamic Package (305 km/u)",
      "RS Sportuitlaat",
      "Panoramadak",
      "Matrix LED-koplampen",
      "Bang & Olufsen soundsystem",
      "Carbon interieurpakket",
    ],
  },
  {
    id: "audi-rs3-8y",
    name: "Audi RS3 8Y",
    brand: "Audi",
    tagline: "Compacte kracht met een iconisch geluid",
    bodyType: "Hatchback",
    transmission: "Automaat",
    doors: "5 Deurs",
    /* Eigen foto's van de RS3 staan in /public/cars (rs3-6565 t/m rs3-6573 + interieur rs3-35/36) */
    image: "/cars/rs3-6570.webp",
    hoverImage: "/cars/rs3-35.webp",
    gallery: [
      "/cars/rs3-6567.webp",
      "/cars/rs3-6573.webp",
      "/cars/rs3-35.webp",
      "/cars/rs3-36.webp",
      "/cars/rs3-6572.webp",
      "/cars/rs3-6570.webp",
      "/cars/rs3-6565.webp",
      "/cars/rs3-6566.webp",
      "/cars/rs3-6568.webp",
      "/cars/rs3-6569.webp",
      "/cars/rs3-6571.webp",
    ],
    pricePerDay: 350,
    deposit: 2000,
    description:
      "De Audi RS3 8Y is een compacte krachtpatser met een karakter dat je nergens anders vindt. Zijn legendarische 2.5 TFSI vijfcilinder produceert 400 pk en een geluid dat kippenvel bezorgt. Dankzij de RS Torque Splitter en Quattro-aandrijving plakt de RS3 aan het asfalt, terwijl de sprint naar 100 km/u in 3,8 seconden is volbracht. De perfecte keuze voor wie maximale beleving in een handzaam formaat zoekt.",
    specs: [
      { label: "400 PK", icon: "power" },
      { label: "2.5 TFSI", icon: "engine" },
      { label: "Quattro", icon: "drivetrain" },
      { label: "Automaat", icon: "gearbox" },
      { label: "Sportback", icon: "body" },
    ],
    highlights: [
      { icon: "age", text: "18+" },
      { icon: "power", text: "400 PK / 500 NM" },
      { icon: "doors", text: "5 Deurs" },
      { icon: "topspeed", text: "290 KM/H" },
      { icon: "gearbox", text: "Automaat" },
      { icon: "acceleration", text: "0-100 KM/H in 3.8s" },
      { icon: "fuel", text: "Benzine SuperPlus 98" },
      { icon: "transmission", text: "7-traps S tronic" },
      { icon: "year", text: "2022" },
      { icon: "seats", text: "5 zitplaatsen" },
      { icon: "engine", text: "2.5 TFSI 5-cilinder" },
      { icon: "location", text: "Amsterdam" },
    ],
    features: [
      "RS Torque Splitter",
      "RS Sportuitlaat",
      "Matrix LED-koplampen",
      "Sportstoelen met RS-logo",
      "Audi Virtual Cockpit",
      "RS Drift-modus",
    ],
  },
];

export function getCarById(id: string | undefined): Car | undefined {
  return cars.find((car) => car.id === id);
}

/* Auto's die er binnenkort aankomen — teaser-card in het aanbod, nog geen
   detailpagina. */
export interface UpcomingCar {
  name: string;
  /* Automerk — gebruikt voor het merk-filter op de aanbod-pagina */
  brand: string;
  bodyType: string;
  /* Korte pakkende omschrijving onder de naam */
  tagline: string;
  /* Exterieurfoto voor de card */
  image: string;
  /* Interieurfoto die bij hover verschijnt */
  hoverImage?: string;
}

export const upcomingCars: UpcomingCar[] = [
  {
    name: "Golf 8 GTI",
    brand: "Volkswagen",
    bodyType: "Hot Hatch",
    tagline: "De iconische GTI in zijn scherpste vorm.",
    image: "/cars/golf-8-gti.webp",
    hoverImage: "/cars/golf-8-gti-interieur.webp",
  },
  {
    name: "Golf 8 R",
    brand: "Volkswagen",
    bodyType: "Hot Hatch",
    tagline: "Vierwielaandrijving en pure prestatie.",
    image: "/cars/golf-8-r.webp",
    hoverImage: "/cars/golf-8-r-interieur.webp",
  },
];
