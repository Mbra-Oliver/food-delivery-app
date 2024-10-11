import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";

const FoodPlateauOrder = () => {
  const foods_composition = [
    {
      id: "1",
      name: "Salade César",
      price: "5000 FCFA",
      image:
        "https://www.alimentarium.org/sites/default/files/media/image/2017-04/EMAG_balanced_meal_shutterstock_54369673_TOP_0_0.jpg",
    },
    {
      id: "2",
      name: "Poulet rôti",
      price: "7500 FCFA",
      image:
        "https://images.radio-canada.ca/v1/alimentation/recette/4x3/poulet-barbecue-maison.jpg",
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      price: "6000 FCFA",
      image:
        "https://www.nal.usda.gov/sites/default/files/styles/card/public/media/image/vegetables_raw_bright_2.jpg?h=53f45f9d&itok=OLZDMAcX",
    },
  ];

  const renderFoodItem = ({ item }: { item: any }) => (
    <View
      className="bg-white rounded-3xl overflow-hidden shadow-md mr-4 flex-row"
      style={{ width: 300, height: 120 }}
    >
      <View className="flex-1 p-4 justify-center">
        <Text
          className="text-lg mb-2"
          style={{ fontFamily: "Lato" }}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text className="text-gray-600" style={{ fontFamily: "Lato" }}>
          {item.price}
        </Text>
      </View>
      <View className="w-1/2 justify-center items-center bg-gray-100 rounded-r-3xl">
        <Image
          source={{ uri: item.image }}
          style={{ width: "90%", height: "90%" }}
          resizeMode="cover"
          className="rounded-2xl"
        />
      </View>
    </View>
  );

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl " style={{ fontFamily: "Lato" }}>
          Avez vous testez nos composition ?
        </Text>
      </View>
      <View className="bg-gray-200 rounded-3xl p-4" style={{ height: 180 }}>
        <FlatList
          data={foods_composition}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderFoodItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </View>
  );
};

export default FoodPlateauOrder;
