import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { Button } from "@rneui/themed";

import { useNavigation, useRoute } from "@react-navigation/core";
const { width, height } = Dimensions.get('window')

export default function Summary() {
  const route = useRoute()
  const navigation = useNavigation()
  const { point, time, distance, avgSpeed } = route.params
  console.log({ point, time, distance, avgSpeed }, "MANA RESULTNYAAAAAAA");
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 14, marginTop: 1 / 8 * height }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <LottieView source={require("../assets/ngontel.json")} autoPlay loop />
        </View>
        <View style={{ alignSelf: "center", marginVertical: 20, flex: 1 }}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>Your Result</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View style={{ rowGap: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <Entypo name="ruler" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 22 }}>Distance</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="clockcircle" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 22 }}>Time</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="speedometer" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 22 }}>Avg Speed</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5 name="coins" size={24} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 22 }}>Point</Text>
            </View>
          </View>
          <View style={{ rowGap: 15 }}>
            <Text
              style={{ fontSize: 22, fontWeight: "500", alignSelf: "flex-end" }}
            >
              {distance} m
            </Text>
            <Text
              style={{ fontSize: 22, fontWeight: "500", alignSelf: "flex-end" }}
            >
              {time}
            </Text>
            <Text
              style={{ fontSize: 22, fontWeight: "500", alignSelf: "flex-end" }}
            >
              {(avgSpeed * 3.6).toFixed(2)} km/H
            </Text>
            <Text
              style={{ fontSize: 22, fontWeight: "500", alignSelf: "flex-end" }}
            >
              {point}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('home')} >
        <Text>Back to Home</Text>
    </TouchableOpacity> */}
      <Button
        onPress={() =>
          navigation.navigate("home")
        }
        title="Back To Home"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#FFC329",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
          alignSelf: "center"
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" || Platform.OS === "ios" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
})
