import { View, Text, Pressable } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect, router } from "expo-router";
import { showFlashMessage } from "@/helpers/alertMessage";
const OrderCoupon = () => {
  const test = async () => {
    try {
      showFlashMessage("warning", "Maintenance système en cours...");
    } catch (error) {}
  };

  return (
    <View className="p-4 bg-black rounded-xl flex-row justify-between items-center gap-2 ">
      <View className="flex-1 ">
        <Text
          className="text-white w-full"
          style={{ fontFamily: "Lato" }}
          numberOfLines={2}
        >
          Vous avez 2x coupon de réservation gratuite !
        </Text>
      </View>
      <Pressable onPress={test} className="bg-[#48cd64] rounded-md p-4">
        <Text className="text-white" style={{ fontFamily: "Lato" }}>
          Commander
        </Text>
      </Pressable>
    </View>
  );
};

export default OrderCoupon;
