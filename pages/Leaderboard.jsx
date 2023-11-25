import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  FlatList,
  Platform,
  Alert,
  Image,
} from "react-native";
import Cardlead from "../components/CardLeaderboard";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);
  const [profile, setProfile] = useState(null);

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    return token;
  };

  const getLeaderboard = async () => {
    const GET_LEADERBOARD = gql`
      query GetLeaderboard($headers: Headers!) {
        getLeaderboard(headers: $headers) {
          _id
          name
          totalPoint
        }
      }
    `;

    const GET_PROFILE = gql`
      query Profile($headers: Headers!) {
        getUserDetail(headers: $headers) {
          profile {
            totalPoint
            _id
          }
          user {
            _id
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
        query: GET_LEADERBOARD,
        variables: {
          headers: {
            access_token: await cekToken(),
          },
        },
      });

      const { data: dataProfile } = await client.query({
        query: GET_PROFILE,
        variables: {
          headers: {
            access_token: await cekToken(),
          },
        },
      });
      // console.log(leaderboard,"<><><><><>");
      setLeaderboard(data.getLeaderboard);
      setProfile(dataProfile);
    } catch (error) {
      console.log(error);
      Alert.alert("Error Getting Leaderboard,Check your Connection!");
    }
  };

  useEffect(() => {
    // console.log(leaderboard, "<<<<<<<<<<<<<<");
    getLeaderboard();
  }, []);

  // console.log(profile, "<><><><><");

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/bg-leaderboard.jpg")}
      style={styles.AndroidSafeArea}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LEADERBOARD</Text>
      </View>
      <FlatList
        style={styles.containerList}
        data={leaderboard}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Cardlead key={index} data={item} index={index} />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  gap: 30,
                }}
              >
                <View className="justify-center">
                  <Text className="text-center">
                    {leaderboard?.map((el, i) =>
                      el._id === profile?.getUserDetail?.profile?._id
                        ? i + 1
                        : ""
                    )}
                  </Text>
                  <Text className="font-bold text-slate-500">Ranking</Text>
                </View>
                <View className="justify-center">
                  <View style={styles.avatarContainer}>
                    <Image
                      source={require("../assets/default-person.jpg")}
                      style={styles.avatar}
                    />
                  </View>
                </View>
                <View className="justify-center">
                  <Text className="text-center">
                    {profile?.getUserDetail?.profile?.totalPoint}
                  </Text>
                  <Text className="font-bold text-slate-500">Point</Text>
                </View>
              </View>
            </View>
          </View>
        }
      />
    </ImageBackground>
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
    // backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  containerList: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 5,
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-around",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
      },
      android: {
        elevation: 3,
      },
    }),
    padding: Platform.OS === "ios" ? 15 : 7.5,
    width: "98%",
    alignSelf: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "center",
    // marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    backgroundColor: "#D9D9D9",
  },
});
