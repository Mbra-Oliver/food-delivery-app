import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import FlashMessage from "react-native-flash-message";
import {
  AuthContext,
  UserAuthProvider,
} from "@/helpers/providers/AppProviders";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartContextProvider } from "@/helpers/providers/CartContextProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLogged } = useContext(AuthContext);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Lato: require("../assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserAuthProvider>
      <CartContextProvider>
        <SafeAreaProvider>
          <Slot />
          <FlashMessage position="bottom" />
        </SafeAreaProvider>
      </CartContextProvider>
    </UserAuthProvider>
  );
}
