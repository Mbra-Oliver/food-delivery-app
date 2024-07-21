import { View, Image, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { IFood } from "@/interfaces/IFood";

const OrderFoodItem = ({ fooData }: { fooData: IFood }) => {
  return (
    <View className="border border-b border-gray-200 p-4 gap-1">
      <View className="flex-row items-center justify-between">
        <View className="gap-1 px-2">
          <Text className="font-bold text-xl">{fooData.name}</Text>
          <Text>Qte: {fooData.pivot.quantity}</Text>

          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-xl">Prix:</Text>
            <Text className="font-bold">{fooData.price} FCFA</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Text className="font-bold text-xl">Total:</Text>
            <Text className="font-bold text-xl">
              {fooData.price * fooData.pivot.quantity} FCFA
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/2276/2276931.png?ga=GA1.1.255990895.1717282553&semt=ais_hybrid",
            }}
            resizeMode="contain"
            className="w-20 h-20"
            style={{ aspectRatio: 4 / 3 }}
          />
        </View>
      </View>

      {/* <View className="flex-row items-center justify-between px-2">
        <Text>
          {fooData?.restaurant?.name} ({fooData?.restaurant?.main_phone}){" "}
        </Text>

        <View className="flex-row items-center">
          <AntDesign name="star" color={"orange"} size={16} />
          <AntDesign name="star" color={"gray"} size={16} />
          <AntDesign name="star" color={"gray"} size={16} />
          <AntDesign name="star" color={"gray"} size={16} />
          <AntDesign name="star" color={"gray"} size={16} />
        </View>
      </View> */}
    </View>
  );
};

export default OrderFoodItem;
