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
import { APP_COLORS } from "@/constants/Colors";
import OrderResume from "@/components/Cart/OrderResume";

const index = () => {
  const { items, clearCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.food.price * item.quantity,
    0
  );

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

      const result = await saveOrder({
        items: ARRAYS,
      });

      if (result.status_code === 201) {
        showFlashMessage(
          "success",
          "Votre commande a été enregistrer avec succès"
        );

        router.replace("/");
        // router.navigate({
        //   pathname: "/pages/orders/status/[status]",
        //   params: { status: "SUCCESS" },
        // });

        clearCart();
      }
    } catch (error: any) {}
  };

  if (items.length === 0) return <Empty />;
  return (
    <SafeAreaView className="flex-1  bg-primary">
      <View className=" px-4 bg-primary h-full w-full relative">
        <View className="flex-row mb-4 gap-2 items-center">
          <Pressable onPress={router.back}>
            <AntDesign name="arrowleft" color={APP_COLORS.main} size={24} />
          </Pressable>
          <Text className="text-2xl text-center font-semibold ">Panier</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="mb-4 gap-2"
        >
          {items.map((food) => (
            <CartItem
              key={food.food.id}
              food={food.food}
              quantity={food.quantity}
            />
          ))}
        </ScrollView>

        <View className="absolute mx-4 my-4 gap-6 bottom-0 w-full ">
          <OrderResume totalPrice={totalPrice} />
          <ComfirmPayment isSubmitting={isSubmitting} onPress={handleOrder} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
