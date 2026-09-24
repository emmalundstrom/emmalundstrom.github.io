// =========================================
// WEATHER × WINE
// =========================================

const button =
    document.getElementById("wineButton");

const projectContent =
    document.getElementById("projectContent");

const weather =
    document.getElementById("weather");

const wine =
    document.getElementById("wine");

const wineDetails =
    document.getElementById("wineDetails");

const reason =
    document.getElementById("reason");

const wineImage =
    document.getElementById("wineImage");

const wineRegion =
    document.getElementById("wineRegion");



// =========================================
// WIKIDATA IDS
// =========================================

const regionIds = {

    "Napa Valley": "Q6159125",

    "Pfalz": "Q1011735",

    "California, USA": "Q99",

    "Provence": "Q101081"

};



// =========================================
// GET REGION FROM WIKIDATA API
// =========================================

async function getWineRegion(regionName) {

    const placeId =
        regionIds[regionName];


    if (!placeId) {

        return null;

    }


    /*
       Instead of running a larger SPARQL query,
       we request the Wikidata entity directly.

       Wikidata is therefore still a real API
       in the project.
    */

    const url =
        `https://www.wikidata.org/wiki/Special:EntityData/${placeId}.json`;


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Wikidata request failed"
            );

        }


        const data =
            await response.json();


        const entity =
            data.entities[placeId];


        if (!entity) {

            return null;

        }



        // =========================================
        // REGION NAME
        // =========================================

        const name =

            entity.labels?.en?.value ||

            regionName;



        // =========================================
        // COORDINATES — PROPERTY P625
        // =========================================

        const coordinateClaim =
            entity.claims?.P625?.[0];


        const coordinates =
            coordinateClaim
                ?.mainsnak
                ?.datavalue
                ?.value;


        if (!coordinates) {

            return {

                name: name,

                lat: null,

                lon: null

            };

        }


        return {

            name: name,

            lat: coordinates.latitude,

            lon: coordinates.longitude

        };

    }


    catch (error) {

        console.error(
            "Could not get region from Wikidata:",
            error
        );


        return null;

    }

}



// =========================================
// SHOW REGION
// =========================================

function showRegion(region) {

    if (!region) {

        wineRegion.textContent =
            "";

        return;

    }


    /*
       If Wikidata returned the region
       but no coordinates, show the name.
    */

    if (
        region.lat === null ||
        region.lon === null
    ) {

        wineRegion.textContent =
            `FROM ${region.name}`;

        return;

    }


    const latitude =
        Number(region.lat);


    const longitude =
        Number(region.lon);


    const latDirection =
        latitude >= 0
            ? "N"
            : "S";


    const lonDirection =
        longitude >= 0
            ? "E"
            : "W";


    wineRegion.textContent =

        `FROM ${region.name} · ` +

        `${Math.abs(latitude).toFixed(1)}° ${latDirection} · ` +

        `${Math.abs(longitude).toFixed(1)}° ${lonDirection}`;

}



// =========================================
// LOAD REGION
// =========================================

async function loadRegion(regionName) {

    /*
       Small loading state while Wikidata
       responds.
    */

    wineRegion.textContent =
        "GETTING REGION DATA...";


    const region =
        await getWineRegion(
            regionName
        );


    if (region) {

        showRegion(region);

    }

    else {

        wineRegion.textContent =
            "";

    }

}



// =========================================
// BUTTON
// =========================================

button.addEventListener(
    "click",
    getWeather
);



// =========================================
// SMOOTH SCROLL
// =========================================

function scrollToWine() {

    const card =
        document.querySelector(
            ".wine-card"
        );


    if (!card) {

        return;

    }


    const navbar =
        document.querySelector(
            ".project-nav"
        );


    const navbarHeight =
        navbar
            ? navbar.offsetHeight
            : 76;


    const cardTop =

        card.getBoundingClientRect().top +

        window.scrollY;


    /*
       Stop slightly above the wine card
       so CURRENT WEATHER stays visible.
    */

    const targetPosition =

        cardTop -

        navbarHeight -

        35;


    const startPosition =
        window.scrollY;


    const distance =

        targetPosition -

        startPosition;


    /*
       Slow, smooth portfolio-style slide.
    */

    const duration =
        1500;


    let startTime =
        null;



    function animation(currentTime) {


        if (!startTime) {

            startTime =
                currentTime;

        }


        const progress =

            Math.min(

                (currentTime - startTime) /

                duration,

                1

            );


        /*
           Ease in / ease out
        */

        const eased =

            progress < 0.5

                ? 4 *

                  progress *

                  progress *

                  progress

                : 1 -

                  Math.pow(

                      -2 * progress + 2,

                      3

                  ) / 2;



        window.scrollTo(

            0,

            startPosition +

            distance * eased

        );



        if (progress < 1) {

            requestAnimationFrame(
                animation
            );

        }

    }


    requestAnimationFrame(
        animation
    );

}



