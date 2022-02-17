import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalDataProvider {
    
    storageKey = "cityIds";

    constructor() {
        this.storage = new Storage({
            storageBackend: AsyncStorage, 
            defaultExpires: null,
            enableCache: true,
        });
    }

    saveCityIds(cityIds) {
        this.storage.save({key: this.storageKey, data: cityIds});
    }
    
    getStoredCityIds() {
        return this.storage.load({
            key: this.storageKey,
            autoSync: false
        });
    }
}

const localDataProvider = new LocalDataProvider();

export default localDataProvider;
