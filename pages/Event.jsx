import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Tab, TabView } from "@rneui/themed";
import CardEvent from "../components/CardEvent";
import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  ApolloProvider,
  gql,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CardPastEvent from "../components/CardPastEvent";
const GET_EVENTS = gql`
  query GetEvents($headers: Headers!, $filter: String) {
    getEvents(headers: $headers, filter: $filter) {
      _id
      name
      eventCode
      eventDate
      createdBy
      isActive
      from {
        altitude
        longtitude
        latitude
      }
      dest {
        altitude
        longtitude
        latitude
      }
    }
  }
`;

const GET_EVENTS_INACTIVE = gql`
  query GetEvents($headers: Headers!, $filter: String) {
    getEvents(headers: $headers, filter: $filter) {
      _id
      name
      eventCode
      eventDate
      createdBy
      isActive
      from {
        altitude
        longtitude
        latitude
      }
      dest {
        altitude
        longtitude
        latitude
      }
    }
  }
`;

const GET_MY_EVENTS = gql`
  query GetEvents($headers: Headers!, $filter: String) {
    getEvents(headers: $headers, filter: $filter) {
      _id
      name
      eventCode
      eventDate
      createdBy
      isActive
      from {
        altitude
        longtitude
        latitude
      }
      dest {
        altitude
        longtitude
        latitude
      }
    }
  }
`;
export default function Event() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    myRefetch();
    setRefreshing(false);
  }, [myRefetch]);
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    cekToken();
  }, []);

  const cekToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    setToken(token);
  };

  const { data, loading, error } = useQuery(GET_EVENTS, {
    variables: {
      headers: {
        access_token: token,
      },
      filter: "active",
    },
  });

  const {
    data: data_inactive,
    loading: loading_inactive,
    error: error_inactive,
  } = useQuery(GET_EVENTS_INACTIVE, {
    variables: {
      headers: {
        access_token: token,
      },
      filter: "inactive",
    },
  });

  const {
    data: myData,
    loading: myLoading,
    error: myError,
    refetch: myRefetch,
  } = useQuery(GET_MY_EVENTS, {
    variables: {
      headers: {
        access_token: token,
      },
      filter: "my-event",
    },
  });

  console.log(myData);

  const [index, setIndex] = useState(0);
  return (
    <View style={styles.AndroidSafeArea}>
      {/* TITLE EVENTS */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: Platform.OS === "ios" ? 15 : 10,
        }}
      >
        <Text
          className="font-bold text-[#293038]"
          style={{
            fontSize: 24,
            marginTop: Platform.OS === "ios" ? 15 : 10,
          }}
        >
          Events
        </Text>
      </View>

      {/* FILTER EVENT */}
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        style={styles.tabContainer}
        indicatorStyle={styles.tabIndicator}
      >
        <Tab.Item
          title="Active Event"
          titleStyle={
            index === 0
              ? [styles.tabTitle, styles.selectedTabTitle]
              : styles.tabTitle
          }
        />
        <Tab.Item
          title="Past Event"
          titleStyle={
            index === 1
              ? [styles.tabTitle, styles.selectedTabTitle]
              : styles.tabTitle
          }
        />
        <Tab.Item
          title="Your Event"
          titleStyle={
            index === 2
              ? [styles.tabTitle, styles.selectedTabTitle]
              : styles.tabTitle
          }
        />
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        style={styles.tabViewContainer}
      >
        <TabView.Item style={styles.tabViewItem}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data?.getEvents}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CardEvent item={item} />}
            keyExtractor={(item) => item._id}
          />
        </TabView.Item>

        <TabView.Item style={styles.tabViewItem}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data_inactive?.getEvents}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CardPastEvent item={item} />}
            keyExtractor={(item) => item._id}
          />
        </TabView.Item>

        <TabView.Item style={styles.tabViewItem}>
          {myData?.getEvents?.length === 0 ? (
            <View
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Text style={styles.Title}>You don't have an event yet.</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.TouchableOpacity}
                  onPress={() => navigation.navigate("Create Event")}
                >
                  <Text style={styles.TextButton}>Create Event</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.ButtonContainerTop}>
                <TouchableOpacity
                  style={styles.TouchableOpacityTop}
                  onPress={() => navigation.navigate("Create Event")}
                >
                  <Text className="text-xs text-white font-bold">
                    Create Event
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={myData?.getEvents}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <CardEvent item={item} />}
                keyExtractor={(item) => item._id}
              />
            </View>
          )}
        </TabView.Item>
      </TabView>
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
  RowRecentHistory: {
    flexDirection: "row",
    gap: 55,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: Platform.OS === "ios" ? 25 : 10,
    padding: 3,
  },
  FilterData: {
    fontSize: Platform.OS === "ios" ? 18 : 14,
    fontWeight: "bold",
    color: "#293038",
  },
  tabContainer: {
    // backgroundColor: "#F5F5F5",
    // borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  tabIndicator: {
    backgroundColor: "#293038",
    height: 0,
    borderRadius: 10,
  },
  selectedTabTitle: {
    borderRadius: 10,
    backgroundColor: "#293038",
    color: "white", // Adjust the color as needed
    overflow: "hidden",
  },
  tabTitle: {
    fontSize: Platform.OS === "ios" ? 13 : 10,
    fontWeight: "bold",
    color: "#293038",
  },
  tabViewContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
  },
  tabViewItem: {
    width: "100%",
    justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",
    // flex: 1,
    padding: 5,
    // marginLeft: 10
  },
  TouchableOpacity: {
    borderRadius: 10,
    width: "50%",
    height: 40,
    backgroundColor: "#FFC329",
    alignItems: "center",
    justifyContent: "center",
  },
  TextButton: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  Title: {
    fontSize: Platform.OS === "ios" ? 18 : 14,
    // marginTop: Platform.OS === "ios" ? 15 : 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#293038",
    marginTop: 1,
  },
  ButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  ButtonContainerTop: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  TouchableOpacityTop: {
    borderRadius: 10,
    width: "30%",
    height: 40,
    backgroundColor: "#FFC329",
    alignItems: "center",
    justifyContent: "center",
  },
});
