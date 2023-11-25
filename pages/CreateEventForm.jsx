import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import Logo from "../assets/logoo.svg";

import { Icon } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const CreateEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //   const handleDateChange = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setDate(currentDate);
  //   };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  console.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const navigation = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/bg-leaderboard.jpg")}
      style={styles.AndroidSafeArea}
    >
      <View style={styles.ShadowGoCycling}>
        <View style={styles.logoContainer}>
          <Logo width={250} />
        </View>
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: "500", paddingHorizontal: 10 }}
          >
            Event Title:
          </Text>
          <Input
            value={title}
            onChangeText={(text) => setTitle(text)}
            // rightIcon={
            //   <Ionicons
            //     name="md-person"
            //     size={24}
            //     color="black"
            //     style={{ marginRight: 10 }}
            //   />
            // }
            placeholder="Enter the Event Title ...."
          />
        </View>
        <View>
          {/* <Button>
            <Text>Pick Date Event !</Text>
          </Button> */}
          <Button
            onPress={showDatepicker}
            title="Pick Date Event"
            icon={{
              name: "calendar",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#FFC329",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />
          <Button
            onPress={showTimepicker}
            title="Pick Time Event"
            icon={{
              name: "clock-o",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#FFC329",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />

          {/* <Button   title="Show date picker!" /> */}
          {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
          <Text style={{ alignSelf: "center" }}>
            selected: {date.toLocaleString()}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
        <Button
          onPress={() =>
            navigation.navigate("Create Location", {
              date: date,
              title: title,
            })
          }
          title="Next to Pick Maps"
          icon={{
            name: "map-o",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#FFC329",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
        {/* <Button
          title="Next"
          onPress={() => navigation.navigate("Create Location", {
            date: date,
            title: title
          })}
        /> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" || Platform.OS === "ios"
        ? StatusBar.currentHeight
        : 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
    justifyContent: "center",
  },
  ShadowGoCycling: {
    marginVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
      },
      android: {
        elevation: 7,
      },
    }),
    padding: Platform.OS === "ios" ? 8 : 7.5,
  },
  logoContainer: {
    alignItems: "center",
  },
});

export default CreateEventForm;
