import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

function CityItem(props) {
    return (
        <TouchableHighlight onPress={() => props.onPress()} underlayColor="gray">
            <View style={styles.item}>
                <Text style={ props.isDisabled ? styles.disabledTitle : styles.title}>
                    {props.flag} {props.title}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        color: "black"
    },
    disabledTitle: {
        fontSize: 18,
        color: "lightgray"
    },
  });
  
export default CityItem;