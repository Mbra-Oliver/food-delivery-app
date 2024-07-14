import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router"; // Ensure this import is correct based on your router library

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
  | { type: "DISCONNECT_USER" };

type StateType = {
  isLogged: boolean;
  isLoadingUserData: boolean;
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
      SecureStore.setItem("FOOD_USER_TOKEN", action.payload.token);
      SecureStore.setItem("FOOD_USER", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLogged: true,
      };

    case "DISCONNECT_USER":
      return {
        ...state,
        isLogged: false,
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
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      try {
        const token = await SecureStore.getItemAsync("FOOD_USER_TOKEN");
        const user = await SecureStore.getItemAsync("FOOD_USER");

        if (token) {
          authDispatch({
            type: "LOG_USER",
            payload: {
              token,
              user,
            },
          });
        } else {
          setIsLoading(true);
          handleLogout();
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  const handleLogout = async () => {
    console.log(isLoading);
    try {
      await SecureStore.deleteItemAsync("FOOD_USER_TOKEN");
      authDispatch({ type: "DISCONNECT_USER" });

      router.replace("/auth/login");
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  const checkAuthStatus = () => {
    authDispatch({ type: "CHECK_AUTH_STATUS" });
  };

  const handleLogin = (token: string, user: any) => {
    authDispatch({
      type: "LOG_USER",
      payload: {
        token,
        user,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Retrieving account information...</Text>
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
