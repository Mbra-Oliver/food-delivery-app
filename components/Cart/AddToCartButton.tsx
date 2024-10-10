import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { showFlashMessage } from "@/helpers/alertMessage";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { IFood } from "@/interfaces/IFood";
import { AntDesign } from "@expo/vector-icons";

const AddToCartButton = ({ foodData }: { foodData: IFood }) => {
  const { addItemToCart } = useContext(CartContext);
  const [disabled, setDisabled] = useState<boolean>(false);

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

  return (
    <Pressable
      className="bg-primary-green p-3 flex-row items-center justify-center rounded-lg gap-4 "
      disabled={disabled}
      onPress={addToCart}
    >
      <AntDesign name="shoppingcart" size={24} color="white" />
      <Text className="text-white text-xl " style={{ fontFamily: "Jonesy" }}>
        Ajouter au panier{" "}
      </Text>
    </Pressable>
  );
};

export default AddToCartButton;
