let search = document.querySelector('.search');
let searchIcon = document.querySelector('#searchIcon');
let city;
let mainTemperature = document.querySelector('#mainTemperature');
let cityName = document.querySelector('#cityName');
let minimumTemperature = document.querySelector('#minTemp');
let maximumTemperature = document.querySelector('#maxTemp');
let humidity = document.querySelector('#humidity');
let windSpeed = document.querySelector('#windSpeed');






searchIcon.addEventListener('click', () => {
    city = search.value;
    if (city === '') {
        window.alert("please enter a city");
    }else {
        async function getWeatherDetails() {
        try {
            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a684b0b2ebb1b924e595991906953652`;
            const weatherDetails = await fetch(weatherApi);
            const data = await weatherDetails.json();
            const temperature = data.main.temp;
            console.log(data);
            const celsiusValue = temperature - 273.15;
            const celsius = celsiusValue.toFixed(0);
            const celsiusResult = `${celsius}°c`
            mainTemperature.textContent = celsiusResult;
            const currentCityName = data.name;
            cityName.textContent = currentCityName;
            const minTemperatureValue = data.main.temp_min;
            const maxTemperatureValue = data.main.temp_max;
            const minTemperature = minTemperatureValue - 273.15;
            const maxTemperature = maxTemperatureValue - 273.15;
            minimumTemperature.textContent = `Min Temperature-${minTemperature.toFixed(0)}°C`;
            maximumTemperature.textContent = `Max Temperature-${maxTemperature.toFixed(0)}°C`;
            const humidityValue = data.main.humidity;
            humidity.textContent = `${humidityValue}%`;
            const windSpeedValue = data.wind.speed;
            windSpeed.textContent = `${windSpeedValue.toFixed(1)}km/h`;
            sunriseConvert();

        }
        catch(error) {
            console.log("error! cannot fetch data");
        }
    
}
getWeatherDetails();
}
});


function sunriseConvert() {
    const sunRiseTime = data.sys.sunrise;
    console.log(sunRiseTime);
}

                 

                                                    
                           

                                                          