import { View, Text, Pressable } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect, router } from "expo-router";
const OrderCoupon = () => {
  const test = async () => {
    const result = await SecureStore.deleteItemAsync("FOOD_USER_TOKEN");
    return router.replace("/");
  };

  return (
    <View className="p-4 bg-black rounded-xl flex-row justify-between items-center">
      <View className="flex-1">
        <Text
          className="text-white"
          numberOfLines={2}
          style={{ lineHeight: 30 }}
        >
          Vous avez 2x coupon de réservation gratuite !
        </Text>
      </View>
      <Pressable onPress={test} className="bg-[#48cd64] rounded-md p-4">
        <Text className="text-white font-bold">Commander</Text>
      </Pressable>
    </View>
  );
};

export default OrderCoupon;
