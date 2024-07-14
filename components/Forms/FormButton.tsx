import { View, Text, Pressable } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
const FormButton = ({
  label,
  disabled = false,
  onSubmit,
  isSubmitting = false,
}: {
  label: string;
  disabled?: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}) => {
  return (
    <Pressable
      disabled={disabled}
      className={`${
        disabled ? "bg-[#e8e6e6] border border-gray-300" : "bg-[#48cd64]"
      }  p-4 rounded-full flex-row justify-center gap-2 items-center`}
      onPress={onSubmit}
    >
      {isSubmitting && (
        <View className="animate-spin">
          <Fontisto name="spinner" size={24} color="white" />
        </View>
      )}
      <Text
        className={`${disabled ? "" : "text-white"}  font-['Lato']  text-lg`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default FormButton;
