// =========================================
// DATA LAYER
// =========================================

window.dataLayer = window.dataLayer || [];

// =========================================

// CUSTOM DATA LAYER EVENTS

// =========================================

document.querySelectorAll(".nav-link").forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({

            event: "portfolio_navigation_click",

            link_name: link.textContent.trim()

        });

    });

});

const linkedinLinks = document.querySelectorAll(".linkedin-link");

linkedinLinks.forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({

            event: "portfolio_linkedin_click",

            link_name: "LinkedIn"

        });

    });

});

const contactLinks = document.querySelectorAll(".contact-links a");

contactLinks.forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({

            event: "portfolio_contact_click",

            link_name: link.textContent.trim()

        });

    });

});

/* =========================================

   EMMA LUNDSTRÖM

   PORTFOLIO INTERACTIONS

========================================= */

/* =========================================

   PARALLAX IMAGES

========================================= */

const parallaxImages = document.querySelectorAll(".parallax-image");

function updateParallax() {

    parallaxImages.forEach((image) => {

        const container = image.closest(".parallax-container");

        if (!container) return;

        const rect = container.getBoundingClientRect();

        const windowHeight = window.innerHeight;

        if (rect.bottom > 0 && rect.top < windowHeight) {

            const progress =

                (rect.top + rect.height / 2 - windowHeight / 2)

                / windowHeight;

            const movement = progress * -180;

            image.style.transform =

                `translate3d(0, ${movement}px, 0)`;

        }

    });

}

/* =========================================

   HERO SCROLL EFFECT

========================================= */

const hero = document.querySelector(".hero");

const heroContent = document.querySelector(".hero-content");

const heroStars = document.querySelector(".stars");
const aboutStars = document.querySelector(".stars-about");
const contactStars = document.querySelector(".stars-contact");
const insightsStars = document.querySelector(".stars-insights");

function updateHero() {

    if (!hero) return;

    const scrollPosition = window.scrollY;

    const heroHeight = hero.offsetHeight;

    const progress =

        Math.min(scrollPosition / heroHeight, 1);

    /*

        Text slowly moves upward

        when the user scrolls.

    */

    if (heroContent) {

        heroContent.style.transform =

            `translate3d(0, ${progress * -80}px, 0)`;

        heroContent.style.opacity =

            1 - progress * 0.7;

    }

    /*

        Stars move slightly slower

        to create depth.

    */

    if (heroStars) {

        heroStars.style.transform =

            `translate3d(0, ${progress * 60}px, 0)`;

        heroStars.style.opacity =

            0.8 - progress * 0.4;

    }

}

/* =========================================

   SCROLL EVENT

========================================= */

function updatePage() {

    updateParallax();

    updateHero();

}

window.addEventListener(

    "scroll",

    updatePage,

    { passive: true }

);

window.addEventListener(

    "resize",

    updatePage

);

/* Initial position */

updatePage();
/* =========================================
   SECTION STAR MOVEMENT
========================================= */

function updateSectionStars() {

    const scrollPosition = window.scrollY;

    if (aboutStars) {
        aboutStars.style.transform =
            `translate3d(0, ${scrollPosition * 0.015}px, 0)`;
    }

    if (contactStars) {
        contactStars.style.transform =
            `translate3d(0, ${scrollPosition * 0.025}px, 0)`;
    }

        if (insightsStars) {
        insightsStars.style.transform =
            `translate3d(0, ${scrollPosition * 0.02}px, 0)`;
    }
}


/* Update page */

function updatePage() {

    updateParallax();
    updateHero();
    updateSectionStars();

}
/* =========================================
   MARKET SNAPSHOT - API
========================================= */

const marketSelect = document.getElementById("market-select");
const marketName = document.getElementById("market-name");
const marketPopulation = document.getElementById("market-population");
const marketCurrency = document.getElementById("market-currency");
const marketRegion = document.getElementById("market-region");

async function getMarket(countryCode) {

    try {

       const response = await fetch(
    `https://countries.dev/alpha/${countryCode}`
);
;

const data = await response.json();

const country = Array.isArray(data)
    ? data[0]
    : data;

        marketName.textContent = country.name.common;

        marketPopulation.textContent =
            country.population.toLocaleString();

       marketCurrency.textContent = country.currencies[0].code;

        marketRegion.textContent = country.region;

    } catch (error) {

        marketName.textContent = "Could not load market data.";
        marketPopulation.textContent = "";
        marketCurrency.textContent = "";
        marketRegion.textContent = "";

        console.error("API error:", error);

    }

}

getMarket("SE");

marketSelect.addEventListener("change", () => {

    getMarket(marketSelect.value);

});