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
    <View className="items-center gap-2">
      <Pressable onPress={() => onPressQuantity(1)}>
        <Text className=" text-black text-3xl">
          <AntDesign name="plus" size={16} />
        </Text>
      </Pressable>

      <View className="bg-primary-green aspect-square rounded-lg p-2 justify-center items-center ">
        <Text className="  text-xl text-white font-semibold ">{quantity}</Text>
      </View>
      <Pressable onPress={() => onPressQuantity(-1)}>
        <Text className=" text-black text-3xl font-bold">
          <AntDesign name="minus" size={16} />
        </Text>
      </Pressable>
    </View>
  );
};

export default FoodOrderQuantity;
