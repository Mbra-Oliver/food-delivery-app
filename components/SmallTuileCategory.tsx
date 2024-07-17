import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SmallTuileCategory = ({ categorie }: { categorie: any }) => {
  const imageUrl = categorie.default_image;

  if (!imageUrl) {
    return;
  }

  if (!imageUrl) {
    return null;
  }

  const imageUri = `${process.env.EXPO_PUBLIC_STORAGE_URL}${imageUrl}`;

  return (
    <TouchableOpacity className="rounded-md bg-[#f7f7f7] p-2 items-center justify-center gap-2 h-36">
      <View className=" bg-white flex items-center justify-between rounded-full overflow-hidden p-4">
        <Image
          source={{ uri: imageUri }}
          resizeMode="contain"
          className="w-10 h-10 rounded-full"
        />
      </View>

      <Text className="text-center">{categorie.name}</Text>
    </TouchableOpacity>
  );
};

export default SmallTuileCategory;
