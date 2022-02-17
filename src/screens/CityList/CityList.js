import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import cityProvider from "../../model/City/CityProvider";
import CityItem from "./CityItem";

function CityListScreen({ route, navigation }) {

    const { cityIds } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false
        })
    });
    
    return (
        <SafeAreaView edges={['right', 'bottom', 'left']}>
            <FlatList
                data={getData().sort((a, b) => a.name > b.name)}
                renderItem={({ item }) => (
                  <CityItem 
                      title={item.name} 
                      flag={item.flag}
                      onPress={() => {
                          if (!item.isDisabled) {
                              navigation.navigate("Dashboard", {selectedCityId: item.cityId})
                          }
                      }} 
                      isDisabled={item.isDisabled}/>
                )}
                keyExtractor={item => item.cityId}/>
            <StatusBar style="auto" />
        </SafeAreaView>
    );

    function getData() {
        return cityProvider.getCitiesArray().map(city => {
            return {
                cityId: city.cityId,
                name: city.name,
                flag: city.flag,
                isDisabled: cityIds.includes(city.cityId)
            }
        });
    }
}

export default CityListScreen;
