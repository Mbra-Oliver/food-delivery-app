import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IFood } from "@/interfaces/IFood";
import { router } from "expo-router";

const LatestFoodItem = ({ food }: { food: IFood }) => {
  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${food.default_image}`;

  return (
    <TouchableOpacity
      style={{ elevation: 1, width: 150 }}
      className=" bg-white  rounded-2xl p-4"
      onPress={() =>
        router.navigate({
          pathname: "/pages/foods/[id]",
          params: { id: food.id },
        })
      }
    >
      <Image
        source={{
          uri: imageUri,
        }}
        resizeMode="cover"
        className="rounded-2xl w-full h-36 aspect-square"
      />

      <View className="p-4 gap-3 ">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold" numberOfLines={4}>
            {food.name}
          </Text>
        </View>

        <Text className="font-bold  text-center">{food.price} FCFA</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LatestFoodItem;
