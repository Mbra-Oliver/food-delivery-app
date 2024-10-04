import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFoodCategories } from "@/services/foods-cateogires.services";
import LoadingAreaIndicator from "./UI/LoadingAreaIndicator";
import SmallTuileCategory from "./SmallTuileCategory";

const FoodCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchFoodCategories().catch((error) => {
          throw error; // re-throw l'erreur pour qu'elle soit catchée plus bas
        });
        if (response.status_code === 200) {
          const items = response.data.items;
          setCategories(items.slice(0, 8));
        } else {
          throw new Error(`Erreur ${response.status_code}`); // throw une erreur si le statut n'est pas 200
        }
      } catch (error) {
        console.error(error); // handle l'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={({ item }: { item: any }) => item}
      renderItem={({ item }: { item: any }) => (
        <SmallTuileCategory categorie={item} />
      )}
    />
  );
};

export default FoodCategoriesList;
