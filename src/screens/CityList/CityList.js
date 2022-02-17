import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CityProvider from "../../model/City/CityProvider";
import CityItem from "./CityItem";

function CityListScreen({ route, navigation }) {

    const { cityIds } = route.params;
    const cityProvider = new CityProvider();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false
        })
    });
    
    return (
        <SafeAreaView edges={['right', 'bottom', 'left']}>
            <FlatList
                data={cityProvider.getCitiesArray().sort((a, b) => a.name > b.name)}
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
}

export default CityListScreen;
