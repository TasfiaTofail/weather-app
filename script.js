const apiKey = "fc9b3e67453ecec4b3ebf57b3a6c40fe";

function getWeather() {
    const city = document.getElementById("cityInput").value;

    const loader = document.getElementById("loader");
    const weatherBox = document.getElementById("weatherBox");

    loader.classList.remove("hidden");
    weatherBox.classList.add("hidden");

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            loader.classList.add("hidden");

            if (data.cod !== "200") {
                document.getElementById("error").innerText = "City not found!";
                return;
            }

            document.getElementById("error").innerText = "";

            let forecastHTML = `<h2>${city}</h2><h3>5-Day Forecast</h3>`;

            for (let i = 0; i < data.list.length; i += 8) {
                const item = data.list[i];

                const date = new Date(item.dt_txt).toDateString();
                const temp = item.main.temp;
               let icon = "01d"; // default icon (sunny)

if (item.weather && item.weather.length > 0 && item.weather[0].icon) {
    icon = item.weather[0].icon;
}

const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                forecastHTML += `
                    <div class="forecast-day">
                        <p>${date}</p>
                        <img src="${iconUrl}">
                        <p>${temp}°C</p>
                    </div>
                `;
            }

            weatherBox.innerHTML = forecastHTML;
            weatherBox.classList.remove("hidden");
        })
        .catch(() => {
            loader.classList.add("hidden");
            document.getElementById("error").innerText = "Error fetching data";
        });
        function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
}
function toggleDarkMode() {
    console.log("clicked dark mode");
    document.body.classList.toggle("dark");
}