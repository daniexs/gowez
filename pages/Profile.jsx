import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import useMyStore from "../store/MainStore";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation();

  const logout = useMyStore((state) => state.logout);

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    return token;
  };

  const getUserDetail = async () => {
    const GET_USER_DETAIL = gql`
      query GetUserDetail($headers: Headers!) {
        getUserDetail(headers: $headers) {
          profile {
            _id
            userId
            name
            username
            phoneNumber
            address
            gender
            totalPoint
            totalDistance
            totalTime
          }
          user {
            email
          }
        }
      }
    `;

    try {
      const client = new ApolloClient({
        uri: "https://gowez-server.huseinhk.me/",
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: GET_USER_DETAIL,
        variables: {
          headers: {
            access_token: await cekToken(),
          },
        },
      });
      setUserProfile(data.getUserDetail);
    } catch (error) {
      console.error("Error fetching user detail:", error);
      Alert.alert("Failed to fetch user detail");
    }
  };
  useEffect(() => {
    getUserDetail();
    console.log(userProfile);
  }, []);
  return (
    <ImageBackground
      source={require("../assets/bg-profile1.jpg")} // Replace with your image source
      style={styles.AndroidSafeArea}
      resizeMode="cover"
    >
      <View>
        {userProfile && (
          <ScrollView>
            <View style={{ marginBottom: 15 }}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require("../assets/avatar.gif")}
                  style={styles.avatar}
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <TouchableOpacity
                  onPress={logout}
                  style={{
                    alignSelf: "center",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#FFC329",
                    width: "30%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 50, marginBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Personal Information
                </Text>
              </View>
              <View style={styles.cardContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Name : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Username : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.username}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Address : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.address}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 50, marginBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Private Information
                </Text>
              </View>
              <View style={styles.cardContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Email : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.user.email}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Phone Number : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.phoneNumber}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Gender : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.gender}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 50, marginBottom: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Cycle Statistics
                </Text>
              </View>
              <View style={styles.cardContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Total Point : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.totalPoint} pts
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Total Time : </Text>
                  <Text style={styles.containTitle}>
                    {Math.round(userProfile.profile.totalTime / 60)} Minutes
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.title}>Total Distance : </Text>
                  <Text style={styles.containTitle}>
                    {userProfile.profile.totalDistance} m
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    backgroundColor: "#D9D9D9",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#B7BAC3",
    marginVertical: 5,
  },
  containTitle: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "500",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    elevation: 10,
    marginHorizontal: 5,
  },
});
