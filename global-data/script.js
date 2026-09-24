const countrySelect =
    document.getElementById("country-select");

const countryName =
    document.getElementById("country-name");

const countryPopulation =
    document.getElementById("country-population");

const countryCurrency =
    document.getElementById("country-currency");

const countryRegion =
    document.getElementById("country-region");

const countryCapital =
    document.getElementById("country-capital");

const countryFlag =
    document.getElementById("country-flag");

const countryCode =
    document.getElementById("country-code");



/* =========================================
   GET COUNTRY DATA
========================================= */

async function getCountryData(selectedCountryCode) {


    try {


        /* =========================================
           RESET FLAG
        ========================================= */

        countryFlag.classList.remove(
            "visible"
        );


        countryCode.textContent =
            selectedCountryCode;



        /* =========================================
           API
        ========================================= */

        const response = await fetch(

            `https://countries.dev/alpha/${selectedCountryCode}`

        );


        if (!response.ok) {

            throw new Error(
                "Could not load country data"
            );

        }


        const country =
            await response.json();



        /* =========================================
           COUNTRY NAME
        ========================================= */

        const name =

            country.name?.common ||

            country.name ||

            "N/A";


        countryName.textContent =
            name;



        /* =========================================
           POPULATION
        ========================================= */

        countryPopulation.textContent =

            country.population

                ? country.population.toLocaleString(
                    "en-US"
                )

                : "N/A";



        /* =========================================
           CURRENCY
        ========================================= */

        if (country.currencies) {


            const currencyCode =

                Array.isArray(
                    country.currencies
                )

                    ? country.currencies[0]?.code

                    : Object.keys(
                        country.currencies
                    )[0];


            countryCurrency.textContent =

                currencyCode ||

                "N/A";

        }


        else {


            countryCurrency.textContent =
                "N/A";

        }



        /* =========================================
           REGION
        ========================================= */

        countryRegion.textContent =

            country.region ||

            "N/A";



        /* =========================================
           CAPITAL
        ========================================= */

        countryCapital.textContent =

            Array.isArray(
                country.capital
            )

                ? country.capital[0]

                : country.capital ||

                  "N/A";



        /* =========================================
           FLAG
        ========================================= */

        const flagURL =

            country.flags?.svg ||

            country.flags?.png ||

            country.flag ||

            null;


        if (flagURL) {


            countryFlag.src =
                flagURL;


            countryFlag.alt =
                `${name} flag`;


            countryFlag.onload = () => {


                countryFlag.classList.add(
                    "visible"
                );


            };


        }


        else {


            countryFlag.removeAttribute(
                "src"
            );


            countryFlag.alt =
                "";


        }


    }



    /* =========================================
       ERROR
    ========================================= */

    catch (error) {


        console.error(
            "Global Data error:",
            error
        );


        countryName.textContent =
            "Unable to load data";


        countryPopulation.textContent =
            "—";


        countryCurrency.textContent =
            "—";


        countryRegion.textContent =
            "—";


        countryCapital.textContent =
            "—";


        countryCode.textContent =
            "—";


        countryFlag.classList.remove(
            "visible"
        );


    }

}



/* =========================================
   COUNTRY CHANGE
========================================= */

countrySelect.addEventListener(

    "change",

    function () {


        getCountryData(
            this.value
        );


    }

);