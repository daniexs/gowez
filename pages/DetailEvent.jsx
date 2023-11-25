import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import MapViewDirections from "react-native-maps-directions";

// useQuery
const GET_EVENT_DETAIL = gql`
  query GetEventDetail($id: ID!, $headers: Headers!) {
    getEventDetail(id: $id, headers: $headers) {
      _id
      name
      eventCode
      eventDate
      createdBy
      isActive
      from {
        longtitude
        latitude
      }
      dest {
        longtitude
        latitude
      }
    },
    getUserDetail(headers: $headers) {
      user {
        _id
      }
      profile {
        username
      }
    }
  }
`;


export default function DetailEvent({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const GOOGLE_API_KEY = "AIzaSyBJJ8i1gcnkoBkRx-tqFn9Dam67n2zmJfo";

  const mapRef = useRef();

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const formatDate = () => {
    const options = { year: "numeric", day: "numeric", month: "long" };
    const date = new Date(data?.getEventDetail?.eventDate);
    return date.toLocaleDateString("id-ID", options);
  };

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    setToken(token);
  };

  const [token, setToken] = useState("");

  useEffect(() => {
    cekToken();
  }, []);

  const { data, loading, error } = useQuery(GET_EVENT_DETAIL, {
    variables: {
      headers: {
        access_token: token,
      },
      id,
    },
  });

  // console.log(data)


// console.log(data?.getEventDetail.createdBy , "<>><><><>");
// console.log(data?.getUserDetail?.user?._id , "<<<<<<<<<<<<<<>><><><>>>>>>>>>>>>>>");


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
    latitude: data?.getEventDetail?.from?.latitude,
    longitude: data?.getEventDetail?.from?.longtitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const destination = {
    latitude: data?.getEventDetail?.dest?.latitude,
    longitude: data?.getEventDetail?.dest?.longtitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  console.log(origin, destination)

  return (
    <View style={styles.AndroidSafeArea}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        {!loading && origin && destination && (
          <>
            <MapViewDirections
              apikey={GOOGLE_API_KEY}
              strokeColor="#6644ff"
              strokeWidth={4}
              origin={origin}
              destination={destination}
              onReady={traceRoute}
            />
            <Marker coordinate={origin} />
            <Marker coordinate={destination} />
          </>
        )}
      </MapView>
      <View style={{ paddingHorizontal: "5%" }}>
        <Text
          className="font-bold text-[#293038]"
          style={{
            fontSize: 24,
            marginTop: Platform.OS === "ios" ? 15 : 10,
          }}
        >
          {data?.getEventDetail?.name}
        </Text>
        <Text style={styles.Date}>{formatDate()}</Text>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate("CyclingParty", {
          eventCode: data?.getEventDetail?.eventCode,
          username: data?.getUserDetail?.profile?.username,
          origin: origin,
          destination: destination
        })}>
          <Text style={styles.TextButton}>Join Event</Text>
        </TouchableOpacity>
        {data?.getEventDetail.createdBy === data?.getUserDetail?.user?._id && (
          <TouchableOpacity style={styles.TouchableOpacityEnd}>
            <Text style={styles.TextEndEvent}>End Event</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" || Platform.OS === "ios"
        ? StatusBar.currentHeight
        : 0,
    // paddingHorizontal: 14,
    backgroundColor: "white",
  },
  map: {
    // width: "100%",
    // height: '70%',
    // borderRadius: '10',
    flex: 1,
  },
  TouchableOpacity: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#508D69",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  TextButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  TextEndEvent: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  TouchableOpacityEnd: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#DF2E38",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  Date: {
    fontSize: Platform.OS === "ios" ? 15 : 10,
    color: "#696e74",
    fontWeight: "bold",
  },
  Destination: {
    fontSize: Platform.OS === "ios" ? 14 : 10,
    marginTop: 10,
    color: "#696e74",
  },
});
