import SearchInput from "@/components/SearchInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="dark" />
      <View className="p-4 bg-white h-full">
        <View className="">
          <Text className="text-2xl font-semibold">Découvrez les recettes</Text>
          <Text className="text-2xl font-semibold text-primary">
            de chez vous
          </Text>
        </View>

        <View className="mt-4"></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
