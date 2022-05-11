import { render, waitFor, screen } from "@testing-library/react";

import { Shop } from "./Shop";
import { server, rest } from "../../testServer";
import { ShoppingItemsContextProvider } from "context/ShopItemsContext";

const testItems = {
  items: [
    {
      id: "1",
      name: "Potatoes",
      price: "95p",
    },
  ],
};


describe("Shop", () => {
  it("should start in loading state", () => {
    renderScreen();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  describe("given a successful response", () => {
    beforeEach(() => {
      server.use(
        rest.get("http://localhost/__fixtures__/items.json", (req, res, ctx) =>
          res(ctx.status(200), ctx.json(testItems))
        )
      );

      server.listen();
    });

    it("should display shop items on successful fetch", async () => {
      renderScreen();

      await waitFor(() => {});

      expect(await screen.findByText(/Potatoes/i)).toBeInTheDocument();
    });
  });

  describe("given a failed response", () => {
    beforeEach(() => {
      server.use(
        rest.get("http://localhost/__fixtures__/items.json", (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      server.listen();
    });

    it("should display error message", async () => {
      renderScreen();

      await waitFor(() => screen.getByText("Oh no! Something went wrong 🙃"));
    });
  });
});

const renderScreen = () => {
  render(
    <ShoppingItemsContextProvider>
      <Shop />
    </ShoppingItemsContextProvider>
  );
};
