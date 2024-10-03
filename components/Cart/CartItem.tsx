import { View, Image, Text } from "react-native";
import React, { useContext } from "react";
import FoodOrderQuantity from "./FoodOrderQuantity";
import { IFood } from "@/interfaces/IFood";
import { CartContext } from "@/helpers/providers/CartContextProvider";

const CartItem = ({ food, quantity }: { food: IFood; quantity: number }) => {
  const { updateItemQuantity } = useContext(CartContext);
  const manageQuantity = (value: number) => {
    updateItemQuantity(food.id, value);
  };

  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${food.default_image}`;

  return (
    <View className="flex-row items-center justify-between pb-4 border-b border-gray-200">
      <View>
        <Image
          className=" w-20 h-20 border-2  rounded-full"
          source={{
            uri: imageUri,
          }}
          resizeMode="cover"
        />
      </View>
      <View className="justify-center items-center">
        <Text className="font-bold text-center text-xl">{food.name}</Text>
        <Text className="text-center mb-3">({food.restaurant.name})</Text>
        <FoodOrderQuantity
          onPressQuantity={manageQuantity}
          quantity={quantity}
        />
      </View>
      <Text className="text-bold">{food.price * quantity} FCFA</Text>
    </View>
  );
};

export default CartItem;
