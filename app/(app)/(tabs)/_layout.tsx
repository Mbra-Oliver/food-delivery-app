import { Tabs } from "expo-router";
import React, { useContext } from "react";

import { APP_COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "@/helpers/providers/AppProviders";

export default function TabLayout() {
  const { isLogged } = useContext(AuthContext);
  if (!isLogged) {
    return;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.main,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
