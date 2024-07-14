import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SmallTuileCategory = () => {
  return (
    <TouchableOpacity className="rounded-md bg-[#f3f2f2] p-4 items-center justify-center gap-2">
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmw9P3crYJSEBIJEcZnXEemWDWKulvXv7rw&s",
        }}
        resizeMode="cover"
        style={{
          aspectRatio: 4 / 3,
        }}
        className="w-12 h-12 rounded-md"
      />

      <Text>Pizza</Text>
    </TouchableOpacity>
  );
};

export default SmallTuileCategory;
