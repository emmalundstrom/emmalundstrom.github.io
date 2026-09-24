// =========================================
// EMMA LUNDSTRÖM — PORTFOLIO
// =========================================


// =========================================
// DATA LAYER
// =========================================

window.dataLayer = window.dataLayer || [];


// =========================================
// NAVIGATION TRACKING
// =========================================

document.querySelectorAll(".nav-link").forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({
            event: "portfolio_navigation_click",
            link_name: link.textContent.trim(),
            link_type: "navigation",
            destination: link.getAttribute("href")
        });

    });

});


// =========================================
// LINKEDIN TRACKING
// =========================================

document.querySelectorAll(".linkedin-link").forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({
            event: "portfolio_linkedin_click",
            link_name: "LinkedIn"
        });

    });

});


// =========================================
// CONTACT TRACKING
// =========================================

document.querySelectorAll(".contact-links a").forEach((link) => {

    link.addEventListener("click", () => {

        window.dataLayer.push({
            event: "portfolio_contact_click",
            link_name: link.textContent.trim()
        });

    });

});


// =========================================
// SELECTED WORK SLIDER
// =========================================

const projectSlider =
    document.querySelector(".project-slider");

const previousButton =
    document.querySelector(".slider-prev");

const nextButton =
    document.querySelector(".slider-next");


// Calculate how far one card should move

function getCardStep() {

    if (!projectSlider) return 0;

    const card =
        projectSlider.querySelector(".project-card");

    if (!card) return 0;

    const sliderStyles =
        window.getComputedStyle(projectSlider);

    const gap =
        parseFloat(sliderStyles.gap) || 0;

    return card.getBoundingClientRect().width + gap;

}


// =========================================
// NEXT PROJECT
// =========================================

if (nextButton && projectSlider) {

    nextButton.addEventListener("click", () => {

        projectSlider.scrollBy({
            left: getCardStep(),
            behavior: "smooth"
        });

    });

}


// =========================================
// PREVIOUS PROJECT
// =========================================

if (previousButton && projectSlider) {

    previousButton.addEventListener("click", () => {

        projectSlider.scrollBy({
            left: -getCardStep(),
            behavior: "smooth"
        });

    });

}


// =========================================
// PROJECT CLICK TRACKING
// + REMEMBER SCROLL POSITION
// =========================================

document.querySelectorAll(".project-card").forEach((project) => {

    project.addEventListener("click", () => {

        const title =
            project.querySelector("h3");

        // Save exact position on portfolio
        sessionStorage.setItem(
            "portfolioScrollPosition",
            window.scrollY
        );

        // Track project click
        window.dataLayer.push({
            event: "portfolio_project_click",
            project_name:
                title ? title.textContent.trim() : "Unknown",
            destination:
                project.getAttribute("href")
        });

    });

});


// =========================================
// RESTORE SCROLL POSITION
// =========================================

window.addEventListener("pageshow", () => {

    const savedPosition =
        sessionStorage.getItem("portfolioScrollPosition");

    if (savedPosition !== null) {

        // Temporarily disable smooth scrolling
        const previousScrollBehavior =
            document.documentElement.style.scrollBehavior;

        document.documentElement.style.scrollBehavior = "auto";

        window.scrollTo(
            0,
            Number(savedPosition)
        );

        document.documentElement.style.scrollBehavior =
            previousScrollBehavior;

        sessionStorage.removeItem(
            "portfolioScrollPosition"
        );

    }

});
/* =========================================
   PROJECT CLICKS — GTM / GA4
========================================= */

document.querySelectorAll(".project-card").forEach((project) => {

    project.addEventListener("click", function () {

        let projectName = "Unknown";

        if (project.classList.contains("project-arsenal")) {
            projectName = "Arsenal";
        }

        if (project.classList.contains("project-wine")) {
            projectName = "Weather × Wine";
        }

        if (project.classList.contains("project-global")) {
            projectName = "Global Data";
        }

        if (project.classList.contains("project-scraping")) {
            projectName = "Scraping";
        }

        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
            event: "portfolio_project_click",
            project_name: projectName
        });

    });

});