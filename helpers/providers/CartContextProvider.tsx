import { ReactNode, createContext, useReducer } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItemToCart: (id: number) => void;
  updateItemQuantity: (productId: number, amount: number) => void;
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
  | { type: "ADD_ITEM"; payload: number }
  | { type: "UPDATE_ITEM"; payload: { productId: number; amount: number } };

//Initialise le contexte
export const CartContext = createContext<CartContextType>({
  items: [],
  addItemToCart: (id: number) => {},
  updateItemQuantity: (productId: number, amount: number) => {},
});

const cartReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "ADD_ITEM":
      const { payload: id } = action;
      console.log(id);
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      if (existingCartItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex].quantity++;
        return { items: updatedItems };
      } else {
        const newItem: CartItem = {
          id: id,
          name: "Le produit",
          price: 400,
          quantity: 1,
        };
        return { items: [...state.items, newItem] };
      }

      return state;

    case "UPDATE_ITEM":
      const { productId, amount } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      );
      return { items: updatedItems.filter((item) => item.quantity > 0) };

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

  const handleAddItemToCart = (id: number) => {
    cartDispatch({ type: "ADD_ITEM", payload: id });
  };

  const handleUpdateCartItemQuantity = (productId: number, amount: number) => {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  };

  const contextValue: CartContextType = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
