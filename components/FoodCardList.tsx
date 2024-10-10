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
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchLatestFood();

        if (response.status_code === 200) {
          const items = response.data.items;
          if (items.length > 8) {
            setFoods(items.slice(1, 9));
          } else {
            setFoods(items);
          }
        } else {
          throw new Error(
            `Failed to fetch latest food: ${response.status_code}`
          );
        }
      } catch (error) {
        console.error("Error fetching latest food:", error);
        // Optionally, you can set an error state or handle it in another way
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center h-[300]">
        <Text style={{ fontFamily: "Jonesy" }}>
          Récupération des données en cours...
        </Text>
      </View>
    );
  }

  return (
    <View className="mt-6 gap-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl" style={{ fontFamily: "Jonesy" }}>
          Les plus commandés
        </Text>
        <TouchableOpacity>
          <Text
            className="text-primary-green font-semibold "
            style={{ fontFamily: "Jonesy" }}
          >
            Les plus proches
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerClassName="gap-4 mb-4"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <LatestFoodItem key={item.id} food={item} />}
      />
    </View>
  );
};

export default FoodCardList;
