let search = document.querySelector('.search');
let searchIcon = document.querySelector('#searchIcon');
let mainTemperature = document.querySelector('#mainTemperature');
let cityName = document.querySelector('#cityName');
let minimumTemperature = document.querySelector('#minTemp');
let maximumTemperature = document.querySelector('#maxTemp');
let humidity = document.querySelector('#humidity');
let windSpeed = document.querySelector('#windSpeed');
let sunRise = document.querySelector('#sunriseTime');
let sunSet = document.querySelector('#sunsetTime');
let city;
let dayToday = document.querySelector('#dayToday');
let pressureValue = document.querySelector('#pressureValue');
let pressureValueDescription = document.querySelector('#pressureValueDescription');
let airQualityValue = document.querySelector('#airQualityValue');
let airQualityIndex = document.querySelector('#airQualityIndex');
let climate = document.querySelector('#climate');
let weatherImage = document.querySelector('#mainWeatherImage');
let uvIndex = document.querySelector('#uvIndexOut');
let uvIndexWarning = document.querySelector('#uvIndexWarning');
let forecastDay = document.querySelector('#forecastDay');
let forecastTemp = document.querySelector('#forecastTemp');
let forecastMain = document.querySelector('#climateCards');

let images = {
    lightRainDay: "images/lightrain(day).png",
    lightRainNight: "images/lightrainNight.png",
    heavyRain: "images/heavyRain.png",
    windyDay: "images/windy(day).png",
    windyNight: "images/windy(night).png",
    thunderStorm: "images/Thunderstorm.png",
    clearDay: "images/Clear(Day).png",
    clearNight: "images/clear(Night).png",
    cloudy: "images/cloudy.png",
    windyCloud: "images/windycloud.png"
}

function getCurrentUserLocationDetails() {
    navigator.geolocation.getCurrentPosition(success);
    async function success(position) {
        try{
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const apiKey = "7b8091521c7fac9f9a44226bcfcefc9b";
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
            const data = await response.json();
            console.log(data);
            const currentUserCity = data.name;
            cityName.textContent = currentUserCity;
            getCurrentLocTemp(data)
            getCurrLocMinMaxTemp(data)
            getCurrentLocHumidity(data)
            getCurrentLocWind(data);
        }catch(error) {
            console.log(error);
        }
    }
}
getCurrentUserLocationDetails()

function getCurrentLocTemp(data) {
    const currentLocTemp = data.main.temp;
    const celciusConvert = currentLocTemp - 273.15;
    const celciusResult = `${Math.floor(celciusConvert)}°c`
    mainTemperature.textContent = celciusResult;
}

