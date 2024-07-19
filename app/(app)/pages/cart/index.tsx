import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "@/components/Orders/OrderItem";
import { AntDesign } from "@expo/vector-icons";
import OrderFoodItem from "@/components/Orders/OrderFoodItem";
import FoodOrderQuantity from "@/components/Cart/FoodOrderQuantity";
import CartItem from "@/components/Cart/CartItem";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import ComfirmPayment from "@/components/Cart/ComfirmPayment";
const DATAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const index = () => {
  return (
    <SafeAreaView className="flex-1 relative">
      <View className="h-full mt-4">
        <View className="px-4">
          <View className="flex-row mb-4 gap-10 items-center">
            <AntDesign name="arrowleft" color="black" size={30} />
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
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </ScrollView>

        <View className="absolute pt-10 px-4 flex-row mb-12 justify-between  gap-4 bottom-0 ">
          <ComfirmPayment />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
