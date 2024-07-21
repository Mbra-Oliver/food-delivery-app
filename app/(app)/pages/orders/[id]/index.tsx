import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderItem from "@/components/Orders/OrderItem";
import { AntDesign } from "@expo/vector-icons";
import OrderFoodItem from "@/components/Orders/OrderFoodItem";
import { router, useLocalSearchParams } from "expo-router";
import LoadingAreaIndicator from "@/components/UI/LoadingAreaIndicator";
import { changeOrderStatus, getOneOrders } from "@/services/orders.services";
import { IOrder } from "@/interfaces/IOrder";
import { formateDateApi } from "@/constants/formatter";
import { showFlashMessage } from "@/helpers/alertMessage";
import FormButton from "@/components/Forms/FormButton";

const index = () => {
  const { id } = useLocalSearchParams();

  const [order, setOrder] = useState<IOrder>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [shouldUpdate, setShouldUpdate] = useState(false); //
  if (!id) return;
  useEffect(() => {
    const fetchFood = () => {
      setLoading(true);
      getOneOrders(+id).then((response) => {
        if (response.status_code === 200) {
          setOrder(response.data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    };

    fetchFood();
  }, [shouldUpdate]);

  if (loading) {
    return <LoadingAreaIndicator />;
  }

  if (!order) {
    return;
  }

  const totalPrice = order.foods.reduce((acc, item) => {
    const value = acc + item.price * item.pivot.quantity;
    return value;
  }, 0);

  const handleChangeStatus = async () => {
    try {
      setIsSubmitting(true);

      const result = await changeOrderStatus(
        {
          status: "CANCELED",
        },
        +id
      );

      if (result.status_code === 200) {
        showFlashMessage("danger", "Votre commande a été annulée");
        setShouldUpdate(true); // Déclencher le rerendu de la composante
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la commande :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 relative ">
      <View className="relative h-full">
        <View className="px-4  ">
          <Pressable onPress={() => router.back()} className=" mb-4">
            <AntDesign name="arrowleft" color="black" size={30} />
          </Pressable>

          <Text className="text-2xl mb-4 uppercase">
            Détails de la commande
          </Text>
          <ScrollView
            className="bg-white border border-gray-100 rounded-md mb-20 pb-20"
            style={{ elevation: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="p-4 border-b border-gray-200 gap-2">
              <Text className="text-xl">Commande: #{order.id}</Text>

              <View className="flex-row gap-2 items-center">
                <Text>Date</Text>
                <Text>{formateDateApi(order.created_at.toString())}</Text>
              </View>

              <View className="flex-row gap-2 items-center">
                <Text>Total</Text>
                <Text className="text-xl font-bold">{totalPrice} FCFA</Text>
              </View>

              <View className="flex-row gap-2 items-center">
                {order.status === "NEW" && (
                  <View className="bg-primary rounded-md p-2">
                    <Text className="text-white">Colis livrée et récupéré</Text>
                  </View>
                )}

                {order.status === "PENDING" && (
                  <View className="bg-orange-300 rounded-md p-2">
                    <Text className="text-white">
                      En attente de récupération
                    </Text>
                  </View>
                )}

                {order.status === "CANCELED" && (
                  <View className="bg-red-900 rounded-md p-2">
                    <Text className="text-white">Commande annulée</Text>
                  </View>
                )}
              </View>
            </View>
            {/* Item de la commade */}
            {order.foods.map((food) => (
              <OrderFoodItem key={food.id} fooData={food} />
            ))}
          </ScrollView>
        </View>
        <View className="absolute bottom-0 px-4 py-4 w-full">
          {order.status !== "CANCELED" && (
            <FormButton
              backgroundColor="bg-red-900"
              isSubmitting={isSubmitting}
              label="Annuler la commande"
              onSubmit={handleChangeStatus}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