async function getCurrLocMinMaxTemp(data) {
    const latitude = data.coord.lat;
    const longitude = data.coord.lon;
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&forecast_days=1`);
        const data = await response.json();
        const maxTemperature = data.daily.temperature_2m_max;
        const minTemperature = data.daily.temperature_2m_min;
        minimumTemperature.textContent = `Min Temperature-${Math.floor(minTemperature)}°C`;
        maximumTemperature.textContent = `Max Temperature-${Math.floor(maxTemperature)}°C`;
    } catch(error) {
        console.log(error);
    }
}

function getCurrentLocHumidity(data) {
    const humidityValue = data.main.humidity;
    humidity.textContent = `${humidityValue}%`;
}
function getCurrentLocWind(data) {
    const windSpeedValue = data.wind.speed;
    windSpeed.textContent = `${windSpeedValue.toFixed(1)}km/h`;

}


searchIcon.addEventListener('click', () => {
    city = search.value;
    if (!city) {
        window.alert("please enter a city");
    }else {
        async function getWeatherDetails() {
        try {
            const apiKey = "a684b0b2ebb1b924e595991906953652";
            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const weatherDetails = await fetch(weatherApi);
            const data = await weatherDetails.json();
            const latitude = data.coord.lat;
            const longitude = data.coord.lon;
            mainTemp(data);
            getCityName(data);
            getClimate(data);
            getCurrentDay();
            minMaxTemp(latitude, longitude);
            getHumidity(data);
            getWindSpeed(data);
            sunriseConvert(data);
            sunsetConvert(data);
            pressureDetails(data);
            getUvIndex(latitude, longitude);
            getForecastDetails(latitude, longitude);
        }
        catch(error) {
            console.log(error);
        }   
}
getAirQuality()
getWeatherDetails();
}
});

function mainTemp(data) {
    const temperature = data.main.temp;
    const celsiusValue = temperature - 273.15;
    const celsius = celsiusValue.toFixed(0);
    const celsiusResult = `${celsius}°c`
    mainTemperature.textContent = celsiusResult;
}
function getCityName(data) {
    const currentCityName = data.name;
    cityName.textContent = currentCityName;
}

function getClimate(data) {
    const climateValue = data.weather[0].description;
    climate.textContent = climateValue;
    switch(climateValue){
        case "scattered clouds":
            weatherImage.src = images.cloudy;
            break;
        case "overcast clouds":
            weatherImage.src = images.windyCloud;
            break;
        case "light rain":
            weatherImage.src = images.lightRainDay;
            break;
        case "heavy rain":
            weatherImage.src = images.thunderStorm;
            break;
        case "moderate rain": 
            weatherImage.src = images.heavyRain;
            break;
        case "broken clouds":
            weatherImage.src = images.cloudy;
            break;
        case "heavy intensity rain":
            weatherImage.src = images.thunderStorm;
            break;
        case "few clouds":
            weatherImage.src = images.cloudy;
            break;
        default:
            weatherImage.src = images.clearDay;
    }
}

async function minMaxTemp(latitude, longitude) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m&forecast_days=1`);
        const data = await response.json();
        const maxTemperature = data.daily.temperature_2m_max;
        const minTemperature = data.daily.temperature_2m_min;
        minimumTemperature.textContent = `Min Temperature-${Math.floor(minTemperature)}°C`;
        maximumTemperature.textContent = `Max Temperature-${Math.floor(maxTemperature)}°C`;
}

function getHumidity(data) {
    const humidityValue = data.main.humidity;
    humidity.textContent = `${humidityValue}%`;
}

function getWindSpeed(data) {
    const windSpeedValue = data.wind.speed;
    windSpeed.textContent = `${windSpeedValue.toFixed(1)}km/h`;
}

