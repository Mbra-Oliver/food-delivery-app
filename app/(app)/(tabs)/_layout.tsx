import { Tabs } from "expo-router";
import React, { useContext } from "react";

import { APP_COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AuthContext } from "@/helpers/providers/AppProviders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
      initialRouteName="foods/2/index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="home-filled"
              size={24}
              color={focused ? color : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Découvrir",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="fastfood"
              size={24}
              color={focused ? color : "grey"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders/index"
        options={{
          title: "Commandes",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="list-alt"
              size={24}
              color={focused ? color : "grey"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="manage-accounts"
              size={24}
              color={focused ? color : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
