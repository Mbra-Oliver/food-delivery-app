import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
const DATAS = [1, 2, 3, 4, 5, 6, 7, 8];

const FoodCardList = () => {
  return (
    <View className="mt-6 gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl">Les plus commandés</Text>
        <TouchableOpacity>
          <Text className="text-[#48cd64] font-bold">Les plus proches</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATAS}
        keyExtractor={(item) => item.toString()}
        horizontal
        contentContainerClassName="gap-4 mb-4"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{ elevation: 1 }}
            className=" bg-white border border-gray-100 rounded-xl"
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmw9P3crYJSEBIJEcZnXEemWDWKulvXv7rw&s",
              }}
              resizeMode="cover"
              className="w-full h-60 overflow-hidden rounded-t-xl"
            />

            <View className="p-4 gap-3 ">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={16}
                  color="black"
                />
                <Text>~10 min</Text>
              </View>

              <Text className="font-bold text-xl">Nom de la pizza</Text>

              <Text>Restaurant chez Nina (centre ville)</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FoodCardList;
