// scripts.js

const apiURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let data = [];

// Fetch data using .then
function fetchDataThen() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((fetchedData) => {
      data = fetchedData;
      renderTable(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Fetch data using async/await
async function fetchDataAsync() {
  try {
    const response = await fetch(apiURL);
    const fetchedData = await response.json();
    data = fetchedData;
    renderTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render data in table
function renderTable(data) {
  const tableBody = document.getElementById("data-table-body");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.symbol}</td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
        `;
    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.symbol.toLowerCase().includes(query)
  );
  renderTable(filteredData);
});

// Sort functionality
document.getElementById("sort-marketcap").addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

document
  .getElementById("sort-percentage-change")
  .addEventListener("click", () => {
    const sortedData = [...data].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderTable(sortedData);
  });

// Initial data fetch using async/await
fetchDataAsync();
