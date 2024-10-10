import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FoodInformationIconText from "@/components/Foods/FoodInformationIconText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { showFlashMessage } from "@/helpers/alertMessage";
import FoodOrderQuantity from "@/components/Cart/FoodOrderQuantity";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { IFood } from "@/interfaces/IFood";
import { getOneFood } from "@/services/foods.services";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodCookDeliveryInfo from "@/components/Foods/FoodCookDeliveryInfo/FoodCookDeliveryInfo";

const index = () => {
  const { id } = useLocalSearchParams();

  const [food, setFood] = useState<IFood>();
  const [loading, setLoading] = useState<boolean>(false);

  if (!id) return;
  useEffect(() => {
    const fetchFood = () => {
      setLoading(true);
      getOneFood(+id).then((response) => {
        if (response.status_code === 200) {
          setFood(response.data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    };

    fetchFood();
  }, []);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  if (!food) {
    return;
  }

  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${food.default_image}`;
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-green h-full w-full">
        <View className="h-[300px] flex justify-center items-center  ">
          <Image
            className=" w-[200] h-[200] border-4 border-primary rounded-full"
            source={{
              uri: imageUri,
            }}
            resizeMode="cover"
          />
        </View>
        <View className="px-6 py-4 rounded-tl-[30]  rounded-tr-[30] bg-white flex-1">
          <View className="flex-row items-center justify-between gap-2 mb-4">
            <View>
              <View className="gap-2">
                <Text
                  numberOfLines={4}
                  style={{ fontFamily: "Jonesy" }}
                  className="flex-wrap"
                >
                  {food.restaurant.name}
                </Text>
                <Text
                  style={{ fontFamily: "Jonesy" }}
                  className="text-xs text-gray-600"
                >
                  {" "}
                  {food.restaurant.email}
                </Text>
              </View>

              <Text className="text-2xl mt-4" style={{ fontFamily: "Jonesy" }}>
                {food.name}
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Jonesy" }}>
                <Text
                  className="font-extrabold text-xl "
                  style={{ fontFamily: "Jonesy" }}
                >
                  {food.price}
                </Text>{" "}
                CFA
              </Text>
            </View>
          </View>

          <FoodCookDeliveryInfo />

          <View className="mt-8">
            <View>
              <Text
                style={{ fontFamily: "Jonesy" }}
                className="text-xl text-gray-500"
              >
                Description
              </Text>
            </View>

            <ScrollView>
              <View className="flex-row gap-2 mb-4 ">
                <Text className="text-xl" style={{ fontFamily: "Jonesy" }}>
                  {food.description}
                </Text>
              </View>
            </ScrollView>
          </View>
          <View>
            {/* Mettre en bas de l'ecran */}
            <AddToCartButton foodData={food} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
