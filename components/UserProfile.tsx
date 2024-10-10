import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/helpers/providers/AppProviders";
import LoadingAreaIndicator from "./UI/LoadingAreaIndicator";
import * as SecureStore from "expo-secure-store";
import { IUser } from "@/interfaces/IUser";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { router } from "expo-router";

const UserProfile = () => {
  const [user, setUser] = useState<IUser>();
  const { items } = useContext(CartContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData !== null) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return null; // Peut-être afficher un indicateur de chargement ici
  }

  if (!user) {
    return <LoadingAreaIndicator />;
  }

  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center gap-4 ">
        <Text className="text-xl" style={{ fontFamily: "Jonesy" }}>
          Bonjour Oliver Mbra
        </Text>
      </View>

      <View className="flex-row gap-2 items-center">
        <TouchableOpacity
          onPress={() => router.navigate("/pages/cart")}
          className=" p-2 "
        >
          <Feather name="shopping-cart" size={24} color="gray" />
          {items.length >= 1 && (
            <View className="absolute bottom-0 bg-primary p-1 rounded-full w-3 h-3 -top-1 justify-center items-center" />
          )}
        </TouchableOpacity>

        <TouchableOpacity className="border border-[#48cd64] bg-[#48cd64] rounded-md p-2">
          <Feather name="bell" size={24} color="white" className="font-bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
