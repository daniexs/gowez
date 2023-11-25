import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex flex-row ml-5 mr-5">
        <View className="flex-1 w-64 items-left justify-center">
          <Text className="text-lg text-[#696e74]">
            Hi, <Text className="font-bold text-[#293038]">[ Username ]</Text>
          </Text>
        </View>
        <Image
          className="rounded-md p-4 h-12 w-12 border-4 border-yellow-400"
          source={require("../assets/profile.jpg")}
        />
      </View>
      <View className="w-15 h-25 mt-2 ml-5 mr-5">
        <Text className="text-3xl font-medium text-[#696e74]">
          Get <Text className="font-extrabold text-[#293038]">Out!</Text>
        </Text>
        <Text className="text-3xl font-medium text-[#696e74]">
          Wheels Every{" "}
          <Text className="font-extrabold text-[#293038]">Zone</Text>
        </Text>
      </View>
      <View className="w-15 h-25 mt-7 ml-5 mr-5">
        <Text className="text-lg mb-3 font-bold text-[#293038] ">
          Recent History
        </Text>
        <View className="rounded-lg overflow-hidden drop-shadow-2xl border-2 border-gray-500  ">
          {/* <Text className="text-xl font-bold text-gray-800">Distance Total</Text> */}
          <View className="flex flex-row gap-x-20 ">
            <View>
              <Text className="text-lg font-bold text-gray-800">Range</Text>
              <Text className="text-sm text-center mt-1">50mil</Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-800">Speed</Text>
              <Text className="text-sm text-center mt-1">75km/H</Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-800">Power</Text>
              <Text className="text-sm text-center mt-1">387wH</Text>
            </View>
            {/* <Text className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text> */}
            <View className="mt-4"></View>
          </View>
        </View>
      </View>
      <View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 7,
    marginLeft: 7,
    marginTop: 45,
    //   alignItems: "center",
    //   justifyContent: "center",
  },
});

export default HomePage;
