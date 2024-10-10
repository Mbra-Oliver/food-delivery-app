import { View, Text } from "react-native";
import React from "react";

const OrderResume = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <View className="gap-2 w-full">
      <View className="flex-row items-center justify-between">
        <Text>Commandes</Text>
        <Text className="text-xl font-bold">{totalPrice} FCFA</Text>
      </View>
      <View className="flex-row items-center justify-between border-b border-dashed border-neutral-800 pb-4 mb-4 ">
        <Text>Frais livraison</Text>
        <Text className="text-xl">0 FCFA</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-xl">Total</Text>
        <Text className="text-xl font-bold text-black ">{totalPrice} FCFA</Text>
      </View>
    </View>
  );
};

export default OrderResume;
