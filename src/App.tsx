import { Checkout } from "screens/Checkout";
import { ShoppingBasketContextProvider } from "context/ShoppingBasketContext";

import { Route, Switch } from "react-router-dom";
import { Shop } from "screens/Shop";
import { Navbar } from "components/Navbar/Navbar";
import { ShoppingItemsContextProvider } from "context/ShopItemsContext";

import styled, { createGlobalStyle } from "styled-components/macro";

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
`;

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ShoppingBasketContextProvider>
        <ShoppingItemsContextProvider>
          <Navbar />
          <AppContainer>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/" component={Shop} />
            </Switch>
          </AppContainer>
        </ShoppingItemsContextProvider>
      </ShoppingBasketContextProvider>
    </>
  );
}

export default App;
