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

searchIcon.addEventListener('click', () => {
    city = search.value;
    if (city === '') {
        window.alert("please enter a city");
    }else {
        async function getWeatherDetails() {
        try {
            const apiKey = "a684b0b2ebb1b924e595991906953652";
            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const weatherDetails = await fetch(weatherApi);
            const data = await weatherDetails.json();
            mainTemp(data);
            getCityName(data);
            // getCurrentDay();
            minMaxTemp(data);
            getHumidity(data);
            getWindSpeed(data);
            sunriseConvert(data);
            sunsetConvert(data);
            pressureDetails(data);
            console.log(data); 
            }
        catch(error) {
            console.log("error! cannot fetch data");
        }
        
}
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

function minMaxTemp(data) {
    const minTemperatureValue = data.main.temp_min;
    const maxTemperatureValue = data.main.temp_max;
    const minTemperature = minTemperatureValue - 273.15;
    const maxTemperature = maxTemperatureValue - 273.15;
    minimumTemperature.textContent = `Min Temperature-${minTemperature.toFixed(0)}°C`;
    maximumTemperature.textContent = `Max Temperature-${maxTemperature.toFixed(0)}°C`;
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
    // const riseSetTime = data.sys.riseSet;
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