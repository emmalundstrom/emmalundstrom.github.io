/* =========================================
   AROMA ROAST — CREATIVE CAROUSEL
   DIRECTION SWITCHING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const viewport = document.getElementById("creativeViewport");
    const arrow = document.getElementById("creativeNext");
    const cards = document.querySelectorAll(".creative-card");

    if (!viewport || !arrow || !cards.length) {
        return;
    }

    let direction = 1;


    /* =====================================
       GET CARD STEP
    ====================================== */

    function getCardStep() {

        const track = document.querySelector(".creative-track");

        const cardWidth = cards[0].getBoundingClientRect().width;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        return cardWidth + gap;
    }


    /* =====================================
       UPDATE ARROW DIRECTION
    ====================================== */

    function updateArrow() {

        const maxScroll =
            viewport.scrollWidth - viewport.clientWidth;

        if (maxScroll <= 1) {
            arrow.hidden = true;
            return;
        }

        arrow.hidden = false;

        const atEnd =
            viewport.scrollLeft >= maxScroll - 5;

        const atStart =
            viewport.scrollLeft <= 5;

        if (atEnd) {
            direction = -1;
        }

        if (atStart) {
            direction = 1;
        }

        arrow.textContent = direction === 1 ? "→" : "←";

        arrow.setAttribute(
            "aria-label",
            direction === 1
                ? "Show next advertisement"
                : "Show previous advertisement"
        );

    }


    /* =====================================
       ARROW CLICK
    ====================================== */

    arrow.addEventListener("click", () => {

        viewport.scrollBy({
            left: getCardStep() * direction,
            behavior: "smooth"
        });

    });


    /* =====================================
       UPDATE ON SCROLL
    ====================================== */

    viewport.addEventListener(
        "scroll",
        updateArrow,
        { passive: true }
    );


    /* =====================================
       UPDATE ON RESIZE
    ====================================== */

    window.addEventListener("resize", updateArrow);


    /* =====================================
       INITIALIZE
    ====================================== */

    updateArrow();

});
function goBackToPortfolio(event) {
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
        event.preventDefault();
        window.history.back();
        return false;
    }

    return true;
}