import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CityItem from "./CityItem";

function CityListScreen({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false
        })
    });
    
    return (
        <SafeAreaView edges={['right', 'bottom', 'left']}>
            <FlatList
                data={getData()}
                renderItem={renderItem}
                keyExtractor={item => item.key}/>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const renderItem = ({ item }) => (
    <CityItem title={item.name} flag={item.flag}/>
);

function getData() {
  let euCapitals = require("../../../resource/euCapitals.json");
  let data = [];

  for (const [key, value] of Object.entries(euCapitals)) {
    data.push({key: key, name: value.name, flag: getFlagEmoji(value.countryCode)});
  }

  return data.sort((a, b) => a.name > b.name);
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default CityListScreen;
