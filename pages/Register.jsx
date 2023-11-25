import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import Logo from "../assets/logoo.svg";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
    const navigation = useNavigation()
  const [selectGender, setSelectGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const handleRegister = async () => {
    try {
        const {data} = await register({variables : {content : {
            name, username , email , password , phoneNumber , address , gender:selectGender
        }}})
        Alert.alert("Success Register , Now you can Login!")
        navigation.navigate('login')
    } catch (error) {
      console.log(error, "<<<<<<<<<");
        Alert.alert("Error Register")
    }
  };

  const QUERY_REGISTER = gql`
    mutation Register($content: Register!) {
      register(content: $content) {
        message
      }
    }
  `;

  const [register] = useMutation(QUERY_REGISTER);

  const toggleCheckbox = (value) => {
    setSelectGender(value);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.AndroidSafeArea}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Logo width={250} />
        </View>
        <Text style={{ fontSize: 26, fontWeight: "bold", alignSelf: "center" }}>
          Register
        </Text>
        <View style={styles.containerForm}>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Name:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Name ...."
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Username:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Username ...."
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Email:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Email ...."
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Password:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Password ...."
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Phone Number:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Phone Number ...."
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Address:
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                height: 40,
                fontSize: 18,
                borderRadius: 20,
                paddingHorizontal: 5,
              }}
              placeholder="Enter Address ...."
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}
            >
              Gender:
            </Text>
            <CheckBox
              checked={selectGender === "Female"}
              onPress={() => toggleCheckbox("Female")}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#FFC329"
              title="Female"
            />
            <CheckBox
              checked={selectGender === "Male"}
              onPress={() => toggleCheckbox("Male")}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#FFC329"
              title="Male"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
    marginTop: -20,
  },
  logoContainer: {
    alignItems: "center",
    width: "auto",
  },
  containerForm: {
    padding: 15,
    backgroundColor: "#F4F4F4",
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#293038",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: "center",
    width: 200,
  },
  buttonText: {
    color: "#FFC329",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
