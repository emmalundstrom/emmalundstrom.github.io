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
   7 INSIGHTS - API
========================================= */

const insightText = document.getElementById("insight-text");
const insightAuthor = document.getElementById("insight-author");
const nextInsight = document.getElementById("next-insight");

let insightNumber = 1;
const insightNumberDisplay = document.querySelector(".insight-number");

async function getInsight() {

    try {

        insightNumberDisplay.textContent =
            `${String(insightNumber).padStart(2, "0")} / 07`;

        const response = await fetch(
            "https://www.drivebird.com/api/quotes/random"
        );

        const data = await response.json();

        const quote = data.data[0];

        insightText.textContent = `"${quote.quote}"`;
        insightAuthor.textContent = `— ${quote.author}`;

        insightNumber++;

        if (insightNumber > 7) {
            insightNumber = 1;
        }

    } catch (error) {

        insightText.textContent =
            "Could not load an insight.";

        insightAuthor.textContent = "";

        console.error("API error:", error);

    }

}

getInsight();

nextInsight.addEventListener("click", getInsight);