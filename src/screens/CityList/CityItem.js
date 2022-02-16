import { StyleSheet, View, Text } from "react-native";

function CityItem(props) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{props.flag} {props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
      padding: 12,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 18,
    },
  });
  
export default CityItem;