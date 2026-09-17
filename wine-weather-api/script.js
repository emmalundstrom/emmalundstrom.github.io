const button = document.getElementById("wineButton");
const result = document.getElementById("result");

const weather = document.getElementById("weather");
const wine = document.getElementById("wine");
const wineDetails = document.getElementById("wineDetails");
const reason = document.getElementById("reason");
const wineImage = document.getElementById("wineImage");
const wineRegion = document.getElementById("wineRegion");

// =========================================
// GET WINE REGION FROM WIKIDATA
// =========================================

async function getWineRegion(region) {

  const regionIds = {
    "Napa Valley": "Q6159125",
    "Pfalz": "Q1011735",
    "California, USA": "Q99",
    "Provence": "Q101081"
  };

  const placeId = regionIds[region];

  if (!placeId) {
    return null;
  }

  const query = `
    SELECT ?placeLabel ?lat ?lon WHERE {

      VALUES ?place {
        wd:${placeId}
      }

      ?place rdfs:label ?placeLabel .

      ?place p:P625 ?statement .
      ?statement psv:P625 ?coordinate_node .

      ?coordinate_node wikibase:geoLatitude ?lat .
      ?coordinate_node wikibase:geoLongitude ?lon .

      FILTER(LANG(?placeLabel) = "en")
    }
  `;

  const url =
    "https://query.wikidata.org/sparql?format=json&query=" +
    encodeURIComponent(query);

  const response = await fetch(url);

  const data = await response.json();

  if (data.results.bindings.length > 0) {

    const result = data.results.bindings[0];

    return {
      name: result.placeLabel.value,
      lat: result.lat.value,
      lon: result.lon.value
    };

  }

  return null;
}

button.addEventListener("click", getWeather);


// =========================================
// GET WEATHER
// =========================================

async function getWeather() {

  const latitude = 59.3293;
  const longitude = 18.0686;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,weather_code`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    result.style.display = "block";

    setTimeout(() => {

  const targetPosition =
    result.getBoundingClientRect().top +
    window.scrollY -
    60;

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1200;

  let startTime = null;

  function smoothScroll(currentTime) {

    if (!startTime) {
      startTime = currentTime;
    }

    const progress =
      Math.min((currentTime - startTime) / duration, 1);

    const eased =
      1 - Math.pow(1 - progress, 3);

    window.scrollTo(
      0,
      startPosition + distance * eased
    );

    if (progress < 1) {
      requestAnimationFrame(smoothScroll);
    }

     }

     requestAnimationFrame(smoothScroll);

     }, 150);

    const temperature = data.current.temperature_2m;
    const rain = data.current.rain;

    weather.textContent =
      `Stockholm · ${temperature}°C · Rain: ${rain} mm`;


    // =========================================
    // UNDER 10°C
    // RUPPERTSBERGER RIESLING
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

        const region = await getWineRegion("Pfalz");

      if (region) {

       wineRegion.textContent =
       `FROM ${region.name} · ${region.lat}° N · ${Math.abs(region.lon)}° W`;

}

    }


    // =========================================
    // 10–16°C
    // BREAD & BUTTER PINOT NOIR
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

        const region = await getWineRegion("California, USA");

      if (region) {

       wineRegion.textContent =
       `FROM ${region.name} · ${region.lat}° N · ${Math.abs(region.lon)}° W`;

}

    }


    // =========================================
    // 17–22°C
    // BLACK STALLION CABERNET
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

        const region = await getWineRegion("Napa Valley");

      if (region) {

       wineRegion.textContent =
       `FROM ${region.name} · ${region.lat}° N · ${Math.abs(region.lon)}° W`;

}

    }


    // =========================================
    // 23°C+
    // MINUTY PRESTIGE ROSÉ
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

        const region = await getWineRegion("Provence");

      if (region) {

       wineRegion.textContent =
       `FROM ${region.name} · ${region.lat}° N · ${Math.abs(region.lon)}° E`;

}

    }
    
document.getElementById("project-footer").classList.add("show");

  }


  catch (error) {

    console.error("Something went wrong:", error);

    weather.textContent =
      "Sorry, we couldn't get the weather.";

  }

}