function sunRiseSetConvert(sunSetTime) {
    const date = new Date(sunSetTime * 1000);
    const hours = date.getHours();
    let amPm;
    if (hours >= 12) {
        amPm = "PM"
    }else{
        amPm = "AM"
    }
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${amPm}`;
}

function sunriseConvert(data) {
    const sunRiseTime = data.sys.sunrise;
    let sunRiseDetails = sunRiseSetConvert(sunRiseTime);
    sunRise.textContent = sunRiseDetails;
}

function sunsetConvert(data) {
    const sunSetTime = data.sys.sunset;
    let sunSetDetails = sunRiseSetConvert(sunSetTime);
    sunSet.textContent = sunSetDetails;
}
                                           
function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayDetail = new Date();
    const dayIndex = dayDetail.getDay();
    const currentDay = days[dayIndex];
    dayToday.textContent = currentDay
}
getCurrentDay();


function pressureDetails(data) {
    const pressure = data.main.pressure;
    pressureValue.textContent = pressure;
    let pressureValueWarning;
    switch(true) {
        case pressure > 1030:
            pressureValueWarning = "High Pressure";
            break;
        case pressure >= 1015:
            pressureValueWarning = "Normal High ";
            break;
        case pressure >= 1005:
            pressureValueWarning = "Normal";
            break;
        case pressure >= 995:
            pressureValueWarning = "Slightly Low";
            break;
        case pressure >= 980:
            pressureValueWarning = "Low Pressure";
            break;
        case pressure >= 950:
            pressureValueWarning = "Very Low";
            break;
        default:
            pressureValueWarning = "Extremely Low"
    }
    pressureValueDescription.textContent = pressureValueWarning;
}


async function getAirQuality() {
    const airApi = "kktnmB0/suy2hXK/xLL1kw==mNRG44pm82wOqnPs";
    try {
        const airQuality = await fetch(`https://api.api-ninjas.com/v1/airquality?city=${city}`, {
        headers: {
            "X-Api-key": airApi
        }
    })
        const data = await airQuality.json();
        const airQualValue = data.overall_aqi;
        airQualityValue.textContent = airQualValue;
        let airQualityResult;
        switch(true) {
            case airQualValue > 400:
                airQualityResult = "Severe";
                airQualityIndex.style.color = "#640101"
                break;
            case airQualValue >= 300:
                airQualityResult = "Very Poor";
                airQualityIndex.style.color = "#8b0000"
                break;
            case airQualValue >= 200:
                airQualityResult = "Poor";
                airQualityIndex.style.color = "red";
                break;
            case airQualValue >= 100:
                airQualityResult = "Moderate";
                airQualityIndex.style.color = "#F5CD2F"
                break;
            case airQualValue >= 50:
                airQualityResult = "Satisfactory";
                airQualityIndex.style.color = "#a58503ff"
                break;
            default:
                airQualityResult = "Good"
                airQualityIndex.style.color = "#1eff00ff"
        }
        airQualityIndex.textContent = airQualityResult;
    } catch (error) {
        console.log(error);
    }
}

async function getForecastDetails(lati, longi) {
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longi}&daily=temperature_2m_mean&timezone=auto&forecast_days=7`);
        const data = await response.json();
        const dateArray = [];
        const tempArray = [];
        data.daily.time.forEach((day, index) => {
            let date = new Date(day).toLocaleDateString("en-US", {weekday: "short"});
            dateArray[index] = date;
        });
        data.daily.temperature_2m_mean.forEach((temp, index) => {
            tempArray[index] = temp
        });
        let combined = dateArray.map((dayy, index) => ({
            day: dayy,
            maxTemperature: tempArray[index]
        }));
        combined.forEach((forecast) => {
            forecastMain.innerHTML += `<div class="climate-card">
                                        <span id="forecastDay">${forecast.day}</span>
                                        <img src="images/daily-climate1.png" alt="">
                                        <span id="forecastTemp">${Math.floor(forecast.maxTemperature)}°c</span>
                                  </div>`
        });
    }catch(error) {
        console.log(error);
    }
}


async function getUvIndex(lati, longi) {
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longi}&daily=uv_index_max&timezone=auto&forecast_days=1`);
        const data = await response.json();
        let uvIndexValue = Math.floor(data.daily.uv_index_max[0]);
        uvIndex.textContent = uvIndexValue;
        let uvIndexWarningValue;
            switch(true) {
                case uvIndexValue >= 11:
                    uvIndexWarningValue = "Extreme";
                    uvIndexWarning.style.color = "#7f02b4";
                    break;
                case uvIndexValue >= 8:
                    uvIndexWarningValue = "Very High";
                    uvIndexWarning.style.color = "#ff0037";
                    break;
                case uvIndexValue >= 6:
                    uvIndexWarningValue = "High";
                    uvIndexWarning.style.color = "#ff9100";
                    break;
                case uvIndexValue >= 3:
                    uvIndexWarningValue = "Moderate";
                    uvIndexWarning.style.color = "#F5CD2F"
                    break;
                default:
                    uvIndexWarningValue = "Low";
                    uvIndexWarning.style.color = "#1eff00ff"
            }
            uvIndexWarning.textContent = uvIndexWarningValue;
    }catch(error) {
        console.log(error);
    }
}
