import { View, Pressable, Text } from "react-native";
import React from "react";

const ComfirmPayment = () => {
  return (
    <Pressable className="flex-1 bg-primary p-4 flex-row justify-center rounded-md items-center">
      <Text className="text-white text-xl ">Ajouter au panier </Text>
    </Pressable>
  );
};

export default ComfirmPayment;
