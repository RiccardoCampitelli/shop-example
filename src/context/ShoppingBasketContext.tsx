import { createContext, ReactNode, useContext, useReducer } from "react";
import { Item } from "api";

interface BasketItem<T> {
  quantity: number;
  item: T;
}

interface ShoppingBasketContextValue<T> {
  addToBasket(item: Item): void;
  removeFromBasket(item: Item): void;

  basket: BasketItem<T>[];
}

const DEFAULT_VALUE: ShoppingBasketContextValue<never> = {
  addToBasket: () => {},
  removeFromBasket: () => {},
  basket: [],
};

const ShoppingBasketContext = createContext<ShoppingBasketContextValue<Item>>(
  DEFAULT_VALUE
);

export const useShoppingBasketContext = () => useContext(ShoppingBasketContext);

interface ShoppingBasketContextProviderProps {
  children: ReactNode;
  initialState?: State
}

type Action =
  | { type: "ADD"; payload: Item }
  | { type: "REMOVE"; payload: Item };

interface State {
  basket: BasketItem<Item>[];
}

const DEFAULT_STATE: State = {
  basket: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD": {
      const index = state.basket.findIndex(
        (currentItem) => currentItem.item.id === action.payload.id
      );

      const newValue = [...state.basket];

      if (index === -1)
        return { basket: [...newValue, { quantity: 1, item: action.payload }] };

      const newItem = { ...newValue[index] };

      newItem.quantity = newItem.quantity + 1;

      newValue[index] = newItem;

      return { basket: newValue };
    }
    case "REMOVE": {
      const index = state.basket.findIndex(
        (currentItem) => currentItem.item.id === action.payload.id
      );

      if (index === -1) return state;

      if (state.basket[index].quantity === 1)
        return {
          basket: state.basket.filter(
            (thing) => thing.item.id !== action.payload.id
          ),
        };

      const newValue = [...state.basket];

      const newItem = { ...newValue[index] };

      newItem.quantity = newItem.quantity - 1;

      newValue[index] = newItem;

      return { basket: newValue };
    }
  }
};

export const ShoppingBasketContextProvider = ({
  children,
  initialState = DEFAULT_STATE
}: ShoppingBasketContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToBasket = (item: Item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const removeFromBasket = (item: Item) => {
    dispatch({ type: "REMOVE", payload: item });
  };

  const value: ShoppingBasketContextValue<Item> = {
    addToBasket,
    removeFromBasket,
    basket: state.basket,
  };

  return (
    <ShoppingBasketContext.Provider value={value}>
      {children}
    </ShoppingBasketContext.Provider>
  );
};
