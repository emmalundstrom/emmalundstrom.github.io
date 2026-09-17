/* =========================================================
   Arsenal: gjorda och insläppta mål i Premier League
   Data: Premier Leagues officiella tabeller (premierleague.com)
   Enhet: antal mål (st) per säsong, 38 matcher per säsong
   ========================================================= */

/* ---------------------------------------------------------
   1. Datan
   Varje objekt är en avslutad säsong. Vill du lägga till en
   säsong räcker det att skriva en ny rad här - diagrammet och
   tabellen uppdateras automatiskt.
   --------------------------------------------------------- */
const sasonger = [
  { sasong: "2021/22", gjorda: 61, inslappta: 48, placering: 5 },
  { sasong: "2022/23", gjorda: 88, inslappta: 43, placering: 2 },
  { sasong: "2023/24", gjorda: 91, inslappta: 29, placering: 2 },
  { sasong: "2024/25", gjorda: 69, inslappta: 34, placering: 2 },
  { sasong: "2025/26", gjorda: 71, inslappta: 27, placering: 1 }
];

/* ---------------------------------------------------------
   2. Tabellen under diagrammet
   --------------------------------------------------------- */
function ritaTabell(data) {
  const kropp = document.getElementById("tabellKropp");
  kropp.innerHTML = data.map(rad => {
    const skillnad = rad.gjorda - rad.inslappta;
    return `
      <tr>
        <th scope="row">${rad.sasong}</th>
        <td>${rad.gjorda}</td>
        <td>${rad.inslappta}</td>
        <td>+${skillnad}</td>
        <td>${rad.placering}</td>
      </tr>`;
  }).join("");
}

/* ---------------------------------------------------------
   3. Diagrammet
   --------------------------------------------------------- */
function ritaDiagram(data) {
  const yta = document.getElementById("malDiagram");

  new Chart(yta, {
    type: "bar",
    data: {
      labels: data.map(d => d.sasong),
      datasets: [
        {
          label: "Goals scored",
          data: data.map(d => d.gjorda),
          backgroundColor: "#db0007",
          borderRadius: 2,
          maxBarThickness: 44
        },
        {
          label: "Goals conceded",
          data: data.map(d => d.inslappta),
          backgroundColor: "#2f4a63",
          borderRadius: 2,
          maxBarThickness: 44
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      font: { family: "Archivo, Arial, sans-serif" },
      scales: {
        y: {
          beginAtZero: true, // y-axeln börjar på noll så staplarna inte överdriver skillnader
          title: { display: true, text: "Number of goals (st)" },
          ticks: { stepSize: 20 },
          grid: { color: "#e6e3dd" }
        },
        x: {
          title: { display: true, text: "Season" },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          position: "top",
          align: "start",
          labels: { boxWidth: 12, boxHeight: 12 }
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} goals`
          }
        }
      }
    }
  });
}

/* ---------------------------------------------------------
   4. Kör igång
   --------------------------------------------------------- */
ritaDiagram(sasonger);
ritaTabell(sasonger);