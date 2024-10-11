import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { showFlashMessage } from "@/helpers/alertMessage";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { IFood } from "@/interfaces/IFood";
import { AntDesign } from "@expo/vector-icons";

const AddToCartButton = ({
  existInCart,
  foodData,
}: {
  existInCart: boolean;
  foodData: IFood;
}) => {
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
  let content;

  if (!existInCart) {
    content = (
      <>
        <AntDesign name="shoppingcart" size={24} color="white" />
        <Text className="text-white text-xl " style={{ fontFamily: "Lato" }}>
          Ajouter au panier{" "}
        </Text>
      </>
    );
  }

  if (existInCart) {
    content = (
      <>
        <AntDesign name="closecircleo" size={24} color="white" />
        <Text className="text-white text-xl " style={{ fontFamily: "Lato" }}>
          Déja dans le panier
        </Text>
      </>
    );
  }

  return (
    <Pressable
      className={`${
        !existInCart ? "bg-primary-green" : "bg-gray-300"
      } p-3 flex-row items-center justify-center rounded-lg gap-4`}
      disabled={disabled}
      onPress={addToCart}
    >
      {content}
    </Pressable>
  );
};

export default AddToCartButton;
