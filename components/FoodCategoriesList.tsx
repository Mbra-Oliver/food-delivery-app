import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFoodCategories } from "@/services/foods-cateogires.services";
import LoadingAreaIndicator from "./UI/LoadingAreaIndicator";
import SmallTuileCategory from "./SmallTuileCategory";

const FoodCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = () => {
      setLoading(true);
      fetchFoodCategories().then((response) => {
        if (response.status_code === 200) {
          const items = response.data.items;
          if (items.length > 8) {
            setCategories(items.slice(1, 9));
          } else {
            setCategories(items);
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
    <View className="flex flex-row flex-wrap ">
      {categories.map((item) => (
        <View key={item.id} className="w-1/4  p-2">
          <SmallTuileCategory categorie={item} />
        </View>
      ))}
    </View>
  );
};

export default FoodCategoriesList;
