document.addEventListener("DOMContentLoaded", () => {

const featureList = document.querySelector(".feature-list");
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

let countriesData = [];

/* FETCH DATA */
async function getCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/region/asia");

        if (!response.ok) {
            throw new Error("API failed");
        }

        const data = await response.json();

        countriesData = data;
        displayCountries(data);

    } catch (error) {
        console.log(error);
        featureList.innerHTML = "<p style='color:red'>API blocked or internet issue ❌</p>";
    }
}

/* DISPLAY */
function displayCountries(countries) {
    featureList.innerHTML = "";

    countries.forEach(country => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${country.flags.png}" alt="flag">
            <h3>${country.name.common}</h3>
            <p>🌍 ${country.region}</p>
            <p>🏙️ ${country.capital ? country.capital[0] : "N/A"}</p>
            <p>👥 ${country.population.toLocaleString()}</p>
        `;

        featureList.appendChild(card);
    });
}

/* SEARCH */
function searchCountry() {
    const value = searchInput.value.toLowerCase();

    const filtered = countriesData.filter(c =>
        c.name.common.toLowerCase().includes(value)
    );

    displayCountries(filtered);
}

/* EVENTS */
searchBtn.addEventListener("click", searchCountry);

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchCountry();
});

/* INIT */
getCountries();

});



// Dark mode
const modeBtn = document.querySelector(".mode-btn");

modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});