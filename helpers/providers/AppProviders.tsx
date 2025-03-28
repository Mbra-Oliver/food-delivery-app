import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ActivityIndicator, Text, View, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

// Define types
type AuthContextType = {
  isLogged: boolean;
  isLoadingUserData: boolean;
  checkAuthStatus: () => void;
  handleLogin: (token: string, user: any) => void;
  handleLogout: () => void;
};

type ActionType =
  | { type: "CHECK_AUTH_STATUS" }
  | { type: "LOG_USER"; payload: { token: string; user: any } }
  | { type: "DISCONNECT_USER" }
  | { type: "SET_ERROR"; payload: string | null };

type StateType = {
  isLogged: boolean;
  isLoadingUserData: boolean;
  error: string | null;
};

// Initial context
export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  isLoadingUserData: false,
  checkAuthStatus: () => {},
  handleLogin: (token: string, user: any) => {},
  handleLogout: () => {},
});

// Reducer function
const userAuth = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "CHECK_AUTH_STATUS":
      return { ...state };
    case "LOG_USER":
      return {
        ...state,
        isLogged: true,
        error: null,
      };
    case "DISCONNECT_USER":
      return {
        ...state,
        isLogged: false,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
type Props = {
  children: ReactNode;
};

export const UserAuthProvider = ({ children }: Props) => {
  const [authState, authDispatch] = useReducer(userAuth, {
    isLogged: false,
    isLoadingUserData: true,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async (retryCount = 0) => {
    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync("FOOD_USER_TOKEN");
      const user = await SecureStore.getItemAsync("user");

      if (token && user) {
        const parsedUser = JSON.parse(user);
        authDispatch({
          type: "LOG_USER",
          payload: {
            token,
            user: JSON.stringify(parsedUser),
          },
        });
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      if (
        error instanceof Error &&
        error.message.includes("Could not decrypt")
      ) {
        await SecureStore.deleteItemAsync("FOOD_USER_TOKEN");
        await SecureStore.deleteItemAsync("user");
        console.log("Deleted problematic stored items");

        if (retryCount < 1) {
          console.log("Retrying token retrieval...");
          return checkToken(retryCount + 1);
        } else {
          authDispatch({
            type: "SET_ERROR",
            payload:
              "There was an issue with your stored credentials. Please log in again.",
          });
          handleLogout();
        }
      } else {
        authDispatch({
          type: "SET_ERROR",
          payload: "An unexpected error occurred. Please try again later.",
        });
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("FOOD_USER_TOKEN");
      await SecureStore.deleteItemAsync("user");
      authDispatch({ type: "DISCONNECT_USER" });
      router.replace("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
      authDispatch({
        type: "SET_ERROR",
        payload: "An error occurred during logout. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStatus = () => {
    authDispatch({ type: "CHECK_AUTH_STATUS" });
  };

  const handleLogin = async (token: string, user: any) => {
    try {
      await SecureStore.setItemAsync("FOOD_USER_TOKEN", token);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      authDispatch({
        type: "LOG_USER",
        payload: {
          token,
          user,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      authDispatch({
        type: "SET_ERROR",
        payload: "An error occurred during login. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (authState.error) {
      Alert.alert("Authentication Error", authState.error, [
        {
          text: "OK",
          onPress: () => authDispatch({ type: "SET_ERROR", payload: null }),
        },
      ]);
    }
  }, [authState.error]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Récupération des informations du compte...</Text>
      </View>
    );
  }

  const ctxValue: AuthContextType = {
    isLogged: authState.isLogged,
    isLoadingUserData: isLoading,
    handleLogout,
    checkAuthStatus,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};
