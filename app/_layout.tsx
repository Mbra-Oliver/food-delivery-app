import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import FlashMessage from "react-native-flash-message";
import {
  AuthContext,
  UserAuthProvider,
} from "@/helpers/providers/AppProviders";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartContextProvider } from "@/helpers/providers/CartContextProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLogged } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Lato: require("@/assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
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
