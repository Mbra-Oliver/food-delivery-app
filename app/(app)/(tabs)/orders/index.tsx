import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import OrderItem from "@/components/Orders/OrderItem";

const page = () => {
  const onRefresh = () => {
    console.log("rafraichir la liste");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 mb-4">
        <Text className="text-2xl mb-4 uppercase">Mes commandes</Text>

        <ScrollView
          className="bg-white border border-gray-100 rounded-md mb-20"
          style={{ elevation: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        >
          {/* Order Item */}

          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />

          <OrderItem />
          <OrderItem />
          <OrderItem />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default page;
