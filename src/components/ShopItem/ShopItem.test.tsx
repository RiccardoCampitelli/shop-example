import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopItem } from "./ShopItem";
import { ShoppingBasketContextProvider } from "context/ShoppingBasketContext";

describe("ShopItem", () => {
  it("should display item name", () => {
    renderScreen();

    expect(screen.getByText("Doritos")).toBeInTheDocument();
  });

  it('should increment when "Add" is clicked', () => {
    renderScreen();

    clickAdd();

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it('should decrement when "Remove" is clicked', () => {
    renderScreen();

    clickAdd();
    clickAdd();

    clickRemove();

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});

const clickAdd = () => {
  userEvent.click(screen.getByText("+"));
};

const clickRemove = () => {
  userEvent.click(screen.getByText("-"));
};

const renderScreen = ({ itemName = "Doritos" } = {}) => {
  render(
    <ShoppingBasketContextProvider>
      <ShopItem item={{ name: itemName, price: "3.00", id: "5" }} />
    </ShoppingBasketContextProvider>
  );
};
