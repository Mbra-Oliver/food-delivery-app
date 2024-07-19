import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
const Empty = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="justify-center items-center gap-2">
        <Feather name="shopping-bag" size={80} color="black" />
        <Text className="text-xl ">Votre panier est vide !</Text>
        <Link href={"/"}>
          <Text className="text-primary">Retourner sur la liste</Text>
        </Link>
      </View>
    </View>
  );
};

export default Empty;
