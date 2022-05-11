import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShoppingBasketContextProvider } from "context/ShoppingBasketContext";
import { rest, server } from "testServer";
import { Checkout } from "./Checkout";

const TEST_CURR: Record<string, string> = {
  USD: "Dolla",
  GBP: "POUND",
  AUS: "OZZI",
};

describe("Checkout", () => {
  beforeEach(() => {
    server.use(
      rest.get("http://api.currencylayer.com/list*", (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ currencies: TEST_CURR }))
      )
    );

    server.listen();
  });

  it("should display items in basket correctly", async () => {
    renderScreen();

    expect(screen.getByText("Banans")).toBeInTheDocument();
  });

  it("should update basket value when currency is changed", async () => {
    renderScreen();

    clickChangeButton();

    expect(await screen.findByText("USD")).toBeInTheDocument();

    expect(screen.getByTestId("basket-amount")).toHaveTextContent("2000.00 £");

    typeCurrency();

    pressEnter();

    expect(screen.getByTestId("basket-amount")).not.toHaveTextContent(
      "2000.00 £"
    );
  });

  describe("When currency options request fails", () => {
    beforeEach(() => {
      server.use(
        rest.get("http://api.currencylayer.com/list*", (_, res, ctx) =>
          res(ctx.status(500))
        )
      );

      server.listen();
    });

    it("should display error message", async () => {
      renderScreen();

      expect(
        await screen.findByText(
          "An error occurred when fetching currency options."
        )
      ).toBeInTheDocument();
    });
  });
});

const clickChangeButton = () => userEvent.click(screen.getByText("Change"));

const typeCurrency = () =>
  userEvent.type(screen.getByTestId("currency-autocomplete"), "USD");

const pressEnter = () =>
  userEvent.type(screen.getByTestId("currency-autocomplete"), "{enter}");

const renderScreen = () => {
  const mockBasket = {
    basket: [
      {
        quantity: 2,
        item: {
          id: "1",
          name: "Banans",
          price: "1000",
        },
      },
    ],
  };
  render(
    <ShoppingBasketContextProvider initialState={mockBasket}>
      <Checkout />
    </ShoppingBasketContextProvider>
  );
};
