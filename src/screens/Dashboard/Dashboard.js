import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-native";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import localDataProvider from "../../model/LocalStore/LocalDataProvider";
import CityTemperatureCard from "./CityTemperatureCard";

function DashboardScreen({ route, navigation }) {

    const [cityIds, setCityIds] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button 
                    title="Add" 
                    onPress={ () => navigation.navigate("CityList", {cityIds: cityIds}) }/>
            ),
        })
    });

    useEffect(() => {
        let addingCityId = route.params?.selectedCityId
        if (addingCityId && !cityIds.includes(addingCityId)) {
            let updatedCityIds = cityIds.concat(addingCityId);
            setCityIds(updatedCityIds)
            localDataProvider.saveCityIds(updatedCityIds);
        }
    }, [route.params?.selectedCityId]);

    useEffect(() => {
        if (!isDataLoaded) {
            setIsDataLoaded(true);
            setCityIds([]);
            localDataProvider.getStoredCityIds()
                .then(cityIds => setCityIds(cityIds))
                .catch(err => { });
        }
    });

    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
            <FlatList
            data={cityIds}
            renderItem={({ item }) => (
                <CityTemperatureCard cityId={item}/>
            )}
            keyExtractor={item => item}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
  
export default DashboardScreen;
