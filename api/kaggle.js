const token = "KGAT_040fe10cded554adf6174a8db0c99bd3";
const url = "https://www.kaggle.com/api/v1/datasets/download/rodsaldanha/arketing-campaign/marketing_campaign.csv";
async function main() {
  const response = await fetch(url, {
    headers: { Authorization: "Bearer " + token }
  });
  console.log("Status:", response.status);
  const text = await response.text();
  const rows = text.trim().split("\n").slice(1);
  const accepted = rows.filter(row => row.trim().split(";").at(-1) === "1").length;
  const acceptedCmp1 = rows.filter(row => row.trim().split(";")[20] === "1").length;
  const acceptedCmp2 = rows.filter(row => row.trim().split(";")[21] === "1").length;
  const acceptedCmp3 = rows.filter(row => row.trim().split(";")[19] === "1").length;
  const acceptedCmp4 = rows.filter(row => row.trim().split(";")[17] === "1").length;
  const acceptedCmp5 = rows.filter(row => row.trim().split(";")[18] === "1").length;
  console.log("Customers:", rows.length);
  console.log("Accepted the last campaign:", accepted);
  console.log("Accepted campaign 1:", acceptedCmp1);
  console.log("Accepted campaign 2:", acceptedCmp2);
  console.log("Accepted campaign 3:", acceptedCmp3);
  console.log("Accepted campaign 4:", acceptedCmp4);
  console.log("Accepted campaign 5:", acceptedCmp5);
}
main();

