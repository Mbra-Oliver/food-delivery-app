import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FoodCookDeliveryInfoItem from "./FoodCookDeliveryInfoItem";

const FoodCookDeliveryInfo = () => {
  return (
    <View
      className={`bg-gray-200 rounded-lg p-4 flex-row justify-around items-center`}
    >
      <FoodCookDeliveryInfoItem />
      <FoodCookDeliveryInfoItem
        iconType="comment"
        value="+10"
        previewText="Commentaires"
      />
      <FoodCookDeliveryInfoItem
        iconType="rating"
        value="4.6"
        previewText="Note"
        last={true}
      />
    </View>
  );
};

export default FoodCookDeliveryInfo;
