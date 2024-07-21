import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { formateDateApi } from "@/constants/formatter";
const OrderItem = ({ order }: { order: any }) => {
  const totalPrice = order.foods.reduce(
    (acc: any, item: any) => acc + item.price,
    0
  );

  const onPress = () => {
    router.navigate({
      pathname: "/pages/orders/[id]",
      params: { id: order.id },
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
          <Text className="text-gray-500">
            {formateDateApi(order.created_at)}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-gray-900 font-bold">{totalPrice} FCFA</Text>
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
      <View className="flex-1 flex-row">
        <View className="bg-primary p-1 rounded-md">
          <Text className="text-black font-bold">Nouvelle commande</Text>
        </View>
        <View />
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
