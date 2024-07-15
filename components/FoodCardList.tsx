import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import React, { useEffect, useState } from "react";
import { fetchLatestFood } from "@/services/foods.services";
import LoadingAreaIndicator from "./UI/LoadingAreaIndicator";
import LatestFoodItem from "./LatestFoodItem";
import { IFood } from "@/interfaces/IFood";

const FoodCardList = () => {
  const [foods, setFoods] = useState<Array<IFood>>([]);
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
        keyExtractor={(item: IFood) => item.id.toString()}
        horizontal
        contentContainerClassName="gap-4 mb-4"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <LatestFoodItem food={item} />}
      />
    </View>
  );
};

export default FoodCardList;
