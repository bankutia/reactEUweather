import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function CityListScreen() {
  return (
      <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.container}>
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
  <Item title={item.name} flag={item.flag}/>
);

const Item = ({ title, flag }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{flag} {title}</Text>
  </View>
);

function getData() {
  let euCapitals = require("./resource/euCapitals.json");
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    padding: 12,
  },
  title: {
    fontSize: 18,
  },
});

export default CityListScreen;