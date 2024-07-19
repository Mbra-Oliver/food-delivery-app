import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
const OrderItem = ({ order }: { order: any }) => {
  console.log(order.foods);
  const onPress = () => {
    router.navigate({
      pathname: "/orders/[id]",
      params: { id: "1" },
    });
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className="border border-b border-gray-200 p-4 gap-1"
    >
      <View className="flex flex-row items-center justify-between">
        <View className="gap-2">
          <Text className="font-bold text-xl">Commande#: N. {order.id}</Text>
          <Text className="text-gray-500">{order.created_at}</Text>
          <View className="flex-row items-center">
            <MaterialIcons name="attach-money" size={16} color="black" />
            <Text className="text-gray-900 font-bold">30.000 FCFA</Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/2276/2276931.png?ga=GA1.1.255990895.1717282553&semt=ais_hybrid",
            }}
            resizeMode="contain"
            className="w-20 h-20"
            style={{ aspectRatio: 4 / 3 }}
          />
        </View>
      </View>
      <View>
        <Text className="text-primary">{order.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
