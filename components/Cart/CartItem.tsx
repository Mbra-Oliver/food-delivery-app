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
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View
          className="bg-white w-[100] h-[100] rounded-3xl items-center justify-center border border-gray-100"
          style={{ elevation: 1 }}
        >
          <Image
            className=" w-20 h-20 border-2 aspect-square rounded-full"
            source={{
              uri: imageUri,
            }}
            resizeMode="cover"
          />
        </View>
        <View className="justify-center items-start gap-2 ">
          <Text className="font-bold text-center text-xl">{food.name}</Text>
          <Text className="text-center text-xs">({food.restaurant.name})</Text>
          <Text className="text-bold">{food.price * quantity} FCFA</Text>
        </View>
      </View>
      <FoodOrderQuantity onPressQuantity={manageQuantity} quantity={quantity} />
    </View>
  );
};

export default CartItem;
