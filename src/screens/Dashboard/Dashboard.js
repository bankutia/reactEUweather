import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Button, Text, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import localDataProvider from "../../model/LocalStore/LocalDataProvider";
import CityTemperatureCard from "./CityTemperatureCard";

function DashboardScreen({ route, navigation }) {

    const [cityIds, setCityIds] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useLayoutEffect(() => {
        decorateNavigationBar();
    });

    useEffect(() => {
        addCity(route.params?.selectedCityId)
    }, [route.params?.selectedCityId]);

    useEffect(() => {
        if (!isDataLoaded) {
            loadCities();
        }
    });

    function decorateNavigationBar() {
        navigation.setOptions({
            headerRight: () => (
                <Button 
                    title="Add" 
                    onPress={ () => navigation.navigate("CityList", {cityIds: cityIds}) }/>
            ),
        })
    }

    function addCity(addingCityId) {
        if (addingCityId && !cityIds.includes(addingCityId)) {
            let updatedCityIds = cityIds.concat(addingCityId);
            setCityIds(updatedCityIds)
            localDataProvider.saveCityIds(updatedCityIds);
        }
    }

    function loadCities() {
        setIsDataLoaded(true);
        setCityIds([]);
        localDataProvider.getStoredCityIds()
            .then(cityIds => setCityIds(cityIds))
            .catch(err => { });
}

    function removeCityFromList(cityId) {
        let updatedCityIds = cityIds.filter((id) => cityId !== id)
        setCityIds(updatedCityIds);
        localDataProvider.saveCityIds(updatedCityIds)
    }

    const cityListBody = 
        <FlatList
            data={cityIds}
            renderItem={({ item }) => (
                <CityTemperatureCard 
                    cityId={item} 
                    onRemove={(cityId) => removeCityFromList(cityId)}/>
            )}
            keyExtractor={item => item}
        />;

    const emptyBackground = 
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", margin: 24}}>
            <Text style={{fontSize: 24, fontWeight: "500", color: "grey", textAlign: "center", opacity: 0.5}}>
                Press the 'Add' button up right to add cities.
            </Text>
        </View>;

    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
            {cityIds.length > 0 ? cityListBody : emptyBackground}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
  
export default DashboardScreen;
