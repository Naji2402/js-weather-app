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
            minMaxTemp(data);
            getHumidity(data);
            getWindSpeed(data);
            sunriseConvert(data);
            sunsetConvert(data);
            pressureDetails(data);
            getUvIndex(latitude, longitude);

            // console.log(data);
        }
        catch(error) {
            console.log("error! cannot fetch data");
        }
        
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
                        airQualityIndex.style.color = "#009968"
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
        default:
            weatherImage.src = images.clearDay;
    }
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


  async function getUvIndex(lat, lon) {
    const apiKey = "openuv-42pjhrmgg08dwe-io";
    try{
        const uvResponse = await fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
            headers: {
                "x-access-token": apiKey
            }
        });
        const uvData = await uvResponse.json();
        const uvValue = Math.floor(uvData.result.uv);
        uvIndex.textContent = uvValue;
        let uvIndexWarningValue;
        switch(true) {
            case uvValue >= 11:
                uvIndexWarningValue = "Extreme";
                uvIndexWarning.style.color = "#7f02b4";
                break;
            case uvValue >= 8:
                uvIndexWarningValue = "Very High";
                uvIndexWarning.style.color = "#ff0037";
                break;
            case uvValue >= 6:
                uvIndexWarningValue = "High";
                uvIndexWarning.style.color = "#ff9100";
                break;
            case uvValue >= 3:
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

