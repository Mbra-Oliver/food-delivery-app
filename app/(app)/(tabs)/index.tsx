import FoodCardList from "@/components/FoodCardList";
import FoodCategoriesList from "@/components/FoodCategoriesList";
import OrderCoupon from "@/components/OrderCoupon";
import SearchInput from "@/components/SearchInput";
import SmallTuileCategory from "@/components/SmallTuileCategory";
import UserProfile from "@/components/UserProfile";
import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.root} className="bg-white">
      <StatusBar />
      <View className="mt-10 gap-4 px-4 mb-4">
        <UserProfile />
        <SearchInput />

        {/* <OrderCoupon /> */}
      </View>
      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
        contentContainerClassName=" "
      >
        <FoodCategoriesList />

        <FoodCardList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
