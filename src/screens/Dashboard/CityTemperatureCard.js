import { StyleSheet, View, Text, Image } from "react-native";

function CityTemperatureCard(props) {

    return (
        <View>
            <View style={styles.card}>
                <View style={styles.card_hstack}>
                    <View style={styles.card_vstack}>
                        <Image
                        style={styles.weather_image}
                        source={{
                            uri: props.image_url,
                        }}/>
                        <Text style={styles.city_title}>{props.name}</Text>
                    </View>
                    <View style={{alignItems: "flex-end", justifyContent: "center"}}>
                        <Text style={styles.degree_title}>{props.temperature}°C</Text>
                    </View>
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
      }
    });
    
export default CityTemperatureCard;