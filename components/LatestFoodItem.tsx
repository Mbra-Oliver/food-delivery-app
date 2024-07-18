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
          pathname: "/pages/foods/[id]",
          params: { id: food.id },
        })
      }
    >
      <Image
        source={{
          uri: `https://www.inspiredtaste.net/wp-content/uploads/2023/11/Fluffy-Spanish-Rice-1-1200.jpg`,
        }}
        resizeMode="cover"
        className="rounded-tr-lg rounded-tl-lg w-full h-48"
      />

      <View className="p-4 gap-3 ">
        <View className="flex-row items-center gap-1">
          <Text className="font-bold text-xl" numberOfLines={4}>
            {food.restaurant.name}- {food.name}
          </Text>
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
