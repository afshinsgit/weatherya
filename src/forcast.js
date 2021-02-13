const apiKey = 'pBtJdISdE1NELr64xiBd6DYD9oCMA26A';

const getCurrentWeather = async (cityKey) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${apiKey}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${apiKey}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

const getDailyForecasts = async (cityKey) => {
    const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${cityKey}?apikey=${apiKey}`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    return data;
};