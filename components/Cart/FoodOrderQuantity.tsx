import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const FoodOrderQuantity = () => {
  return (
    <View className=" bg-[rgb(231,234,243)] flex-row items-center gap-6 px-2  rounded-full">
      <Pressable>
        <Text className=" text-black text-2xl">
          <AntDesign name="minus" size={16} />
        </Text>
      </Pressable>
      <Text className=" text-black text-xl">1</Text>
      <Pressable>
        <AntDesign name="plus" size={16} />
      </Pressable>
    </View>
  );
};

export default FoodOrderQuantity;
