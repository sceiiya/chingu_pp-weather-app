const weatherIcon = document.querySelector('.weather-icon')
const degrees = document.querySelector('.degrees')
const cityName = document.querySelector('.city-name')
const humidityVal = document.querySelector('.humidity')
const inputSearch = document.querySelector('.input-search')
const buttonSearch = document.querySelector('.button-search')
const wind = document.querySelector('.wind')
const displayCard = document.querySelector('main')


const APIkey = 'a62efa4030ce598957e7558850818388'

async function getWeather(cityName, APIkey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`

    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}

async function getDefWeather(APIkey, lon, lat) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`

    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}

inputSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buttonSearch.click()
    }
})
buttonSearch.addEventListener('click', async () => {
    try {
        const city_Name = inputSearch.value

        getWeather(city_Name, APIkey)
            .then(data => {
                if (data.cod === 200) {

                    const { name, sys, wind, main, weather } = data

                    const cityWeather = {
                        'city': name,
                        'temp': Math.floor(main.temp),
                        'country': sys.country,
                        'wind': wind.speed,
                        'humidity': main.humidity,
                        'iconCode': weather[0].icon,
                    }

                    storeCurrentCity(cityWeather)
                    appendDOM()

                    // wind.textContent = windSpd + ' km/h'
                    // degrees.textContent = temp + '°C';
                    // cityName.textContent = name + ' | ' + country;
                    // humidityVal.textContent = humidity + '%';

                    // weatherIcon.src = `https://openweathermap.org/img/wn/${weatIcon}@2x.png`

                    inputSearch.value = ''
                } else {
                    alert('error')
                }
            })
    } catch (e) {
        console.error(e)
    }
})

function storeDefCity(currentCity) {
    localStorage.setItem('defaultCity', JSON.stringify(currentCity))
}

const savedCities = []
function storeCurrentCity(currentCity) {
    savedCities.push(currentCity)
    localStorage.setItem('savedCities', JSON.stringify(savedCities))
}

console.log(localStorage.getItem('savedCities'))


appendDOM()

function appendDOM() {
    const cityData = JSON.parse(localStorage.getItem('savedCities'))
    htmlCard = ''
    for (let i = 0; i < cityData.length; i++) {
        const card = createCard(cityData[i])
        htmlCard += card
    }
    displayCard.innerHTML = htmlCard
}

function createCard(element) {

    const { city, temp, country, wind, humidity, iconCode } = element

    // si ia 
    const htmlCard = `
    <div class="card">
    <p>
      <img
        class="weather-icon mainIcon"
        src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
      />
    </p>
    <div>
      <p class="degrees">${temp}°</p>
      <p class="city-name">${city} | ${country}</p>
    </div>
<div class='weather-details'>
      <div class="details__humidity">
        <i class="fa-solid fa-water"></i>
        <div>
          <p class="humidity">${humidity}</p>
         
        </div>
      </div>
      <div class="details__wind">
        <i class="fa-solid fa-wind"></i>
        <div>
          <p class="wind">${wind} km/h</p>
         
        </div>
      </div>
    </div>
    </div>
  </div>
  `

    return htmlCard
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}
getLocation()

function showPosition(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    try {
        getDefWeather(APIkey, lon, lat).then(data => {
            if (data.cod === 200) {

                const { name, sys, wind, main, weather } = data

                const cityWeather = {
                    'city': name,
                    'temp': Math.floor(main.temp),
                    'country': sys.country,
                    'wind': wind.speed,
                    'humidity': main.humidity,
                    'iconCode': weather[0].icon,
                }

                storeDefCity(cityWeather)

                wind.textContent = cityWeather.wind + ' km/h'
                degrees.textContent = cityWeather.temp + '°C';
                cityName.textContent = cityWeather.city + ' | ' + cityWeather.country;
                humidityVal.textContent = cityWeather.humidity + '%';

                weatherIcon.src = `https://openweathermap.org/img/wn/${cityWeather.iconCode}@2x.png`

            } else {
                alert('error')
            }
        })
    } catch (e) {
        console.error(e)
    }

}
