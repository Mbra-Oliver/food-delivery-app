import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { APP_COLORS } from "@/constants/Colors";

const LoadingAreaIndicator = () => {
  return (
    <View>
      <ActivityIndicator size="small" color={APP_COLORS.main} />
    </View>
  );
};

export default LoadingAreaIndicator;
