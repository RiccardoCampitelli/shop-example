interface CurrenciesResponse {
  currencies: Record<string, string>;
}

const CURRENCY_API_ENDPOINT = "http://api.currencylayer.com";

// const TEST_CURR: Record<string, string> = {
//   "USD": "Dolla",
//   "GBP": "POUND",
//   "AUS": "OZZI"
// }

export const fetchAllCurrencies = async (): Promise<CurrenciesResponse> => {
  const response = await fetch(
    `${CURRENCY_API_ENDPOINT}/list?access_key=${process.env.REACT_APP_CURRENCY_API_KEY}`
  );

  const json = await response.json();

  const currencies = json.currencies;

  return { currencies };
};
