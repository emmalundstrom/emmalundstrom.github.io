const countrySelect = document.getElementById("country-select");

const countryName = document.getElementById("country-name");
const countryPopulation = document.getElementById("country-population");
const countryCurrency = document.getElementById("country-currency");
const countryRegion = document.getElementById("country-region");
const countryCapital = document.getElementById("country-capital");


async function getCountryData(countryCode) {

    try {

        
        const response = await fetch(
    `https://countries.dev/alpha/${countryCode}`
);


        if (!response.ok) {
            throw new Error("Could not load country data");
        }


        const country = await response.json();


        // COUNTRY NAME
        countryName.textContent =
            country.name?.common || country.name || "N/A";


        // POPULATION
        countryPopulation.textContent =
            country.population
                ? country.population.toLocaleString("en-US")
                : "N/A";


        // CURRENCY
        if (country.currencies) {

            const currencyCode = Array.isArray(country.currencies)
                ? country.currencies[0]?.code
                : Object.keys(country.currencies)[0];

            countryCurrency.textContent =
                currencyCode || "N/A";

        } else {

            countryCurrency.textContent = "N/A";

        }


        // REGION
        countryRegion.textContent =
            country.region || "N/A";


        // CAPITAL
        countryCapital.textContent =
            Array.isArray(country.capital)
                ? country.capital[0]
                : country.capital || "N/A";


    } catch (error) {

        console.error("Global Data error:", error);

        countryName.textContent = "Unable to load data";
        countryPopulation.textContent = "—";
        countryCurrency.textContent = "—";
        countryRegion.textContent = "—";
        countryCapital.textContent = "—";

    }
}


// CHANGE COUNTRY
countrySelect.addEventListener("change", function () {

    getCountryData(this.value);

});
