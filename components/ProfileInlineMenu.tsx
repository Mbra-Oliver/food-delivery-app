import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const ProfileInlineMenu = ({
  background,
  text,
  icon,
}: {
  background: string;
  text: string;
  icon: any;
}) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-4">
        <View className={`bg-gray-200 p-2 rounded-md`}>
          <Feather size={24} name={icon} color={"black"} />
        </View>
        <Text className="text-xl">{text}</Text>
      </View>

      <AntDesign size={24} color={"black"} name="right" />
    </TouchableOpacity>
  );
};

export default ProfileInlineMenu;
