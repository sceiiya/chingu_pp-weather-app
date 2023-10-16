const weatherIcon = document.querySelector('.weather-icon')
const degrees = document.querySelector('.degrees')  
const cityName = document.querySelector('.city-name')
const humidityVal = document.querySelector('#humidity')
const inputSearch = document.querySelector('.input-search')
const buttonSearch = document.querySelector('.button-search')
const wind = document.querySelector('#wind')

const APIkey = 'a62efa4030ce598957e7558850818388'

async function getWeather(cityName, APIkey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`

    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}

// Kelvin to Celsius: °C = K - 273.15
// Celsius to Fahrenheit: °F = (°C * 9/5) + 32

// getWeather(city_Name, APIkey)
// .then(data => {
//     const city = data.name
//     const temp = Math.floor(data.main.temp)
//     const country = data.sys.country
//     const windSpd = data.wind.speed
//     const weather = data.weather.main
    
//     console.log(`city  is ${city} /n` + 
//         `temp is ${temp} /n` +
//         `country is ${country} /n` +
//         `windSpd is ${windSpd} /n` +
//         `weather is ${weather} /n`);

//     degrees.textContent = temp;
//     cityName.textContent = city;
    
// })


inputSearch.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        // run async function
        buttonSearch.click()
    }
})
buttonSearch.addEventListener('click', async () => {
    try {
        const city_Name = inputSearch.value
        
        getWeather(city_Name, APIkey)
            .then(data => {
                if (data.cod !== "404"){
                    
                    console.log(data)
                    const city = data.name
                    const temp = Math.floor(data.main.temp)
                    const country = data.sys.country
                    const windSpd = data.wind.speed
                    // const weather = data.weather.main
                    const humidity = data.main.humidity
                    // // const weatherIconCode = data.
        
                    // console.log(`city  is ${city} /n` + 
                    //     `temp is ${temp} /n` +
                    //     `country is ${country} /n` +
                    //     `windSpd is ${windSpd} /n` +
                    //     `weather is ${weather} /n`);
                    wind.textContent = windSpd + ' km/h'
                    degrees.textContent = temp + '°C';
                    cityName.textContent = city + ' | ' + country;
                    humidityVal.textContent = humidity;
                    // weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconCode}.png`
        
                switch (data.weather[0].description) {
                    case 'clear sky':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/01d@2x.png'
                        break;
                    case 'few clouds':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/02d@2x.png'
                        break;
                    case 'scattered clouds':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/03d@2x.png'
                        break;
                    case 'broken clouds':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/04d@2x.png'
                        break;
                    case 'shower rain':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/09d@2x.png'
                        break;
                    case 'rain':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/10d@2x.png'
                        break;
                    case 'thunderstorm':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/11d@2x.png'
                        break;
                    case 'snow':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/13d@2x.png'
                        break;
                    case 'mist':
                        weatherIcon.src = 'https://openweathermap.org/img/wn/50d@2x.png'
                        break;
                    default:
                        break;
                }

                inputSearch.value = ''
            }   else{
                alert('error')
            }
            })
    
    }catch(e){
        console.error(e)
    }

    }
)

// https://openweathermap.org/img/wn/01d.png
// https://openweathermap.org/weather-conditions

// API key a62efa4030ce598957e7558850818388
// created by sceiya from vscode live session


// https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid={API key}

