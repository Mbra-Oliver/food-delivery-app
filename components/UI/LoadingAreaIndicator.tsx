import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { APP_COLORS } from "@/constants/Colors";

const LoadingAreaIndicator = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={APP_COLORS.main} />
    </View>
  );
};

export default LoadingAreaIndicator;
