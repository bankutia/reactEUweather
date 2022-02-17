import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-native";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CityTemperatureCard from "./CityTemperatureCard";

function DashboardScreen({ route, navigation }) {

    const [cityIds, setCityIds] = useState([]);

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
        if (route.params?.selectedCityId) {
            setCityIds(cityIds.concat(route.params?.selectedCityId))
        }
    }, [route.params?.selectedCityId]);

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
