import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { useEffect } from "react";

export default function CardPastEvent({ item }) {
  const { width, height } = Dimensions.get("window");

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const GOOGLE_API_KEY = "AIzaSyBJJ8i1gcnkoBkRx-tqFn9Dam67n2zmJfo";
  const mapRef = useRef();
  const formatDate = () => {
    const options = { year: "numeric", day: "numeric", month: "long" };
    const date = new Date(item.eventDate);
    return date.toLocaleDateString("id-ID", options);
  };

  const edgePaddingValue = 50;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRoute = () => {
    if (origin && destination) {
      // setShowDirections(true)
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };
  const origin = {
    latitude: item?.from.latitude,
    longitude: item?.from.longtitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const destination = {
    latitude: item?.dest.latitude,
    longitude: item?.dest.longtitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const navigation = useNavigation();

  return (
    <View style={styles.ShadowGoCycling} width={(10 / 11) * width}>
      <Text style={styles.Date}>{formatDate()}</Text>
      <Text style={styles.Title}>{item?.name}</Text>
      <MapView
        ref={mapRef}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        {item && (
          <MapViewDirections
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            origin={{
              latitude: item.from.latitude,
              longitude: item.from.longtitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            destination={{
              latitude: item.dest.latitude,
              longitude: item.dest.longtitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onReady={traceRoute}
          />
        )}
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  ShadowGoCycling: {
    backgroundColor: "white",
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 }, // Set the height value to 4 for shadow on all sides
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    padding: 8,
  },
  Title: {
    fontSize: Platform.OS === "ios" ? 18 : 14,
    // marginTop: Platform.OS === "ios" ? 15 : 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#293038",
    marginTop: 1,
  },
  Date: {
    marginTop: 10,
    fontSize: Platform.OS === "ios" ? 15 : 10,
    color: "#FFC329",
    fontWeight: "bold",
  },
  Destination: {
    fontSize: Platform.OS === "ios" ? 14 : 10,
    marginTop: 1,
    color: "#696e74",
    marginBottom: 10,
  },
  TouchableOpacity: {
    borderRadius: 10,
    width: "30%",
    height: 30,
    backgroundColor: "#FFC329",
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: "10",
  },
  ButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
