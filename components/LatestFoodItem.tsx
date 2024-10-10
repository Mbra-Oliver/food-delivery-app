import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IFood } from "@/interfaces/IFood";
import { router } from "expo-router";

const LatestFoodItem = ({ food }: { food: IFood }) => {
  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${food.default_image}`;

  return (
    <TouchableOpacity
      style={{
        elevation: 1,
        aspectRatio: 1,
        width: 150, // Largeur fixe pour l'assiette
      }}
      className="bg-white rounded-full p-2 flex justify-center items-center"
      onPress={() =>
        router.navigate({
          pathname: "/pages/foods/[id]",
          params: { id: food.id },
        })
      }
    >
      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: imageUri,
          }}
          resizeMode="cover"
          className="rounded-full w-20 h-20 mb-2"
        />
        <Text
          className="text-center px-2 text-neutral-500 py-1"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ fontFamily: "Jonesy" }}
        >
          {food.name}
        </Text>
        <Text
          className=" text-center text-xs  mt-1"
          style={{ fontFamily: "Jonesy" }}
          numberOfLines={1}
        >
          {food.price} FCFA
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LatestFoodItem;
