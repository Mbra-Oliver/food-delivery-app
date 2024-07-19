import { View, Image, Text } from "react-native";
import React from "react";
import FoodOrderQuantity from "./FoodOrderQuantity";

const CartItem = () => {
  return (
    <View className="flex-row items-center justify-between pb-4 border-b border-gray-200">
      <View>
        <Image
          className=" w-20 h-20 border-2  rounded-full"
          source={{
            uri: "https://www.inspiredtaste.net/wp-content/uploads/2023/11/Fluffy-Spanish-Rice-1-1200.jpg",
          }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text className="font-bold text-center text-xl">Food Name</Text>
        <Text className="text-center mb-3">(Restaurant name)</Text>
        <FoodOrderQuantity />
      </View>
      <Text className="text-bold font-bold text-xl">10.009 FCFA</Text>
    </View>
  );
};

export default CartItem;
