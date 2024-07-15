import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IFood } from "@/interfaces/IFood";
import { router } from "expo-router";

const LatestFoodItem = ({ food }: { food: IFood }) => {
  return (
    <TouchableOpacity
      style={{ elevation: 1, width: 250 }}
      className=" bg-white border border-gray-100 rounded-xl"
      onPress={() =>
        router.navigate({
          pathname: "/foods/[id]",
          params: { id: food.id },
        })
      }
    >
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?background=48cd64&color=fff&name=${food.name}`,
        }}
        resizeMode="cover"
        style={{ aspectRatio: 4 / 3 }}
        className="rounded-tr-lg rounded-tl-lg"
      />

      <View className="p-4 gap-3 ">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-xl">{food.restaurant.name}-</Text>
          <Text className="font-bold text-xl">{food.name}</Text>
        </View>

        <Text className="text-md">{food.description}</Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={16}
              color="black"
            />
            <Text>~10 min</Text>
          </View>
          <Text className="font-bold text-xl">{food.price} FCFA</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LatestFoodItem;
