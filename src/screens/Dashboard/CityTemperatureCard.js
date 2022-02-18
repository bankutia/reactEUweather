import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import { State, TapGestureHandler, TouchableWithoutFeedback } from "react-native-gesture-handler";
import cityProvider from "../../model/City/CityProvider";
import weatherProvider from "../../model/Weather/WeatherProvider";

function CityTemperatureCard(props) {

    const removeAction = props.onRemove;
    const cityId = props.cityId;

    const [temperature, setTemperature] = useState(null);
    const [iconUrl, setIconUrl] = useState(null);

    useEffect(() => {
        if (cityId) {
            fetchWeather();
        }
    }, [cityId]);

    async function fetchWeather() {
        let weather = await weatherProvider.getCurrentWeather(cityId);
        setTemperature(Math.round(weather.temp));
        setIconUrl(weatherProvider.getIconUri(weather.iconId));
    }

    return (
        <View>
            <View style={styles.card}>
                <View style={styles.card_hstack}>
                    <View style={styles.card_vstack}>
                        <Image
                            style={styles.weather_image}
                            source={{uri: iconUrl}}/>
                        <Text style={styles.city_title}>{cityProvider.getCityById(cityId).name}</Text>
                    </View>
                    <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                        <Text style={styles.degree_title}>{temperature}°C</Text>
                    </View>
                </View>
                <View style={{ position: "absolute", top: 0, right: 0 }}>
                    <Button title="X" onPress={() => removeAction(cityId) }/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 16,
        marginStart: 16,
        marginEnd: 16,
        borderRadius: 12,
        backgroundColor: "white",
    },
    card_hstack: {
        flexDirection: "row",
        flexGrow: 1
    },
    card_vstack: {
        flexDirection: "column",
        flex: 1
    },
    weather_image: {
        width: 75,
        height: 75,
        marginStart: 12,
        marginBottom: -8
    },
    city_title: {
        fontSize: 32,
        fontWeight: "200",
        paddingStart: 16,
        paddingBottom: 12
    },
    degree_title: {
        fontSize: 42,
        fontWeight: "200",
        paddingEnd: 16
    },
});
    
export default CityTemperatureCard;