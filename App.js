import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "./navigator/MainTab";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useMyStore from "./store/MainStore";
import { useEffect } from "react";
// import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
const client = new ApolloClient({
  uri: "https://gowez-server.huseinhk.me/",
  cache: new InMemoryCache(),
});

// if (__DEV__) {
//   loadDevMessages()
//   loadErrorMessages()
// }

export default function App() {
  const authStore = useMyStore((state) => state.isLoggedIn);
  const updateIsLoggedIn = useMyStore((state) => state.setAccessToken);
  // const getToken = useMyStore((state) => state.getAccessToken)

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      console.log("masuk if");
      // console.log(token , "<<<<");
      updateIsLoggedIn(true);
    }
  };

  useEffect(() => {
    cekToken();
  }, []);
  const Stack = createNativeStackNavigator();
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);
  console.log(isLoggedIn, "<<<<<<<<<<<<<");

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? (
          <MainTab />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
}
