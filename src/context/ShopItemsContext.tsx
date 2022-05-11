import { createContext, ReactNode, useContext } from "react";
import {
  State,
  Status,
  useAsyncCallback,
} from "hooks/useAsyncCallback";
import { fetchShopItems, Item } from "api";

interface ShoppingItemsContextValue {
  state: State<Item[]>;
  execute(): void;
}

const DEFAULT_VALUE = {
  state: {
    error: null,
    loading: false,
    result: null,
    status: "NOT_REQUESTED" as Status,
  },
  execute: () => {},
};

const ShoppingItemsContext = createContext<ShoppingItemsContextValue>(
  DEFAULT_VALUE
);

export const useShoppingItemsContext = () => useContext(ShoppingItemsContext);

interface ShoppingItemsContextProviderProps {
  children: ReactNode;
}

export const ShoppingItemsContextProvider = ({
  children,
}: ShoppingItemsContextProviderProps) => {
  const [state, execute] = useAsyncCallback(fetchShopItems);

  const value = {
    state,
    execute,
  };

  return (
    <ShoppingItemsContext.Provider value={value}>
      {children}
    </ShoppingItemsContext.Provider>
  );
};
