class CityProvider {

    constructor() {
        this.cities = this.getData();
    }

    getCitiesArray() {
        return Object.entries(this.cities).map(([key, value]) => {
            return ({cityId: key, name: value.name, flag: value.flag})
        });
    }

    getCityById(cityId) {
        return this.cities[cityId];
    }

    getData() {
        let euCapitals = require("../../../resource/euCapitals.json");
        let data = {};
  
        for (const [key, value] of Object.entries(euCapitals)) {
            data[key] = {
                name: value.name, 
                flag: this.getFlagEmoji(value.countryCode)
            };
        }
  
        return data;
    }
  
    getFlagEmoji(countryCode) {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char =>  127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }
}

export default CityProvider;