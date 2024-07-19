import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import OrderItem from "@/components/Orders/OrderItem";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { getAllOrders } from "@/services/orders.services";

const page = () => {
  const [orders, setOrders] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrders();

        if (response.status_code === 200) {
          const items = response.data.items;

          setOrders(items);
        } else {
          throw new Error(
            `Failed to fetch latest food: ${response.status_code}`
          );
        }
      } catch (error) {
        console.error("Error fetching latest food:", error);
        // Optionally, you can set an error state or handle it in another way
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

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

          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default page;
