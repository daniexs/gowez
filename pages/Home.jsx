import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  ApolloProvider,
  gql,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window");

function HomePage({ navigation }) {
  const [homestats, setHomestats] = useState(null);
  const getDetailUser = async () => {
    const QUERY_GET_HOME = gql`
      query Profile($headers: Headers!, $getHistoriesHeaders2: Headers!) {
        getUserDetail(headers: $headers) {
          profile {
            name
            totalPoint
          }
        }
        getHistories(headers: $getHistoriesHeaders2) {
          avgSpeed
          distance
          startDate
          endDate
        }
      }
    `;

    try {
      const client = new ApolloClient({
        uri: "https://gowez-server.huseinhk.me/",
        cache: new InMemoryCache(),
      });

      const { data } = await client.query({
        query: QUERY_GET_HOME,
        variables: {
          headers: {
            access_token: await cekToken(),
          },
          getHistoriesHeaders2: {
            access_token: await cekToken(),
          },
        },
      });
      // console.log(lastData , "INI INDEX TERAKHIR");
      // console.log(data.getHistories.length - 1.distance, "DAARI HOME<><><><><><<><>><><><");

      setHomestats(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error Render Home , please check your Connection");
    }
  };
  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    return token;
  };

  useEffect(() => {
    getDetailUser();
  }, []);
  return (
    <ScrollView style={styles.AndroidSafeArea}>
      {/* HI, USERNAME */}
      <View className="flex flex-row" style={{ marginTop: 20 }}>
        <View className="flex-1 items-left justify-center">
          <Text style={styles.TextHi}>
            Hi,{" "}
            <Text className="font-bold text-[#293038]">
              {homestats?.getUserDetail?.profile?.name}
            </Text>
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View
              style={{
                alignItems: "left",
                justifyContent: "center",
                marginRight: 4,
              }}
            >
              <FontAwesome5 name="coins" size={11} color="#ffc329" />
            </View>
            <Text className="font-bold text-xs text-[#293038]">
              {homestats?.getUserDetail?.profile.totalPoint}
            </Text>
          </View>
        </View>
      </View>

      {/* GET OUT WHEELS EVERY ZONE */}
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 10 : 20,
        }}
      >
        <Text style={styles.TitleHeader}>
          Get <Text style={{ fontWeight: "bold", color: "#293038" }}>Out!</Text>
        </Text>
        <Text style={styles.TitleHeader}>
          Wheels Every{" "}
          <Text style={{ fontWeight: "bold", color: "#293038" }}>Zone</Text>
        </Text>
      </View>

      <View style={{ width: "100%", height: "100%" }}>
        <Image
          style={styles.Banner}
          source={require("../assets/ngontel2.png")}
        />

        {/* RECENT HISTORY */}
        <Text style={styles.Title}>Recent History</Text>
        <View style={styles.RowRecentHistory}>
          <View style={styles.CardShadow}>
            <View>
              <Text style={styles.TitleHistory}>Distance</Text>
              <Text style={styles.DataHistory}>
                {(
                  homestats?.getHistories[homestats.getHistories.length - 1]
                    ?.distance / 1000
                ).toFixed(2)}{" "}
                km
              </Text>
            </View>
          </View>
          <View style={styles.CardShadow}>
            <View>
              <Text style={styles.TitleHistory}>Speed</Text>
              <Text style={styles.DataHistory}>
                {(
                  homestats?.getHistories[homestats.getHistories.length - 1]
                    ?.avgSpeed * 3.6
                ).toFixed(2)}{" "}
                km/H
              </Text>
            </View>
          </View>
          <View style={styles.CardShadow}>
            <View>
              <Text style={styles.TitleHistory}>Time</Text>
              <Text style={styles.DataHistory}>
                {(
                  (new Date(
                    homestats?.getHistories[
                      homestats.getHistories.length - 1
                    ]?.endDate
                  ) -
                    new Date(
                      homestats?.getHistories[
                        homestats.getHistories.length - 1
                      ]?.startDate
                    )) /
                  1000 /
                  60
                ).toFixed(2)}{" "}
                Min
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.SeeAll}>
            <Text
              style={styles.TextSeeAll}
              onPress={() => navigation.navigate("History")}
            >
              See all
            </Text>
          </View>
        </View>
        {/* GO CYCLING */}
        <Text style={styles.Title}>Go Cycling</Text>
        <View style={styles.ShadowGoCycling}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/map.png")}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.CaptionGoCycling}>
                Find your location, and unlock a world of cycling adventures
                with Gowez!
              </Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => navigation.navigate("Cycling")}
                >
                  <Text style={styles.TextButton}>Go</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View
          className="mt-3"
          style={{ ...styles.ShadowGoCycling, marginBottom: (1 / 16) * height }}
        >
          <View>
            <Text className="text-center">
              Point calculation is based on distance (m) / time (s) x 10
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" || Platform.OS === "ios"
        ? StatusBar.currentHeight
        : 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  TitleHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#696e74",
    // marginTop: Platform.OS === "ios" ? 5 : 3
  },
  ProfilePicture: {
    borderWidth: 4,
    borderColor: "#FFC329",
    borderRadius: 6,
    overflow: "hidden",
  },
  Banner: {
    width: width,
    height: (1 / 4) * height,
    marginTop: Platform.OS === "ios" ? 15 : 10,
  },
  RowRecentHistory: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  CardShadow: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
      },
      android: {
        elevation: 5,
      },
    }),
    padding: Platform.OS === "ios" ? 15 : 7.5,
    alignItems: "center",
  },
  ShadowGoCycling: {
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
      },
      android: {
        elevation: 2,
      },
    }),
    padding: Platform.OS === "ios" ? 8 : 7.5,
  },
  TitleHistory: {
    fontSize: Platform.OS === "ios" ? 18 : 14,
    fontWeight: "bold",
    color: "#293038",
  },
  DataHistory: {
    fontSize: Platform.OS === "ios" ? 14 : 10,
    textAlign: "center",
    marginTop: 1,
    color: "#696e74",
  },
  CaptionGoCycling: {
    fontSize: 13,
    color: "#696e74",
    width: 200,
    marginTop: Platform.OS === "ios" ? 20 : 10,
  },
  TouchableOpacity: {
    borderRadius: 100,
    width: 50,
    height: 50,
    backgroundColor: "#FFC329",
    alignItems: "center",
    justifyContent: "center",
  },
  TextHi: {
    fontSize: Platform.OS === "ios" ? 14 : 16,
    marginTop: 1,
    color: "#696e74",
  },
  SeeAll: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 5 : 3,
  },
  TextSeeAll: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFC329",
  },
  Title: {
    fontSize: 24,
    marginTop: Platform.OS === "ios" ? 15 : 10,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#293038",
  },
  ButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: "50",
  },
  TextButton: {
    fontSize: 16,
    color: "white",
  },
  Coin: {
    fontSize: Platform.OS === "ios" ? 16 : 12,
    marginTop: 1,
    color: "#696e74",
  },
});

export default HomePage;
