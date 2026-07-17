import { useEffect } from "react";
import type { ReactNode } from "react";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { ContactCTA } from "../components/ContactCTA";

/* Bedrijfsgegevens — houd gelijk met Contact.tsx / Footer.tsx */
const COMPANY = "Mason Rental";
const EMAIL = "info@masonrental.nl";
const PHONE = "06 18623757";
const ADDRESS = "Vrijheidsdans 6, Capelle aan den IJssel";
/* Laatste inhoudelijke wijziging van dit beleid */
const LAST_UPDATED = "18 juli 2026";

interface Section {
  title: string;
  body: ReactNode;
}

const sections: Section[] = [
  {
    title: "1. Wie zijn wij?",
    body: (
      <>
        <p>
          {COMPANY} is verantwoordelijk voor de verwerking van persoonsgegevens
          zoals beschreven in dit privacybeleid. Wij verhuren luxe auto's en
          verwerken hierbij gegevens van (potentiële) huurders.
        </p>
        <ul>
          <li>
            <strong>Bedrijf:</strong> {COMPANY}
          </li>
          <li>
            <strong>Adres:</strong> {ADDRESS}
          </li>
          <li>
            <strong>E-mail:</strong>{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <strong>Telefoon / WhatsApp:</strong>{" "}
            <a href="tel:+31618623757">{PHONE}</a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Welke gegevens verwerken wij?",
    body: (
      <>
        <p>
          Afhankelijk van je contact met ons verwerken wij de volgende
          gegevens:
        </p>
        <ul>
          <li>
            <strong>Contactgegevens</strong> — naam, telefoonnummer, e-mailadres
            en de inhoud van je bericht (via WhatsApp, telefoon, e-mail of het
            contactformulier).
          </li>
          <li>
            <strong>Reserverings- en verhuurgegevens</strong> — gekozen auto,
            huurperiode en, bij een daadwerkelijke verhuur, gegevens van je
            rijbewijs en een identiteitsbewijs ter verificatie.
          </li>
          <li>
            <strong>Betaalgegevens</strong> — gegevens die nodig zijn om de
            betaling en borg af te handelen (bijvoorbeeld via bankoverschrijving
            of Tikkie).
          </li>
          <li>
            <strong>Technische gegevens</strong> — via cookies verzamelde
            gegevens zoals je IP-adres, browsertype en surfgedrag op deze
            website.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Waarom verwerken wij je gegevens?",
    body: (
      <>
        <p>Wij gebruiken je gegevens uitsluitend voor de volgende doeleinden:</p>
        <ul>
          <li>Het beantwoorden van je vraag of contactverzoek.</li>
          <li>Het opstellen en uitvoeren van een huurovereenkomst.</li>
          <li>Het afhandelen van betalingen en de borg.</li>
          <li>
            Het voldoen aan wettelijke verplichtingen, zoals de administratie-
            en bewaarplicht.
          </li>
          <li>
            Het verbeteren en beveiligen van onze website (op basis van
            cookies waarvoor je toestemming hebt gegeven).
          </li>
        </ul>
        <p>
          De verwerking gebeurt op basis van je toestemming, de uitvoering van
          een overeenkomst, een wettelijke verplichting of ons gerechtvaardigd
          belang om onze dienstverlening en website goed te laten functioneren.
        </p>
      </>
    ),
  },
  {
    title: "4. Hoe lang bewaren wij je gegevens?",
    body: (
      <p>
        Wij bewaren je gegevens niet langer dan nodig is voor de doeleinden
        waarvoor ze zijn verzameld. Reserverings- en verhuurgegevens bewaren wij
        gedurende de looptijd van de overeenkomst en daarna zolang dit wettelijk
        verplicht is (voor de belastingadministratie geldt bijvoorbeeld een
        bewaartermijn van 7 jaar). Contactberichten die niet tot een verhuur
        leiden, verwijderen wij zodra ze niet meer relevant zijn.
      </p>
    ),
  },
  {
    title: "5. Delen met derden",
    body: (
      <>
        <p>
          Wij verkopen je gegevens niet. Wij delen gegevens alleen wanneer dat
          nodig is voor onze dienstverlening of wanneer wij daartoe wettelijk
          verplicht zijn, bijvoorbeeld met:
        </p>
        <ul>
          <li>onze betaal- en bankdienstverleners voor het afhandelen van betalingen;</li>
          <li>overheidsinstanties wanneer de wet ons daartoe verplicht.</li>
        </ul>
        <p>
          Met partijen die gegevens namens ons verwerken, sluiten wij waar nodig
          een verwerkersovereenkomst om je gegevens te beschermen.
        </p>
      </>
    ),
  },
  {
    title: "6. Cookies",
    body: (
      <>
        <p>
          Deze website gebruikt uitsluitend functionele cookies en lokale
          opslag die nodig zijn om de site goed te laten werken en om je
          cookievoorkeur te onthouden. Wij gebruiken geen analytische of
          marketingcookies en volgen je surfgedrag niet.
        </p>
        <p>
          Onderdelen van derden — zoals de ingesloten Google Maps-kaart —
          kunnen eigen cookies plaatsen wanneer je die gebruikt. Daarop hebben
          wij geen invloed; raadpleeg hiervoor het privacybeleid van de
          betreffende partij.
        </p>
        <p>
          Je kunt geplaatste cookies altijd verwijderen via de instellingen van
          je browser; de melding verschijnt dan opnieuw.
        </p>
      </>
    ),
  },
  {
    title: "7. Beveiliging",
    body: (
      <p>
        Wij nemen passende technische en organisatorische maatregelen om je
        persoonsgegevens te beschermen tegen verlies of onrechtmatige
        verwerking. Heb je toch de indruk dat je gegevens niet goed beveiligd
        zijn of zijn er aanwijzingen van misbruik? Neem dan contact met ons op
        via <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    ),
  },
  {
    title: "8. Jouw rechten",
    body: (
      <>
        <p>Je hebt op grond van de AVG de volgende rechten:</p>
        <ul>
          <li>het recht op inzage in de gegevens die wij van je verwerken;</li>
          <li>het recht op correctie of aanvulling van onjuiste gegevens;</li>
          <li>het recht op verwijdering van je gegevens;</li>
          <li>het recht om je toestemming in te trekken;</li>
          <li>het recht van bezwaar tegen de verwerking;</li>
          <li>het recht op overdracht van je gegevens (dataportabiliteit).</li>
        </ul>
        <p>
          Wil je gebruikmaken van een van deze rechten? Stuur dan een e-mail
          naar <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Wij reageren zo snel
          mogelijk, uiterlijk binnen vier weken. Ben je het niet eens met hoe
          wij met je gegevens omgaan, dan heb je het recht een klacht in te
          dienen bij de Autoriteit Persoonsgegevens.
        </p>
      </>
    ),
  },
  {
    title: "9. Wijzigingen",
    body: (
      <p>
        Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest
        actuele versie vind je altijd op deze pagina. Dit beleid is voor het
        laatst bijgewerkt op {LAST_UPDATED}.
      </p>
    ),
  },
];

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacybeleid | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Juridisch"
        title="Privacy"
        titleAccent="beleid"
        description="Hoe Mason Rental omgaat met jouw persoonsgegevens — helder en zonder kleine lettertjes."
      />

      <section className="bg-night pb-4">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-sm text-white/40">
            Laatst bijgewerkt: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <Reveal key={section.title}>
                <article>
                  <h2 className="text-xl font-bold text-white md:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-3 h-px w-12 bg-gold/50" aria-hidden="true" />
                  <div className="privacy-prose mt-5 space-y-4 text-base leading-relaxed text-white/70">
                    {section.body}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </div>
  );
}
