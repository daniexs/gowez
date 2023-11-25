import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import CardHistory from "../components/CardHistory";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GET_HISTORIES = gql`
  query History($headers: Headers!) {
    getHistories(headers: $headers) {
      _id
      avgSpeed
      distance
      startDate
      endDate
      point
    }
  }
`;

const GET_PROFILE = gql`
  query Profile($headers: Headers!) {
    getUserDetail(headers: $headers) {
      profile {
        totalPoint
        totalTime
        totalDistance
      }
    }
  }
`;

const { height, width } = Dimensions.get("window");

export default function History() {
  const DATA = [
    {
      startTime: "2023-11-18T08:00:00",
      endTime: "2023-11-18T09:30:00",
      avgSpeed: 15.5,
      point: "A to B",
      distance: 20.3,
    },
    {
      startTime: "2023-11-19T14:30:00",
      endTime: "2023-11-19T16:00:00",
      avgSpeed: 12.2,
      point: "C to D",
      distance: 15.8,
    },
    {
      startTime: "2023-11-20T09:45:00",
      endTime: "2023-11-20T11:15:00",
      avgSpeed: 18.0,
      point: "E to F",
      distance: 25.1,
    },
    {
      startTime: "2023-11-21T07:15:00",
      endTime: "2023-11-21T08:00:00",
      avgSpeed: 10.5,
      point: "G to H",
      distance: 12.7,
    },
    {
      startTime: "2023-11-22T17:30:00",
      endTime: "2023-11-22T19:00:00",
      avgSpeed: 14.8,
      point: "I to J",
      distance: 18.4,
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const [token, setToken] = useState("");

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    setToken(token);
  };

  useEffect(() => {
    cekToken();
  }, []);

  const { data, loading, error } = useQuery(GET_HISTORIES, {
    variables: {
      headers: {
        access_token: token,
      },
    },
  });

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery(GET_PROFILE, {
    variables: {
      headers: {
        access_token: token,
      },
    },
  });

  // const [dataToShowInChart, setDataToShowInChart] = useState([]);

  // useEffect(() => {
  //   if(data?.getHistories?.length) {
  //     setDataToShowInChart(data?.getHistories.splice(data?.getHistories?.length-1, data?.getHistories?.length-8))
  //   }
  // }, [data])

  // console.log(data, error, "DATA");
  // console.log(token, "TOKEN");
  // console.log(profileData, profileError, "PROFILE DATA");
  console.log(data?.getHistories[0]?.distance, "APA GITU");
  return (
    <View style={styles.AndroidSafeArea}>
      <FlatList
        data={data?.getHistories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardHistory item={item} />}
        keyExtractor={(item) => item._id}
        ListFooterComponent={<View className="h-5"></View>}
        ListHeaderComponent={
          <View className="pt-3">
            <View style={styles.ContainerHistoryLatest}>
              <View style={styles.CardShadow}>
                <View>
                  <Text style={styles.TitleHistory}>Total Distance</Text>
                  <Text style={styles.DataHistory}>
                    {(
                      Number(
                        profileData?.getUserDetail?.profile?.totalDistance
                      ) / 1000
                    ).toFixed(2)}{" "}
                    km
                  </Text>
                </View>
              </View>
              <View style={styles.CardShadow}>
                <View>
                  <Text style={styles.TitleHistory}>Total Point</Text>
                  <Text style={styles.DataHistory}>
                    {profileData?.getUserDetail?.profile?.totalPoint}
                  </Text>
                </View>
              </View>
              <View style={styles.CardShadow}>
                <View>
                  <Text style={styles.TitleHistory}>Total Time</Text>
                  <Text style={styles.DataHistory}>
                    {profileData?.getUserDetail?.profile?.totalPoint}
                  </Text>
                </View>
              </View>
            </View>

            {/* CHART */}
            <View style={styles.ChartShadow}>
              {data?.getHistories && (
                <LineChart
                  data={{
                    labels: ["1", "2", "3", "4", "5", "6", "7"],
                    datasets: [
                      {
                        data: [
                          data?.getHistories.at(-1)?.distance / 1000 || 0,
                          data?.getHistories.at(-2)?.distance / 1000 || 0,
                          data?.getHistories.at(-3)?.distance / 1000 || 0,
                          data?.getHistories.at(-4)?.distance / 1000 || 0,
                          data?.getHistories.at(-5)?.distance / 1000 || 0,
                          data?.getHistories.at(-6)?.distance / 1000 || 0,
                          data?.getHistories.at(-7)?.distance / 1000 || 0,
                        ],
                      },
                    ],
                  }}
                  width={(9 / 10) * width} // from react-native
                  height={200}
                  yAxisSuffix=" m"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgb(252, 193, 41)`,
                    labelColor: (opacity = 1) => `rgb(21, 20, 27)`,
                    style: {
                      borderRadius: 16,
                      backgroundColor: "red",
                    },
                    propsForDots: {
                      r: "5",
                      strokeWidth: "2",
                      stroke: "#FFC329",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                  }}
                />
              )}
            </View>

            {/* My History */}
            <View>
              <Text
                className="font-bold text-[#293038]"
                style={{
                  fontSize: 24,
                  marginTop: Platform.OS === "ios" ? 15 : 10,
                }}
              >
                My History
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop:
    //   Platform.OS === "android" || Platform.OS === "ios"
    //     ? StatusBar.currentHeight
    //     : 0,
    // marginHorizontal: 14,
    // padding: 16,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  TitleHistory: {
    fontSize: Platform.OS === "ios" ? 18 : 14,
    fontWeight: "bold",
    color: "#293038",
    textAlign: "center",
  },
  DataHistory: {
    fontSize: Platform.OS === "ios" ? 14 : 10,
    textAlign: "center",
    marginTop: 1,
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
    // paddingVertical: Platform.OS === "ios" ? 15 : 15,
    paddingHorizontal: Platform.OS === "ios" ? 15 : 7,
    alignItems: "center",
    justifyContent: "center",
    height: (1 / 10) * height,
    marginHorizonal: 10,
  },
  ContainerHistoryLatest: {
    marginTop: 3,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  ChartShadow: {
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: "98%",
    alignSelf: "center",
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
});
