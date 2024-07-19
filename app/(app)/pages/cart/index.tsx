import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "@/components/Orders/OrderItem";
import { AntDesign } from "@expo/vector-icons";
import OrderFoodItem from "@/components/Orders/OrderFoodItem";
import FoodOrderQuantity from "@/components/Cart/FoodOrderQuantity";
import CartItem from "@/components/Cart/CartItem";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import ComfirmPayment from "@/components/Cart/ComfirmPayment";
import { router } from "expo-router";
import Empty from "@/components/Cart/Empty";
import { CartContext } from "@/helpers/providers/CartContextProvider";
import { saveOrder } from "@/services/orders.services";
import { showFlashMessage } from "@/helpers/alertMessage";

const index = () => {
  const { items, clearCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Définir le type pour items, en utilisant l'interface CartItem par exemple
  const ARRAYS: { id: number; quantity: number }[] = items.map(
    (cartContext: any) => ({
      id: cartContext.food.id,
      quantity: cartContext.quantity,
    })
  );

  const handleOrder = async () => {
    try {
      setIsSubmitting(true);
      console.log(ARRAYS);
      const result = await saveOrder(ARRAYS);

      console.log(result);
      if (result.status_code === 201) {
        showFlashMessage(
          "success",
          "Votre commande a été enregistrer avec succès"
        );

        router.navigate({
          pathname: "/pages/orders/status/[status]",
          params: { status: "SUCCESS" },
        });

        clearCart();
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  if (items.length === 0) return <Empty />;
  return (
    <SafeAreaView className="flex-1 relative">
      <View className="h-full mt-4">
        <View className="px-4">
          <View className="flex-row mb-4 gap-10 items-center">
            <Pressable onPress={router.back}>
              <AntDesign name="arrowleft" color="black" size={30} />
            </Pressable>
            <Text className="text-2xl uppercase text-center">Votre panier</Text>
          </View>

          <View className="bg-pink border border-gray-100 rounded-md flex justify-center p-4 gap-2 mb-4">
            <Text>Livraison à</Text>
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-xl text-black">
                242 abidjan route 30
              </Text>
              <Pressable>
                <AntDesign name="down" color={"black"} size={25} />
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ elevation: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-4 pb-28 gap-2"
        >
          {items.map((food) => (
            <CartItem
              key={food.food.id}
              food={food.food}
              quantity={food.quantity}
            />
          ))}
        </ScrollView>

        <View className="absolute pt-10 px-4 flex-row mb-12 justify-between  gap-4 bottom-0 ">
          <ComfirmPayment isSubmitting={isSubmitting} onPress={handleOrder} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
