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
import ProfileInlineMenu from "@/components/ProfileInlineMenu";

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
              <AntDesign name="camera" size={24} color={"black"} />
            </Pressable>
          </View>
        </View>

        <View className="justify-center items-center">
          <Image
            className=" w-[150] h-[150] border-2 border-[#2a2d32] rounded-full"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGviSJTJRZsM9J7oYSGhUVZg12njVaUzCMLQ&s",
            }}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        className="bg-white rounded-tl-3xl rouded-tr-lg rounded-tr-3xl p-4 gap-4 justify-around"
        style={{ flex: 2 }}
      >
        <ProfileInlineMenu background="#e7d4df" text="Editer mon profil" />
        <ProfileInlineMenu background="#d0d2ee" text="Mes favoris" />
        <ProfileInlineMenu background="#efcfbf" text="Paramètres" />

        <View className="border border-gray-100" />

        <ProfileInlineMenu background="#cdcdcd" text="Inviter un ami" />
        <ProfileInlineMenu background="#cdcdcd" text="Aides" />
      </View>
    </View>
  );
};

export default index;
