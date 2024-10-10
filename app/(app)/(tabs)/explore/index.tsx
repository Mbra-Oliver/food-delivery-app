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
import { useLocalSearchParams } from "expo-router";
import Empty from "@/components/Cart/Empty";
export default function ExploreIndex() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState<Array<IFood>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategorieId, setSelectedCategorieId] = useState<any>([]);
  const { searchParam } = useLocalSearchParams();

  const [search, setSearch] = useState<string | undefined>(undefined);
  console.log(searchParam);

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam.toString());
    } else {
      setSearch(undefined);
    }
  }, [searchParam]);

  useEffect(() => {
    const fetchCategories = () => {
      setLoading(true);
      fetchFoodCategories().then((response) => {
        if (response.status_code === 200) {
          const items = response.data.items;

          setCategories(items);

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
        const response = await paginateFood(selectedCategorieId, search);

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
  }, [selectedCategorieId, search]);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  return (
    <SafeAreaView className="flex-1 ">
      <View className="p-4 bg-primary h-full">
        <View className="mb-4">
          <Text className="text-2xl font-semibold">Découvrez les recettes</Text>
          <Text className="text-2xl font-semibold text-primary-green">
            de chez vous
          </Text>
        </View>
        <View className="bg-white border border-gray-200 rounded-full">
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

        {search && (
          <Text className="mt-4 text-xl">
            Recherche: <Text className="font-bold">{search}</Text>{" "}
          </Text>
        )}

        <View className="mt-4 mb-10">
          <FlatList
            numColumns={2}
            data={foods}
            showsVerticalScrollIndicator={false}
            columnWrapperClassName="gap-4 mt-4 mb-4"
            contentContainerClassName="pb-20"
            keyExtractor={(item: IFood) => item.id.toString()}
            renderItem={({ item }) => (
              <FoodListItem key={item.id} food={item} />
            )}
            ListEmptyComponent={() => (
              <Empty
                title="Aucun repas trouvé pour cette catégorie"
                message="Changer de catégorie. Nous nous occupons de remplir le stock"
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
