import { IFood } from "@/interfaces/IFood";
import { ReactNode, createContext, useReducer } from "react";

interface CartItem {
  food: IFood;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItemToCart: (food: IFood) => void;
  updateItemQuantity: (foodId: number, amount: number) => void;
  clearCart: () => void;
}

type StateType = {
  items: Array<any>;
};

// Initial state for the reducer
const initialCartState: { items: CartItem[] } = {
  items: [],
};

// Actions for the reducer
type ActionType =
  | { type: "ADD_ITEM"; payload: { food: IFood } }
  | { type: "UPDATE_ITEM"; payload: { foodId: number; amount: number } }
  | { type: "CLEAR_ITEM" };

//Initialise le contexte
export const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: (food: IFood) => {},
  updateItemQuantity: (foodId: number, amount: number) => {},
  clearCart: () => {},
});

const cartReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_ITEM":
      const { payload: product } = action;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.food.id === product.food.id
      );
      if (existingCartItemIndex !== -1) {
        // const updatedItems = [...state.items];
        // updatedItems[existingCartItemIndex].quantity++;
        // return { items: updatedItems };
      } else {
        const newItem: CartItem = {
          food: product.food,
          quantity: 1,
        };
        return { items: [...state.items, newItem] };
      }

      return state;

    case "UPDATE_ITEM":
      const { foodId, amount } = action.payload;

      const updatedItems = state.items.map((item) =>
        item.food.id === foodId
          ? { ...item, quantity: item.quantity + amount }
          : item
      );
      return { items: updatedItems.filter((item) => item.quantity > 0) };

    case "CLEAR_ITEM":
      return { items: [] };
    default:
      return state;
  }
};

// Provider component
type Props = {
  children: ReactNode;
};

export const CartContextProvider = ({ children }: Props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const handleAddItemToCart = (food: IFood) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        food: food,
      },
    });
  };

  const handleUpdateCartItemQuantity = (foodId: number, amount: number) => {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { foodId, amount },
    });
  };

  const handleClearCart = () => {
    cartDispatch({
      type: "CLEAR_ITEM",
    });
  };

  const contextValue: CartContextType = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
