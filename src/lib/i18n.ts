export type Language = "no" | "en";

export const translations = {
  nav: {
    home:     { no: "Hjem",          en: "Home" },
    about:    { no: "Om meg",        en: "About" },
    projects: { no: "Maler",         en: "Templates" },
    contact:  { no: "Kontakt",       en: "Contact" },
    cta:      { no: "La oss snakke", en: "Let's Talk" },
  },

  hero: {
    badge:     { no: "Tilgjengelig for nye prosjekter", en: "Available for new projects" },
    headline1: { no: "Nettsider som",                  en: "Websites that" },
    highlight: { no: "jobber hardt",                   en: "work hard" },
    headline2: { no: "for din bedrift",                en: "for your business" },
    sub: {
      no: "Sandnes Productions lager raske, moderne nettsider for småbedrifter. Fra landingssider til fulle webapper — la oss gjøre visjonen din til virkelighet.",
      en: "Sandnes Productions builds fast, modern websites for small businesses. From landing pages to full web apps — let's bring your vision to life.",
    },
    cta_primary:   { no: "Se mine maler",    en: "See My Templates" },
    cta_secondary: { no: "Ta kontakt",       en: "Get in Touch" },
    stat1_num:   { no: "10+",  en: "10+" },
    stat1_label: { no: "Prosjekter levert",      en: "Projects Delivered" },
    stat2_num:   { no: "100%", en: "100%" },
    stat2_label: { no: "Fornøyde kunder",        en: "Client Satisfaction" },
    stat3_num:   { no: "5+",   en: "5+" },
    stat3_label: { no: "År med erfaring",        en: "Years Experience" },
    scroll:      { no: "Bla for å utforske",     en: "Scroll to explore" },
  },

  about: {
    section_label: { no: "Om meg",                      en: "About Me" },
    heading:       { no: "Personen bak koden",          en: "The person behind the code" },
    role:          { no: "Hei, jeg er en frilans-webutvikler", en: "Hi, I'm a freelance web developer" },
    bio1: {
      no: "Jeg bygger nettsider og webapplikasjoner som hjelper småbedrifter med å vokse på nett. Med lidenskap for ren kode og gjennomtenkt design, forvandler jeg ideer til raske, tilgjengelige og visuelt slående digitale opplevelser.",
      en: "I build websites and web applications that help small businesses grow online. With a passion for clean code and thoughtful design, I turn ideas into fast, accessible, and visually compelling digital experiences.",
    },
    bio2: {
      no: "Under Sandnes Productions-paraplyen jobber jeg tett med hver klient for å forstå målene deres og levere løsninger som faktisk gjør en forskjell — enten det er en skarp landingsside, en full nettbutikk eller en skreddersydd webapp.",
      en: "Under the Sandnes Productions banner, I work closely with each client to understand their goals and deliver solutions that actually move the needle — whether that's a sharp landing page, a full e-commerce store, or a custom web app.",
    },
    bio3: {
      no: "Når jeg ikke koder, utforsker jeg ny teknologi, tukler med 3D-grafikk eller henter inspirasjon fra god design uansett hvor jeg finner det.",
      en: "When I'm not coding, I'm exploring new tech, tinkering with 3D graphics, or drawing inspiration from great design wherever I find it.",
    },
    tools_label:  { no: "Verktøy og plattformer", en: "Tools & Platforms" },
    skills_label: { no: "Tekniske ferdigheter",   en: "Technical Skills" },
  },

  templates: {
    section_label: { no: "Maler",                          en: "Templates" },
    heading:       { no: "Ferdige maler for din bransje",  en: "Ready-made templates for your industry" },
    sub: {
      no: "Velg en mal som passer din bedrift — så skreddersyr jeg den akkurat slik du vil ha den. Farger, tekst, funksjoner og alt annet tilpasses deg.",
      en: "Pick a template that fits your business — I'll tailor it exactly the way you want. Colours, copy, features and everything else adapted to you.",
    },
    pitch_label:   { no: "Hvordan det fungerer",           en: "How it works" },
    pitch1_title:  { no: "Velg en mal",                    en: "Pick a template" },
    pitch1_desc: {
      no: "Bla gjennom malene og finn en som passer din bransje.",
      en: "Browse the templates and find one that suits your industry.",
    },
    pitch2_title:  { no: "Vi tilpasser",                   en: "We tailor it" },
    pitch2_desc: {
      no: "Jeg tilpasser alt — logo, farger, tekst, bilder og funksjoner.",
      en: "I customise everything — logo, colours, copy, images and features.",
    },
    pitch3_title:  { no: "Du går live",                    en: "You go live" },
    pitch3_desc: {
      no: "Vi lanserer nettsiden din og du er klar til å ta imot kunder.",
      en: "We launch your site and you're ready to welcome customers.",
    },
    badge_available: { no: "Tilgjengelig", en: "Available" },
    badge_soon:      { no: "Kommer snart", en: "Coming Soon" },
    demo_btn:        { no: "Se demo",      en: "View Demo" },
    tailored_note: {
      no: "Alle maler skreddersys til din bedrift",
      en: "All templates are tailored to your business",
    },
    cms_title: {
      no: "Ingen kode? Ingen problem.",
      en: "No code? No problem.",
    },
    cms_desc: {
      no: "Alle maler leveres med Payload CMS — et brukervennlig administrasjonspanel der du selv kan oppdatere tekst, bilder, priser og innhold når du vil. Ingen utvikler nødvendig.",
      en: "Every template comes with Payload CMS — a user-friendly admin panel where you can update text, images, prices and content whenever you like. No developer needed.",
    },

    t1_title: { no: "Barber & Frisør",          en: "Barber & Hair Salon" },
    t1_desc: {
      no: "Stilren nettside med tjenesteoversikt, prisliste, galleri og kontaktskjema. Perfekt for frisører og barbershops.",
      en: "Sleek website with service overview, price list, gallery and contact form. Perfect for barbers and hair salons.",
    },
    t2_title: { no: "Nettbutikk",               en: "E-commerce Store" },
    t2_desc: {
      no: "Komplett nettbutikk med produktkatalog, handlekurv og betaling. Skalerbar og rask.",
      en: "Full e-commerce store with product catalogue, cart and checkout. Scalable and fast.",
    },
    t3_title: { no: "Restaurant & Kafé",         en: "Restaurant & Café" },
    t3_desc: {
      no: "Appetittvekkende design med meny, åpningstider, bordbestilling og Google Maps.",
      en: "Appetising design with menu, opening hours, table booking and Google Maps.",
    },
    t4_title: { no: "Skjønnhetssalong & Spa",   en: "Beauty Salon & Spa" },
    t4_desc: {
      no: "Elegant og feminin mal med tjenester, prisliste, timebestilling og galleri.",
      en: "Elegant and feminine template with services, price list, appointment booking and gallery.",
    },
    t5_title: { no: "Treningsstudio & PT",       en: "Gym & Personal Trainer" },
    t5_desc: {
      no: "Energisk design med timeplaner, trenerprofiler, medlemskap og påmelding.",
      en: "Energetic design with class schedules, trainer profiles, memberships and sign-up.",
    },
    t6_title: { no: "Fotograf",                  en: "Photographer" },
    t6_desc: {
      no: "Galleri-fokusert design som lar bildene dine ta hovedrollen. Med kontakt og bookingskjema.",
      en: "Gallery-focused design that lets your images take centre stage. With contact and booking form.",
    },
  },

  contact: {
    section_label: { no: "Kontakt",                        en: "Contact" },
    heading:       { no: "La oss bygge noe sammen",        en: "Let's build something together" },
    sub: {
      no: "Har du et prosjekt i tankene? Fyll ut skjemaet og jeg svarer innen 24 timer.",
      en: "Have a project in mind? Fill in the form and I'll get back to you within 24 hours.",
    },
    sidebar_heading: { no: "Klar til å starte?",          en: "Ready to get started?" },
    sidebar_sub: {
      no: "Enten du har en detaljert brief eller bare en grov idé, er jeg glad for å prate og finne den beste tilnærmingen for prosjektet ditt.",
      en: "Whether you have a detailed brief or just a rough idea, I'm happy to chat and figure out the best approach for your project.",
    },
    label_email:    { no: "E-post",           en: "Email" },
    label_location: { no: "Sted",             en: "Location" },
    location_val:   { no: "Norge — Tilgjengelig Globalt", en: "Norway — Available Worldwide" },
    label_response: { no: "Responstid",       en: "Response Time" },
    response_val:   { no: "Innen 24 timer",   en: "Within 24 hours" },
    find_online:    { no: "Finn meg på nett", en: "Find me online" },

    field_name:        { no: "Ditt navn *",         en: "Your Name *" },
    field_email:       { no: "E-postadresse *",      en: "Email Address *" },
    field_business:    { no: "Bedrift / Selskap",    en: "Business / Company" },
    field_budget:      { no: "Budsjettramme *",      en: "Budget Range *" },
    field_message:     { no: "Fortell om prosjektet ditt *", en: "Tell me about your project *" },
    placeholder_name:  { no: "Kari Nordmann",        en: "Jane Smith" },
    placeholder_email: { no: "kari@bedrift.no",      en: "jane@company.com" },
    placeholder_biz:   { no: "Min Fantastiske Bedrift", en: "My Awesome Business" },
    placeholder_msg:   { no: "Beskriv prosjektet ditt, mål og eventuelle spesifikke krav...", en: "Describe your project, goals, and any specific requirements..." },
    budget_default:    { no: "Velg en ramme...",     en: "Select a range..." },
    send:              { no: "Send melding",          en: "Send Message" },
    sending:           { no: "Sender...",             en: "Sending..." },
    disclaimer:        { no: "Jeg svarer innen 24 timer. Aldri spam.", en: "I'll respond within 24 hours. No spam, ever." },

    success_heading: { no: "Melding sendt!",        en: "Message sent!" },
    success_sub: {
      no: "Takk for at du tok kontakt. Jeg svarer innen 24 hours.",
      en: "Thanks for reaching out. I'll get back to you within 24 hours.",
    },
    success_again: { no: "Send en ny melding", en: "Send another message" },

    err_name:    { no: "Vennligst skriv inn navnet ditt",      en: "Please enter your name" },
    err_email:   { no: "Vennligst skriv inn en gyldig e-post", en: "Please enter a valid email" },
    err_budget:  { no: "Vennligst velg en budsjettramme",      en: "Please select a budget range" },
    err_message: { no: "Fortell meg litt mer (min. 20 tegn)",  en: "Please tell me a bit more (min. 20 characters)" },
  },

  footer: {
    tagline: { no: "Laget med omhu i Norge.", en: "Crafted with care in Norway." },
  },
} as const;

export function t(
  key: { no: string; en: string },
  lang: Language
): string {
  return key[lang];
}