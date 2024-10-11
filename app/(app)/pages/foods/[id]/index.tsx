import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { CartContext } from "@/helpers/providers/CartContextProvider";

const index = () => {
  const { items } = useContext(CartContext);

  const { id } = useLocalSearchParams();

  const [food, setFood] = useState<IFood>();
  const [loading, setLoading] = useState<boolean>(false);
  const [foodInCart, setFoodInCart] = useState<boolean>(false);

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

  useEffect(() => {
    const checkFoodExist = items.some((food) => String(food.food.id) === id);
    setFoodInCart(checkFoodExist);
  }, [items, id]);

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
        <View className="h-[300px]  ">
          <View className="p-8">
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" color={"white"} size={24} />
            </Pressable>
          </View>
          <View className="flex justify-center items-center ">
            <Image
              className=" w-[200] h-[200] border-4 border-primary rounded-full"
              source={{
                uri: imageUri,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="px-6 py-4 rounded-tl-[30]  rounded-tr-[30] bg-white flex-1">
          <View className="flex-1">
            <View className="flex-row items-center justify-between gap-2 mb-4">
              <View>
                <View className="gap-2">
                  <Text
                    numberOfLines={4}
                    style={{ fontFamily: "Lato" }}
                    className="flex-wrap"
                  >
                    {food.restaurant.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "Lato" }}
                    className="text-xs text-gray-600"
                  >
                    {" "}
                    {food.restaurant.email}
                  </Text>
                </View>

                <Text className="text-2xl mt-4" style={{ fontFamily: "Lato" }}>
                  {food.name}
                </Text>
              </View>
              <View>
                <Text style={{ fontFamily: "Lato" }}>
                  <Text
                    className="font-extrabold text-xl "
                    style={{ fontFamily: "Lato" }}
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
                  style={{ fontFamily: "Lato" }}
                  className="text-xl text-gray-500"
                >
                  Description
                </Text>
              </View>

              <ScrollView
                className="h-[200]"
                showsVerticalScrollIndicator={false}
              >
                <View className="flex-row gap-2 mb-4 ">
                  <Text className="text-xl" style={{ fontFamily: "Lato" }}>
                    {food.description}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
          <View>
            {/* Mettre en bas de l'ecran */}
            <AddToCartButton existInCart={foodInCart} foodData={food} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
