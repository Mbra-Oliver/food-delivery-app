import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { showFlashMessage } from "@/helpers/alertMessage";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { IFood } from "@/interfaces/IFood";

const AddToCartButton = ({ foodData }: { foodData: IFood }) => {
  const { addItemToCart } = useContext(CartContext);

  let foodAmount: string;
  const addToCart = () => {
    try {
      addItemToCart(foodData.id);
      showFlashMessage("warning", "Produit ajouté au panier");
    } catch (e) {
      console.error("Erreur lors de l'ajout au panier :", e);
      showFlashMessage("danger", "Erreur lors de l'ajout au panier");
    }
  };

  if (foodData.price >= 1000) {
    foodAmount = (foodData.price / 1000).toFixed(2) + "k";
  } else {
    foodAmount = foodData.price + "cfa";
  }

  return (
    <Pressable
      onPress={addToCart}
      className="flex-1 bg-[#53565a] p-4 flex-row justify-center rounded-md items-center"
    >
      <Text className="text-white text-xl ">Ajouter au panier </Text>
      <Text className="text-white text-xl font-bold">{foodAmount}</Text>
    </Pressable>
  );
};

export default AddToCartButton;
