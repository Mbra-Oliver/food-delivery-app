import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";

const index = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Feather name="map-pin" size={40} color="#48cd64" />

      <Text className="text-2xl">Commande enregistrer avec succès</Text>
      <Link href={"/"} className="mt-4">
        <Text className="text-primary text-xl">Faire le suivi</Text>
      </Link>
    </View>
  );
};

export default index;
