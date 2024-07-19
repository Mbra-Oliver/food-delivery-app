import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FoodInformationIconText from "@/components/Foods/FoodInformationIconText";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { showFlashMessage } from "@/helpers/alertMessage";
import FoodOrderQuantity from "@/components/Cart/FoodOrderQuantity";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { IFood } from "@/interfaces/IFood";
import { getOneFood } from "@/services/foods.services";

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

  return (
    <View className="flex-1 bg-[#2a2d32]">
      <StatusBar style="light" />
      <View className=" flex-1 p-4 relative">
        <View className="flex-row justify-between items-center  mt-6">
          <View>
            <Pressable
              onPress={router.back}
              className="w-14 h-14 rounded-full p-1 bg-[#53565a] justify-center items-center"
            >
              <AntDesign name="arrowleft" size={24} color={"white"} />
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() =>
                showFlashMessage("success", "Produit ajouté au favoris")
              }
              className="w-14 h-14 rounded-full p-1 bg-white justify-center items-center"
            >
              <AntDesign name="heart" size={24} color={"red"} />
            </Pressable>
          </View>
        </View>
      </View>
      <View
        className="bg-white rounded-tl-3xl rouded-tr-lg rounded-tr-3xl p-4 relative"
        style={{ flex: 2 }}
      >
        <View className="flex-1 relative">
          <View className="flex items-center justify-center mb-20">
            <View className="absolute  -top-44 index">
              <Image
                className=" w-[200] h-[200] border-2 border-[#2a2d32] rounded-full"
                source={{
                  uri: "https://www.inspiredtaste.net/wp-content/uploads/2023/11/Fluffy-Spanish-Rice-1-1200.jpg",
                }}
                resizeMode="cover"
              />
            </View>
          </View>

          <ScrollView
            contentContainerClassName="pb-20"
            showsVerticalScrollIndicator={false}
          >
            <Text className="font-bold text-3xl text-center" numberOfLines={2}>
              {food.name}
            </Text>

            <View className="flex-row gap-2 items-center justify-center mt-4 mb-4">
              <FoodInformationIconText text="10 min." imageNumb="foodIcon1" />
              <FoodInformationIconText
                text="280 calories."
                imageNumb="foodIcon2"
              />
              <FoodInformationIconText text="6.9 /10." imageNumb="foodIcon3" />
            </View>

            <View>
              <Text numberOfLines={40} className="text-xl text-gray-600">
                {food.description}
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Text>
            </View>
          </ScrollView>

          <View className="absolute pt-10 flex-row justify-between  gap-4 bottom-0 ">
            <AddToCartButton foodData={food} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
