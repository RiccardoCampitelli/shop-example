import { useEffect } from "react";

import { ShopItem } from "components/ShopItem";
import { useShoppingItemsContext } from "context/ShopItemsContext";

import styled from "styled-components/macro";

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`

export const Shop = () => {
  const { state, execute } = useShoppingItemsContext();

  useEffect(() => {
    if (state.result === null) execute();
  }, [execute, state.result]);

  const isLoading = state.status === "LOADING";
  const isListLoaded = state.status === "SUCCESS";
  const showError = state.status === "ERROR";

  const shopItems = state.result;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {showError && <ErrorMessage>Oh no! Something went wrong 🙃</ErrorMessage>}
      {isListLoaded &&
        shopItems &&
        shopItems.map((item) => <ShopItem item={item} key={item.id} />)}

        
    </div>
  );
};
