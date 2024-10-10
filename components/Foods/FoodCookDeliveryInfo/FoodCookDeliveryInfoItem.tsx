import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const FoodCookDeliveryInfoItem = ({
  iconType = "timer",
  value = "10 mins",
  previewText = "Livraison",
  last,
}: {
  iconType?: string;
  value?: string;
  previewText?: string;
  last?: boolean;
}) => {
  return (
    <View
      className={`justify-center items-center pr-4 ${
        !last && "border-r border-gray-500"
      }`}
    >
      <View className="gap-2 flex-row items-center">
        <Ionicons name="timer-outline" size={16} color="black" />
        <Text className="font-semibold" style={{ fontFamily: "Jonesy" }}>
          {value}
        </Text>
      </View>
      <Text className="text-normal " style={{ fontFamily: "Jonesy" }}>
        {previewText}
      </Text>
    </View>
  );
};

export default FoodCookDeliveryInfoItem;
