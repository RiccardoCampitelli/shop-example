// const CONVERT_CURRENCY_API_URL = "http://api.currencylayer.com/convert";

const mockConvert = (amount: number) => {
  const rnd = Math.random() * 0.2;

  return amount * (1 - rnd);
};

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// This endpoint is now on "http://api.currencylayer.com/convert"
// And it required a basic subscription to use.
export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
) => {

  // This is how I would have implemented it
  // const response = await fetch(
  //   `${CONVERT_CURRENCY_API_URL}?access_key=${process.env.REACT_APP_CURRENCY_API_KEY}&from=${from}&to=${to}&amount=${amount}`
  // );

  // const json = await response.json();

  // return json.amount;

  await timeout(100);

  return mockConvert(amount);
};
