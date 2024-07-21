import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const ProfileInlineMenu = ({
  background,
  text,
}: {
  background: string;
  text: string;
}) => {
  const currentClass = `bg-[${background}] p-4 rounded-md`;

  if (!currentClass) {
    return;
  }
  console.log(currentClass);

  return (
    <TouchableOpacity className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-4">
        <View className={`${currentClass}`}>
          <AntDesign size={24} name="user" color={"white"} />
        </View>
        <Text className="text-2xl">{text}</Text>
      </View>

      <AntDesign size={24} color={"black"} name="right" />
    </TouchableOpacity>
  );
};

export default ProfileInlineMenu;
