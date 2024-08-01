import SearchInput from "@/components/SearchInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  Text,
  Platform,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { fetchFoodCategories } from "@/services/foods-cateogires.services";
import { useState, useEffect } from "react";
import { fetchLatestFood, paginateFood } from "@/services/foods.services";
import { IFood } from "@/interfaces/IFood";
import AntDesign from "@expo/vector-icons/AntDesign";
import FoodListItem from "@/components/Foods/FoodListItem";
export default function ExploreIndex() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState<Array<IFood>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategorieId, setSelectedCategorieId] = useState<any>([]);

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

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const response = await paginateFood(selectedCategorieId);
        if (response.status_code === 200) {
          setFoods(response.data.items);
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

    fetchFoods();
  }, [selectedCategorieId]);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="dark" />
      <View className="p-4 bg-white h-full">
        <View className="">
          <Text className="text-2xl font-semibold">Découvrez les recettes</Text>
          <Text className="text-2xl font-semibold text-primary">
            de chez vous
          </Text>
        </View>
        <View className="bg-white border border-gray-200 rounded-md">
          <Picker
            selectedValue={selectedCategorieId}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategorieId(itemValue)
            }
          >
            {categories.map((item: any) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>

        <View className="mt-4">
          <FlatList
            numColumns={2}
            data={foods}
            showsVerticalScrollIndicator={false}
            columnWrapperClassName="gap-4 mt-4"
            keyExtractor={(item: IFood) => item.id.toString()}
            renderItem={({ item }) => (
              <FoodListItem key={item.id} food={item} />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
