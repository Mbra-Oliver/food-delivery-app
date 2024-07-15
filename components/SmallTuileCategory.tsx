import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SmallTuileCategory = ({ categorie }: { categorie: any }) => {
  return (
    <TouchableOpacity className="rounded-md bg-[#f7f7f7] p-2 items-center justify-center gap-2">
      <View className=" bg-white flex items-center justify-center rounded-full overflow-hidden p-4">
        <Image
          source={{
            uri: `https://cdn-icons-png.flaticon.com/128/4058/4058751.png`,
          }}
          resizeMode="contain"
          className="w-10 h-10 rounded-full"
        />
      </View>

      <Text className="text-center font-bold">{categorie.name}</Text>
    </TouchableOpacity>
  );
};

export default SmallTuileCategory;
