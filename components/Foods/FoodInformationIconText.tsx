import { View, Text, Image } from "react-native";
import React from "react";

const iconImages: any = {
  foodIcon1: require("@/assets/icons/clock.png"),
  foodIcon2: require("@/assets/icons/fire.png"),
  foodIcon3: require("@/assets/icons/fire.png"),
  // Ajoutez d'autres icônes selon vos besoins
};

const FoodInformationIconText = ({
  imageNumb,
  text,
}: {
  imageNumb: string;
  text: string;
}) => {
  const selectedImage = iconImages[imageNumb];

  return (
    <View className="flex-row items-center gap-1">
      <Image source={selectedImage} className="w-8 h-8" resizeMode="cover" />
      <Text>{text}</Text>
    </View>
  );
};

export default FoodInformationIconText;
