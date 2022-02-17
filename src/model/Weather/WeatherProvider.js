const api_key = "2345e7feb29ab7d6c1d72459a6ccaf4d";

class WeatherProvider {

    constructor() { }

    async getCurrentWeather(cityId) {
        const uri = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${api_key}`;
        try {
            console.log(`Fetch request: ${uri}`);
            let response = await fetch(uri);
            let json = await response.json();
            console.log(`Fetch response: ${JSON.stringify(json)}`)
            return {
                iconId: json.weather[0].icon,
                temp: json.main.temp
            };
        } catch(error) {
            console.log(`getCurrentWeather(${cityId}) failed: ${error}`);
        }
    }

    getIconUri(iconId) {
        const uri = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        console.log(`Icon url: ${uri}`);
        return uri;
    }
}

const weatherProvider = new WeatherProvider();

export default weatherProvider;
