import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../assets/logoo.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  useMutation,
  gql,
} from "@apollo/client";
import useMyStore from "../store/MainStore";

export default function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const QUERY_LOGIN = gql`

  # interface Login {
  #   email: String
  #   password: String
  # }

    mutation Login($content: Login!) {
      login(content: $content) {
        access_token
      }
    }
  `;

  const authStore = useMyStore((state) => state.setAccessToken);
  const [login, { error }] = useMutation(QUERY_LOGIN, {
    onCompleted: async (data) => {
      try {
        await AsyncStorage.setItem("access_token", data?.login.access_token)
        authStore(true);
        Alert.alert("Success Login")
      } catch (error) {
        Alert.alert("Error , Failed set token");
        console.log(error);
      }
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error, check your email or password again ");
    },
  });

  const handleLogin = () => {
    login({ variables: { content: { email: emailInput, password: passwordInput } } });
  };

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.AndroidSafeArea}
    >
      <View style={styles.logoContainer}>
        <Logo width={250} />
      </View>
      <Text style={{ fontSize: 26, fontWeight: "bold", alignSelf: "center" }}>
        Login
      </Text>
      <View style={styles.containerForm}>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}>
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
            value={emailInput}
            onChangeText={(text) => setEmailInput(text)}
          />
        </View>
        <View>
          <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "500" }}>
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
            onChangeText={(text) => setPasswordInput(text)}
            value={passwordInput}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: "center", flexDirection: "row" }}>
        <Text style={{ fontSize: 18 }}>dont have account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
        >
          <Text style={{ color: "black", color: 'blue', marginLeft: 3, fontSize: 18 }}>Click Me </Text>
        </TouchableOpacity>
      </View>

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
  outlineButton: {
    marginTop: 20,
    borderColor: "#FFC329",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
});
