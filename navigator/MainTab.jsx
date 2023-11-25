// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MainStack from "./MainStack";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import EventStack from "./EventStack";

export default function MainTab() {
  //   const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      barStyle={{ backgroundColor: "white", height: 67 }}
    >
      <Tab.Screen
        name="homeTab"
        component={MainStack}
        options={{
          title: "Home",
          tabBarLabelStyle: { color: "#293038", fontSize: 16 },
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="home"
              size={25}
              color={focused ? "#FFC329" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="leaderboard"
        component={Leaderboard}
        options={{
          title: "Leaderboard",
          tabBarLabelStyle: { color: "#293038", fontSize: 16 },
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="podium"
              size={25}
              color={focused ? "#FFC329" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="event"
        component={EventStack}
        options={{
          title: "Event",
          tabBarLabelStyle: { color: "#293038", fontSize: 16 },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="event-note"
              size={27}
              color={focused ? "#FFC329" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarLabelStyle: { color: "#293038", fontSize: 16 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              size={22}
              color={focused ? "#FFC329" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
