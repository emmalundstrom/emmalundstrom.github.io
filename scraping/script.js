fetch("foretag.csv")
    .then(response => response.text())
    .then(data => {

        const rows = data.trim().split("\n");
        const tableBody = document.getElementById("data-body");

        // Hoppa över första raden eftersom den innehåller rubriker
        rows.slice(1).forEach(row => {

            const columns = row.split(";");

            const tableRow = document.createElement("tr");

            columns.forEach(column => {
                const cell = document.createElement("td");
                cell.textContent = column;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });

    })
    .catch(error => {
        console.error("Could not load dataset:", error);
    });