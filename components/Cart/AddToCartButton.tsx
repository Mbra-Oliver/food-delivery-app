import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { showFlashMessage } from "@/helpers/alertMessage";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { IFood } from "@/interfaces/IFood";

const AddToCartButton = ({ foodData }: { foodData: IFood }) => {
  const { addItemToCart } = useContext(CartContext);
  const [disabled, setDisabled] = useState<boolean>(false);

  let foodAmount: string;
  const addToCart = () => {
    setDisabled(true);

    try {
      addItemToCart(foodData);

      showFlashMessage("warning", "Produit ajouté au panier");
      setDisabled(false);
    } catch (e) {
      showFlashMessage("danger", "Erreur lors de l'ajout au panier");
      setDisabled(false);
    }
  };

  if (foodData.price >= 1000) {
    foodAmount = (foodData.price / 1000).toFixed(2) + "k";
  } else {
    foodAmount = foodData.price + "cfa";
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={addToCart}
      className="flex-1 bg-primary-green p-4 flex-row justify-center rounded-md items-center"
    >
      <Text className="text-white text-xl ">Ajouter au panier </Text>
      <Text className="text-white text-xl font-bold">{foodAmount}</Text>
    </Pressable>
  );
};

export default AddToCartButton;
