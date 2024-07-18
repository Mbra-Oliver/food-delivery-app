import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "@/components/Orders/OrderItem";
import { AntDesign } from "@expo/vector-icons";
import OrderFoodItem from "@/components/Orders/OrderFoodItem";

const index = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 mb-32 ">
        <View className=" mb-4">
          <AntDesign name="arrowleft" color="black" size={30} />
        </View>

        <Text className="text-2xl mb-4 uppercase">Détails de la commande</Text>
        <ScrollView
          className="bg-white border border-gray-100 rounded-md mb-20 pb-20"
          style={{ elevation: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4 border-b border-gray-200 gap-2">
            <Text className="text-xl">Commande: #4595600</Text>

            <View className="flex-row gap-2 items-center">
              <Text>Date</Text>
              <Text>12 Novembre 2024 18h59</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <Text>Total</Text>
              <Text className="text-primary font-bold">40.000 FCFA</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-primary rounded-md p-2">
                <Text className="text-white">Colis livrée et récupéré</Text>
              </View>
            </View>
          </View>
          {/* Item de la commade */}
          <OrderFoodItem />
          <OrderFoodItem />
          <OrderFoodItem />
          <OrderFoodItem />
          <OrderFoodItem />

          <OrderFoodItem />
          <OrderFoodItem />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;
