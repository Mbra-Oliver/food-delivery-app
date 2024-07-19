import { View, Pressable, Text } from "react-native";
import React from "react";
import { AntDesign, Fontisto } from "@expo/vector-icons";

const ComfirmPayment = ({
  isSubmitting,
  onPress,
}: {
  isSubmitting: boolean;
  onPress: any;
}) => {
  // Contenu conditionnel basé sur l'état de soumission
  const content = isSubmitting ? (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
      <View className="animate-spin">
        <Fontisto name="spinner" size={24} color="white" />
      </View>
      <Text style={{ color: "white" }}>Enregistrement en cours...</Text>
    </View>
  ) : (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <AntDesign
        name="shoppingcart"
        color="white"
        size={24}
        style={{ marginRight: 8 }}
      />
      <Text style={{ color: "white", fontSize: 20 }}>Commander maintenant</Text>
    </View>
  );

  return (
    <Pressable
      disabled={isSubmitting}
      onPress={onPress}
      className={`flex-1  bg-primary p-4 flex-row justify-center rounded-md gap-4 items-center`}
    >
      {content}
    </Pressable>
  );
};

export default ComfirmPayment;
