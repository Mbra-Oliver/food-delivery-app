import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import FoodInformationIconText from "@/components/Foods/FoodInformationIconText";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { showFlashMessage } from "@/helpers/alertMessage";
import FoodOrderQuantity from "@/components/Foods/FoodOrderQuantity";
import AddToCartButton from "@/components/Foods/AddToCartButton";

const index = () => {
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="font-bold text-3xl text-center" numberOfLines={2}>
            Food Name here
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
            <Text numberOfLines={20} className="text-xl text-gray-600">
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.{" "}
            </Text>
          </View>

          <View className="pt-10 flex-row justify-between  gap-4 bottom-0 ">
            <AddToCartButton />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default index;
