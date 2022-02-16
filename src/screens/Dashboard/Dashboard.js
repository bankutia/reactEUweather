import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { Button } from "react-native";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CityTemperatureCard from "./CityTemperatureCard";

function DashboardScreen({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Add" onPress={() => navigation.navigate("CityList")}/>
            ),
        })
    });

    return (
        <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1}}>
            <FlatList
            data={getData()}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
        );
}

const renderItem = ({ item }) => (
    <CityTemperatureCard 
        name={item.name} 
        temperature={item.temperature} 
        image_url={item.image_url}/>
  );
  
function getData() {
    return [
        {key: 1, name: "Budapest", temperature: 5, image_url: "http://openweathermap.org/img/w/01d.png"}, 
        {key: 2, name: "London", temperature: 12, image_url: "http://openweathermap.org/img/w/02d.png"}
    ];
}
  
export default DashboardScreen;
