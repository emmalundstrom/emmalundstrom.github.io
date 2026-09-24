/* =========================================================
   ARSENAL GOAL TRENDS
   Premier League — 2021/22 to 2025/26
========================================================= */


/* =========================================
   DATA
========================================= */

const sasonger = [

  {
    sasong: "2021/22",
    gjorda: 61,
    inslappta: 48,
    placering: 5
  },

  {
    sasong: "2022/23",
    gjorda: 88,
    inslappta: 43,
    placering: 2
  },

  {
    sasong: "2023/24",
    gjorda: 91,
    inslappta: 29,
    placering: 2
  },

  {
    sasong: "2024/25",
    gjorda: 69,
    inslappta: 34,
    placering: 2
  },

  {
    sasong: "2025/26",
    gjorda: 71,
    inslappta: 27,
    placering: 1
  }

];



/* =========================================
   TABLE
========================================= */

function ritaTabell(data) {

  const kropp = document.getElementById("tabellKropp");


  kropp.innerHTML = data.map(rad => {

    const skillnad = rad.gjorda - rad.inslappta;


    return `

      <tr>

        <td>${rad.sasong}</td>

        <td>${rad.gjorda}</td>

        <td>${rad.inslappta}</td>

        <td>+${skillnad}</td>

        <td>${rad.placering}</td>

      </tr>

    `;

  }).join("");

}



/* =========================================
   VALUE LABELS
   Shows the exact number above each bar
========================================= */

const valueLabels = {

  id: "valueLabels",


  afterDatasetsDraw(chart) {

    const { ctx } = chart;


    ctx.save();


    ctx.fillStyle = "#171717";

    ctx.textAlign = "center";

    ctx.textBaseline = "bottom";

    ctx.font = '500 12px "DM Mono"';


    chart.data.datasets.forEach((dataset, datasetIndex) => {

      const meta = chart.getDatasetMeta(datasetIndex);


      meta.data.forEach((bar, index) => {

        const value = dataset.data[index];


        ctx.fillText(

          value,

          bar.x,

          bar.y - 9

        );

      });

    });


    ctx.restore();

  }

};



/* =========================================
   CHART
========================================= */

function ritaDiagram(data) {

  const canvas = document.getElementById("malDiagram");


  new Chart(canvas, {

    type: "bar",


    data: {

      labels: data.map(d => d.sasong),


      datasets: [

        {

          label: "Goals scored",

          data: data.map(d => d.gjorda),

          backgroundColor: "#DB0007",

          borderColor: "#DB0007",

          borderWidth: 0,

          borderRadius: 3,

          maxBarThickness: 56,

          categoryPercentage: 0.68,

          barPercentage: 0.82

        },


        {

          label: "Goals conceded",

          data: data.map(d => d.inslappta),

          backgroundColor: "#666666",

          borderColor: "#666666",

          borderWidth: 0,

          borderRadius: 3,

          maxBarThickness: 56,

          categoryPercentage: 0.68,

          barPercentage: 0.82

        }

      ]

    },



    options: {

      responsive: true,

      maintainAspectRatio: false,


      layout: {

        padding: {

          top: 25,

          right: 10,

          left: 5,

          bottom: 0

        }

      },


      interaction: {

        intersect: false,

        mode: "index"

      },



      plugins: {


        /* We use our own legend above the chart */

        legend: {

          display: false

        },


        /* Tooltip when hovering */

        tooltip: {

          backgroundColor: "#171717",

          titleColor: "#FFFAF3",

          bodyColor: "#FFFAF3",

          borderColor: "rgba(255,255,255,0.15)",

          borderWidth: 1,

          padding: 14,

          cornerRadius: 3,

          displayColors: true,


          titleFont: {

            family: "DM Mono",

            size: 11,

            weight: "400"

          },


          bodyFont: {

            family: "Manrope",

            size: 13

          },


          callbacks: {

            label: context =>

              ` ${context.dataset.label}: ${context.parsed.y} goals`

          }

        }

      },



      scales: {


        /* =========================================
           X AXIS
        ========================================= */

        x: {

          border: {

            display: false

          },


          grid: {

            display: false

          },


          ticks: {

            color: "#353535",

            padding: 14,


            font: {

              family: "DM Mono",

              size: 11,

              weight: "400"

            }

          }

        },



        /* =========================================
           Y AXIS
        ========================================= */

        y: {

          beginAtZero: true,

          max: 100,


          border: {

            display: false

          },


          grid: {

            color: "rgba(23, 23, 23, 0.12)",

            lineWidth: 1,

            drawTicks: false

          },


          ticks: {

            stepSize: 20,

            padding: 14,

            color: "rgba(23, 23, 23, 0.60)",


            font: {

              family: "DM Mono",

              size: 10

            }

          },


          title: {

            display: true,

            text: "GOALS",

            color: "rgba(23, 23, 23, 0.55)",


            font: {

              family: "DM Mono",

              size: 9,

              weight: "400"

            },


            padding: {

              bottom: 12

            }

          }

        }

      }

    },


    plugins: [

      valueLabels

    ]

  });

}



/* =========================================
   START
========================================= */

ritaDiagram(sasonger);

ritaTabell(sasonger);