// =========================================
// GET WEATHER
// =========================================

async function getWeather() {


    const latitude =
        59.3293;


    const longitude =
        18.0686;


    const weatherUrl =

        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,weather_code`;



    // =========================================
    // BUTTON LOADING STATE
    // =========================================

    button.disabled =
        true;


    button.textContent =
        "CHECKING WEATHER...";



    try {


        // =========================================
        // OPEN-METEO API
        // =========================================

        const response =
            await fetch(
                weatherUrl
            );


        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }


        const data =
            await response.json();


        const temperature =
            data.current.temperature_2m;


        const rain =
            data.current.rain;



        // =========================================
        // SHOW WEATHER
        // =========================================

        weather.textContent =

            `Stockholm · ${temperature}°C · Rain: ${rain} mm`;



        let selectedRegion =
            "";



        // =========================================
        // UNDER 10°C
        // =========================================

        if (temperature < 10) {


            wine.textContent =

                "Ruppertsberger Von Wallberg Riesling Trocken, 2025";


            wineDetails.textContent =

                "Germany · Pfalz · White";


            reason.textContent =

                "Fresh, fruity and crisp — a bright choice for a colder day.";


            wineImage.src =

                "images/ruppertsberger.png";


            selectedRegion =
                "Pfalz";

        }



        // =========================================
        // 10–16°C
        // =========================================

        else if (temperature < 17) {


            wine.textContent =

                "Bread & Butter Pinot Noir, 2024";


            wineDetails.textContent =

                "USA · California · Red";


            reason.textContent =

                "Soft, fruity and smooth — a lighter red for a cool but not cold day.";


            wineImage.src =

                "images/bread-butter.png";


            selectedRegion =
                "California, USA";

        }



        // =========================================
        // 17–22°C
        // =========================================

        else if (temperature < 23) {


            wine.textContent =

                "Black Stallion Heritage Cabernet Sauvignon";


            wineDetails.textContent =

                "USA · California · Red";


            reason.textContent =

                "A warmer day calls for a rich and structured Cabernet Sauvignon.";


            wineImage.src =

                "images/black-stallion.png";


            selectedRegion =
                "Napa Valley";

        }



        // =========================================
        // 23°C+
        // =========================================

        else {


            wine.textContent =

                "Minuty Prestige Rosé 2025";


            wineDetails.textContent =

                "France · Provence · Côtes de Provence";


            reason.textContent =

                "Warm weather calls for something light, fresh and refreshing.";


            wineImage.src =

                "images/minuty-prestige.png";


            selectedRegion =
                "Provence";

        }



        // =========================================
        // START WIKIDATA IMMEDIATELY
        // =========================================

        /*
           Wikidata starts loading here.

           We do NOT wait for it before
           showing the wine card.
        */

        loadRegion(
            selectedRegion
        );



        // =========================================
        // REVEAL REST OF PAGE
        // =========================================

        projectContent.classList.add(
            "is-visible"
        );


        document.body.classList.remove(
            "page-locked"
        );



        // =========================================
        // SMOOTH SCROLL
        // =========================================

        /*
           Two animation frames give the
           browser time to calculate the
           newly visible wine card.
        */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                scrollToWine();

            });

        });



        // =========================================
        // RESET BUTTON
        // =========================================

        button.disabled =
            false;


        button.textContent =
            "FIND MY WINE →";

    }



    // =========================================
    // ERROR
    // =========================================

    catch (error) {


        console.error(
            "Something went wrong:",
            error
        );


        button.disabled =
            false;


        button.textContent =
            "TRY AGAIN →";

    }

}