import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const index = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Commande enregistrer avec succès</Text>
      <Link href={"/"} className="flex-row items-center gap-4 mt-4">
        <Feather name="map-pin" size={16} color="black" />
        <Text className="text-primary text-xl">Faire le suivi</Text>
      </Link>
    </View>
  );
};

export default index;
