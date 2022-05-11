import { useEffect, useState } from "react";

import { fetchAllCurrencies, convertCurrency } from "api";
import { useShoppingBasketContext } from "context/ShoppingBasketContext";
import { useAsyncCallback } from "hooks/useAsyncCallback";

import styled from "styled-components/macro";
import { AutocompleteInput } from "components/AutocompleteInput/AutocompleteInput";
import { flexColumn } from "components/commonStyles";
import { exctractProperties } from "util/extractPropertiesFromObject";
import { formatNumber } from "util/formatNumber";
import { currencySymbolMap } from "util/currencySymbolMap";

const CheckoutContainer = styled.div`
  ${flexColumn}
`;

const BasketContainer = styled.div`
  width: 20rem;
`;

const Ul = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

const Li = styled.li`
  line-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
`;

const BorderBottomBox = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-left: 1rem;
  background-color: papayawhip;
  border: 1px solid papayawhip;
  border-radius: 0.1rem;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

export const Checkout = () => {
  const { basket } = useShoppingBasketContext();
  const [allCurrenciesState, executeFetchCurrencies] = useAsyncCallback(
    fetchAllCurrencies
  );
  const [convertCurrencyState, executeConvertCurrency] = useAsyncCallback(
    convertCurrency
  );

  useEffect(() => {
    executeFetchCurrencies();
  }, [executeFetchCurrencies]);

  const totalBasketPrice = basket
    .map(({ item, quantity }) => parseFloat(item.price) * quantity)
    .reduce((acc, curr) => curr + acc, 0);

  const [basketValue, setBasketValue] = useState(totalBasketPrice);

  useEffect(() => {
    if (
      convertCurrencyState.status === "SUCCESS" &&
      convertCurrencyState.result !== null
    )
      setBasketValue(convertCurrencyState.result);
  }, [convertCurrencyState]);

  const [currentCurrency, setCurrentCurrency] = useState("GBP");

  const [currencyFilterValue, setCurrencyFilterValue] = useState("");

  const [isSelectingCurrency, setIsSelectingCurrency] = useState(false);

  const allCurrencies = allCurrenciesState?.result?.currencies ?? {};

  const currenciesArray = exctractProperties(allCurrencies).map(
    ([currencyCode, _]) => currencyCode
  );

  const filteredCurrencies = currenciesArray.filter((currencyCode) =>
    currencyCode.toLowerCase().includes(currencyFilterValue.toLowerCase())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const topOfFilteredCurrency = filteredCurrencies[0];
      if (topOfFilteredCurrency) selectCurrency(topOfFilteredCurrency);
    }
  };

  const selectCurrency = (selectedCurrency: string) => {
    setCurrentCurrency(selectedCurrency);
    setCurrencyFilterValue(selectedCurrency);
    setIsSelectingCurrency(false);
    executeConvertCurrency(totalBasketPrice, currentCurrency, selectedCurrency);
  };

  const showAllCurrenciesFetchError = allCurrenciesState.status === "ERROR";

  return (
    <CheckoutContainer>
      <BasketContainer>
        <p>🧺 Basket</p>
        <Ul>
          {basket.map(({ item, quantity }) => (
            <Li key={item.id}>
              <span>{item.name}</span>
              <span>Qty: {quantity} &nbsp;</span>
              <span>
                {currencySymbolMap["GBP"]}
                {formatNumber(quantity * parseFloat(item.price))}
              </span>
            </Li>
          ))}
        </Ul>
        {basket.length === 0 && <div>You have no items in your basket.</div>}
      </BasketContainer>
      <div>
        <p>💰 Total</p>
        <BorderBottomBox data-testid="basket-amount">
          Amount: {formatNumber(basketValue)}{" "}
          {currencySymbolMap[currentCurrency]}
        </BorderBottomBox>
        {showAllCurrenciesFetchError ? (
          <BorderBottomBox>
            <ErrorMessage>
              An error occurred when fetching currency options.
            </ErrorMessage>
          </BorderBottomBox>
        ) : (
          <>
            <BorderBottomBox>
              Selected currency: {currentCurrency}
              {!isSelectingCurrency && (
                <Button onClick={() => setIsSelectingCurrency(true)}>
                  Change
                </Button>
              )}
            </BorderBottomBox>
            {isSelectingCurrency && (
              <AutocompleteInput
                value={currencyFilterValue}
                onChange={(event) => setCurrencyFilterValue(event.target.value)}
                onKeyDown={handleKeyDown}
                options={filteredCurrencies}
                onOptionClick={(value: string) => selectCurrency(value)}
                inputTestId="currency-autocomplete"
              />
            )}
          </>
        )}
      </div>
    </CheckoutContainer>
  );
};
