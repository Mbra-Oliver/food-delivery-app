import { View, Text, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const TextInputIcon = ({
  label,
  iconName,
  secure,
  placeholder,
  onChange,
  onBlur,
  value,
  name,
}: {
  label: string;
  iconName: any;
  secure?: boolean;
  placeholder: string;
  onChange: any;
  onBlur: any;
  value: string;
  name: string;
}) => {
  return (
    <>
      <Text className="text-xl font-['Lato']">{label}</Text>
      <View className="flex-row border border-gray-200 p-4 rounded-full bg-white gap-3 items-center">
        <AntDesign name={iconName} size={24} color={"gray"} />
        <TextInput
          className="flex-1 text-xl font-['Lato']"
          secureTextEntry={secure}
          placeholder={placeholder}
          onChangeText={onChange(name)}
          onBlur={onBlur(name)}
          value={value}
        />
      </View>
    </>
  );
};

export default TextInputIcon;
