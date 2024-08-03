import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
const Empty = ({
  title = "Votre panier est vide",
  message = "Retourner sur la liste",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <View className="flex-1 bg-white  p-4 relative">
      <View className="flex items-start absolute p-4 mt-8 ">
        <Pressable onPress={router.back} className="bg-primary p-3 rounded-md">
          <AntDesign name="arrowleft" color="white" size={24} />
        </Pressable>
      </View>

      <View className="justify-center h-full items-center gap-2">
        <Feather name="shopping-bag" size={80} color="black" />
        <Text className="text-4xl ">{title} !</Text>

        <Text className="text-center text-lg" numberOfLines={4}>
          {message}
        </Text>
        <Link href={"/"} className="flex">
          <Text className="text-primary text-center" numberOfLines={4}>
            Retourner sur la liste
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default Empty;
