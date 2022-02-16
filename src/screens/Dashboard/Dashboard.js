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
            data={getData()}
            renderItem={({ item }) => (
                <CityTemperatureCard 
                    name={item.name} 
                    temperature={item.temperature} 
                    image_url={item.image_url}/>
            )}
            keyExtractor={item => item.key}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );

    function getData() {
        return [
            {key: 1, name: "Budapest", temperature: 5, image_url: "http://openweathermap.org/img/w/01d.png"}, 
            {key: 2, name: "London", temperature: 12, image_url: "http://openweathermap.org/img/w/02d.png"}
        ];
    }
}
  
export default DashboardScreen;
