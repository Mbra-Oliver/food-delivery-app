import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { fetchLatestFood } from "@/services/foods.services";
import LoadingAreaIndicator from "./UI/LoadingAreaIndicator";
const DATAS = [1, 2, 3, 4, 5, 6, 7, 8];

const FoodCardList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = () => {
      setLoading(true);
      fetchLatestFood().then((response) => {
        if (response.status_code === 200) {
          const items = response.data.items;
          if (items.length > 8) {
            setFoods(items.slice(1, 9));
          } else {
            setFoods(items);
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  return (
    <View className="mt-6 gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl">Les plus commandés</Text>
        <TouchableOpacity>
          <Text className="text-[#48cd64] font-bold">Les plus proches</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerClassName="gap-4 mb-4"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{ elevation: 1, width: 250 }}
            className=" bg-white border border-gray-100 rounded-xl"
          >
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?background=48cd64&color=fff&name=${item.name}`,
              }}
              resizeMode="cover"
              style={{ aspectRatio: 4 / 3 }}
              className="rounded-tr-lg rounded-tl-lg"
            />

            <View className="p-4 gap-3 ">
              <View className="flex-row items-center gap-1">
                <Text className="font-bold text-xl">
                  {item.restaurant.name}-
                </Text>
                <Text className="font-bold text-xl">{item.name}</Text>
              </View>

              <Text className="text-md">{item.description}</Text>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={16}
                    color="black"
                  />
                  <Text>~10 min</Text>
                </View>
                <Text className="font-bold text-xl">{item.price} FCFA</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FoodCardList;
