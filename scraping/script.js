/* =========================================
   ELEMENTS
========================================= */

const tableBody =
    document.getElementById("data-body");

const datasetToggle =
    document.getElementById("dataset-toggle");

const datasetContent =
    document.getElementById("dataset-content");

const datasetButtonText =
    document.getElementById("dataset-button-text");

const buttonArrow =
    document.getElementById("button-arrow");


/* =========================================
   OPEN / CLOSE DATASET
========================================= */

datasetToggle.addEventListener("click", () => {

    const willOpen =
        datasetContent.hidden;


    datasetContent.hidden =
        !willOpen;


    datasetToggle.setAttribute(
        "aria-expanded",
        String(willOpen)
    );


    datasetButtonText.textContent =
        willOpen
            ? "CLOSE DATASET"
            : "EXPLORE DATASET";


    buttonArrow.textContent =
        willOpen
            ? "↑"
            : "↓";

});


/* =========================================
   CSV PARSER
========================================= */

function parseCSVLine(line, delimiter) {

    const columns = [];

    let current = "";

    let insideQuotes = false;


    for (
        let i = 0;
        i < line.length;
        i++
    ) {

        const character =
            line[i];


        if (character === '"') {

            if (
                insideQuotes &&
                line[i + 1] === '"'
            ) {

                current += '"';

                i++;

            } else {

                insideQuotes =
                    !insideQuotes;

            }

        } else if (
            character === delimiter &&
            !insideQuotes
        ) {

            columns.push(
                current.trim()
            );

            current = "";

        } else {

            current += character;

        }

    }


    columns.push(
        current.trim()
    );


    return columns;
}


/* =========================================
   DETECT DELIMITER
========================================= */

function detectDelimiter(header) {

    const semicolons =
        (header.match(/;/g) || []).length;

    const commas =
        (header.match(/,/g) || []).length;


    return semicolons > commas
        ? ";"
        : ",";

}


/* =========================================
   LOAD CSV
========================================= */

fetch("foretag.csv")

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Could not load dataset"
            );

        }


        return response.text();

    })


    .then(data => {

        const rows =
            data
                .trim()
                .split(/\r?\n/);


        if (rows.length < 2) {
            return;
        }


        const delimiter =
            detectDelimiter(
                rows[0]
            );


        rows
            .slice(1)
            .forEach(row => {

                if (!row.trim()) {
                    return;
                }


                const columns =
                    parseCSVLine(
                        row,
                        delimiter
                    );


                const values = [

                    columns[0] || "—",

                    columns[1] || "—",

                    columns[2] || "—",

                    columns[3] || "—"

                ];


                const tableRow =
                    document.createElement(
                        "tr"
                    );


                values.forEach(value => {

                    const cell =
                        document.createElement(
                            "td"
                        );


                    cell.textContent =
                        value;


                    tableRow.appendChild(
                        cell
                    );

                });


                tableBody.appendChild(
                    tableRow
                );

            });

    })


    .catch(error => {

        console.error(
            "Could not load dataset:",
            error
        );

    });