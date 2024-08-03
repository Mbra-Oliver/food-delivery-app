import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useContext } from "react";
import { IFood } from "@/interfaces/IFood";
import { AntDesign } from "@expo/vector-icons";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { showFlashMessage } from "@/helpers/alertMessage";
import { router } from "expo-router";

const FoodListItem = ({ food }: { food: IFood }) => {
  const { addItemToCart } = useContext(CartContext);
  const addToCart = () => {
    try {
      addItemToCart(food);

      showFlashMessage("warning", "Produit ajouté au panier");
    } catch (e) {
      showFlashMessage("danger", "Erreur lors de l'ajout au panier");
    }
  };

  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${food.default_image}`;

  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center p-2 gap-4 bg-white m-1 rounded-xl border border-gray-100"
      style={{ elevation: 2 }}
      onPress={() =>
        router.navigate({
          pathname: "/pages/foods/[id]",
          params: { id: food.id },
        })
      }
    >
      <View className="relative w-full items-center ">
        <Image
          source={{
            uri: imageUri,
          }}
          resizeMode="cover"
          className=" h-40 rounded-md"
          style={{ aspectRatio: 4 / 4 }}
        />

        <Pressable
          className="absolute right-0 bg-primary p-2 rounded-md"
          onPress={addToCart}
        >
          <AntDesign name="shoppingcart" size={24} color="white" />
        </Pressable>
      </View>

      <Text className="text-xl font-semibold">{food.name}</Text>

      <Text className="text-xl">{food.price} FCFA</Text>
    </TouchableOpacity>
  );
};

export default FoodListItem;
