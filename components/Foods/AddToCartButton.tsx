import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { showFlashMessage } from "@/helpers/alertMessage";
import { CartContext } from "@/helpers/providers/CartContextProvider";

const AddToCartButton = () => {
  const { addItemToCart } = useContext(CartContext);

  const addToCart = () => {
    try {
      addItemToCart(123);
      showFlashMessage("warning", "Produit ajouté au panier");
    } catch (e) {
      console.error("Erreur lors de l'ajout au panier :", e);
      showFlashMessage("danger", "Erreur lors de l'ajout au panier");
    }
  };

  return (
    <Pressable
      onPress={addToCart}
      className="flex-1 bg-[#53565a] p-4 flex-row justify-center rounded-md items-center"
    >
      <Text className="text-white text-xl ">Ajouter au panier </Text>
      <Text className="text-white text-xl font-bold">35k</Text>
    </Pressable>
  );
};

export default AddToCartButton;
