const cityForm = document.querySelector('form');
const cardElement = document.querySelector('.card');
const weatherDetailsElement = document.querySelector('.weather-details');
const dayTime = document.querySelector('img.time');
const weatherIcon = document.querySelector('.icon img');
const iconDiv = document.querySelector('.card');

function updateUI(data) {
    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;
    const forecastsDetails = data.forecasts;

    weatherDetailsElement.innerHTML = `
    <h5 class="my-2">${cityDetails.LocalizedName}</h5>
    <div class="my-2">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-2">
        <span>${weatherDetails.Temperature.Metric.Value}&deg;</span>
    </div>
    <hr/>
    <div style="padding: 3%;">
        <div class="row my-2">
            <div class="col">${getDay(1)} <img src="img/icons/${forecastsDetails.DailyForecasts[1].Day.Icon}.svg" class="img-responsive" style="width: 90%">${convertFahrenheitToCelcius(forecastsDetails.DailyForecasts[1].Temperature.Maximum.Value)}&deg;</div>
            <div class="verticalLine"></div>
            <div class="col">${getDay(2)} <img src="img/icons/${forecastsDetails.DailyForecasts[2].Day.Icon}.svg" class="img-responsive" style="width: 90%">${convertFahrenheitToCelcius(forecastsDetails.DailyForecasts[2].Temperature.Maximum.Value)}&deg;</div>
            <div class="verticalLine"></div>
            <div class="col">${getDay(3)} <img src="img/icons/${forecastsDetails.DailyForecasts[3].Day.Icon}.svg" class="img-responsive" style="width: 90%">${convertFahrenheitToCelcius(forecastsDetails.DailyForecasts[3].Temperature.Maximum.Value)}&deg;</div>
            <div class="verticalLine"></div>
            <div class="col">${getDay(4)} <img src="img/icons/${forecastsDetails.DailyForecasts[4].Day.Icon}.svg" class="img-responsive" style="width: 90%">${convertFahrenheitToCelcius(forecastsDetails.DailyForecasts[4].Temperature.Maximum.Value)}&deg;</div>
        </div>
    </div>
    `;

    const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
    weatherIcon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weatherDetails.IsDayTime) {
        timeSrc = 'img/day.png';
    } else {
        timeSrc = 'img/night.png';
    }
    dayTime.setAttribute('src', timeSrc);

    if(cardElement.classList.contains('d-none')) { 
        cardElement.classList.remove('d-none'); 
    }
}

const getDay = (number) => {
    const daysOfTheWeek = ["Sun", "Mon", "Tue",  "Wed", "Thu", "Fri", "Sat" ];
    const date = new Date();
    const day = date.getDate() + number;
    date.setDate(day);

    return daysOfTheWeek[date.getDay()];
}

const convertFahrenheitToCelcius = (value) => {
    const result = (value-32)/1.8;
    return result.toFixed(1);
}

const updateCityOnSearch = async (city) => {
    const cityDetails = await getCity(city);
    const weatherDetails = await getCurrentWeather(cityDetails.Key);
    const forecasts = await getDailyForecasts(cityDetails.Key);
    
    return {
        cityDetails,
        weatherDetails ,
        forecasts
    };
}

cityForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCityOnSearch(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});