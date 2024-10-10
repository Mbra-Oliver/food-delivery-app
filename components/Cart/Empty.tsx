import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import EmptyImage from "@/assets/svg/undraw_empty_cart_co35.svg";
import FormButton from "../Forms/FormButton";
const Empty = ({
  title = "Votre panier est vide",
  message = "Retourner sur la liste",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    // <View className="flex-1 bg-white  p-4 relative">
    //   <View className="flex items-start absolute p-4 mt-8 ">
    //     <Pressable onPress={router.back} className="bg-primary p-3 rounded-md">
    //       <AntDesign name="arrowleft" color="white" size={24} />
    //     </Pressable>
    //   </View>

    //   <View className="justify-center h-full items-center gap-2">
    //     <Feather name="shopping-bag" size={80} color="black" />
    //     <Text className="text-4xl ">{title} !</Text>

    //     <Text className="text-center text-lg" numberOfLines={4}>
    //       {message}
    //     </Text>
    //     <Link href={"/"} className="flex">
    //       <Text className="text-primary text-center" numberOfLines={4}>
    //         Retourner sur la liste
    //       </Text>
    //     </Link>
    //   </View>
    // </View>

    <View className="bg-primary flex-1 justify-center items-center gap-8">
      <View className="items-center justify-center gap-4">
        <View className="h-[200] w-[200] bg-neutral-200 aspect-square rounded-full items-center justify-center">
          <EmptyImage width={100} height={80} />
        </View>

        <Text className="font-bold text-2xl text-center">{title}</Text>

        <Text className="text-neutral-500 text-center">{message}</Text>
      </View>

      <View>
        <FormButton
          onSubmit={router.back}
          label="Retourner a l'accueil"
          isSubmitting={false}
        />
      </View>
    </View>
  );
};

export default Empty;
