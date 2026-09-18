const fs = require("fs");
const cheerio = require("cheerio");

// Alla sidor vi vill hämta
const urls = [
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Tandläkare",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Tandläkare&page=2",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Tandläkare&page=3",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Tandläkare&page=4",
  "https://www.allabolag.se/bransch-s%C3%B6k?q=Tandläkare&page=5"
];

// Här kan en proxy läggas till senare.
// Just nu används ingen proxy.
const proxy = null;

// Väntar ett visst antal millisekunder
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Hämtar och skrapar en sida
async function scrapePage(url, pageNumber) {
  console.log(`\nHämtar sida ${pageNumber}: ${url}`);

  const fetchOptions = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache"
    },

    // Färsk hämtning
    cache: "no-store"
  };

  // Proxy kan läggas till här senare om det behövs.
  if (proxy) {
    fetchOptions.dispatcher = proxy;
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `HTTP-fel ${response.status}: ${response.statusText}`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const companies = [];

  // Hitta alla företagsobjekt på sidan
  $(".SearchResultCard-card").each((index, element) => {
    const card = $(element);

    // Företagsnamn
    const name = card
      .find("h2 a")
      .first()
      .text()
      .trim();

    let orgNumber = "";
    let phone = "";
    let address = "";

    // Hitta organisationsnummer
    card.find(".CardHeader-propertyList").each((index, element) => {
      const text = $(element)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (text.startsWith("Org.nr")) {
        orgNumber = text
          .replace("Org.nr", "")
          .trim();
      }
    });

    // Hitta telefonnummer
    phone = card
      .find(".CardHeader-phone")
      .text()
      .replace("Telefon", "")
      .replace(/\s+/g, " ")
      .trim();

    // Hitta adress
    card.find(".CardHeader-propertyList").each((index, element) => {
      const text = $(element)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (
        !text.startsWith("Org.nr") &&
        !text.startsWith("Telefon") &&
        text
      ) {
        address = text;
      }
    });

    companies.push({
      name,
      orgNumber,
      phone,
      address
    });
  });

  console.log(
    `Sida ${pageNumber}: ${companies.length} objekt hittades`
  );

  return companies;
}

// Huvudfunktion
async function scrape() {
  const allCompanies = [];

  for (let i = 0; i < urls.length; i++) {
    const pageNumber = i + 1;
    const url = urls[i];

    try {
      const companies = await scrapePage(url, pageNumber);

      allCompanies.push(...companies);
    } catch (error) {
      console.error(
        `Fel på sida ${pageNumber}: ${error.message}`
      );

      console.log("Fortsätter med nästa sida...");
    }

    // Vänta 500 ms innan nästa sida
    if (i < urls.length - 1) {
      console.log("Väntar 500 ms...");
      await sleep(500);
    }
  }

  // Skapa CSV-rubrik
  const rows = [
    [
      "Företagsnamn",
      "Organisationsnummer",
      "Telefonnummer",
      "Adress"
    ]
  ];

  // Lägg till alla företag
  for (const company of allCompanies) {
    rows.push([
      company.name,
      company.orgNumber,
      company.phone,
      company.address
    ]);
  }

  // Gör CSV
  const csv = rows
    .map((row) =>
      row
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  // Spara CSV
  fs.writeFileSync("foretag.csv", csv, "utf8");

  console.log("\n-----------------------------");
  console.log("Klart!");
  console.log(
    `Totalt ${allCompanies.length} objekt sparades.`
  );
  console.log("Filen heter: foretag.csv");
  console.log("-----------------------------");
}

scrape();