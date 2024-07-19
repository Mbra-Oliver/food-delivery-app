import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";

const FoodOrderQuantity = ({
  quantity,
  onPressQuantity,
}: {
  quantity: number;
  onPressQuantity: any;
}) => {
  return (
    <View className=" bg-[rgb(231,234,243)] flex-row items-center gap-6 px-2  rounded-full w-[100]">
      <Pressable onPress={() => onPressQuantity(-1)}>
        <Text className=" text-black text-2xl">
          <AntDesign name="minus" size={16} />
        </Text>
      </Pressable>
      <Text className=" text-black text-xl">{quantity}</Text>
      <Pressable onPress={() => onPressQuantity(1)}>
        <AntDesign name="plus" size={16} />
      </Pressable>
    </View>
  );
};

export default FoodOrderQuantity;
