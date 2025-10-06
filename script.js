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
            }
        catch(error) {
            console.log("error! cannot fetch data");
        }
        
}
        async function getAirQuality() {
            try {
                const airQuality = await fetch(`https://api.api-ninjas.com/v1/airquality?city=${city}`, {
                headers: {
                    "X-Api-key": "kktnmB0/suy2hXK/xLL1kw==mNRG44pm82wOqnPs"
                }
            })
                const data = await airQuality.json();
                const airQualValue = data.overall_aqi;
                airQualityValue.textContent = airQualValue;
                let airQualityResult;
                switch(true) {
                    case airQualValue > 400:
                        airQualityResult = "Severe";
                        break;
                    case airQualValue >= 300:
                        airQualityResult = "Very Poor";
                        break;
                    case airQualValue >= 200:
                        airQualityResult = "Poor";
                        break;
                    case airQualValue >= 100:
                        airQualityResult = "Moderate";
                        break;
                    case airQualValue >= 50:
                        airQualityResult = "Satisfactory";
                        break;
                    default:
                        airQualityResult = "Good"
                }
                airQualityIndex.textContent = airQualityResult;
            } catch (error) {
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


                                               

       