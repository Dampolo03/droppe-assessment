import React from "react";
import { WishlistDetails } from "./WishlistDetails";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("displays <WishlistDetails/>", () => {
  const setItems = jest.fn();
  var items: any, discardedItems: any;
  items = discardedItems = [
    {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:02.000Z",
      products: [
        {
          productId: 1,
          quantity: 1,
          amount: 100,
          images: "test-image1.png",
        },
      ],
      name: "test name",
      total_items: 1,
      total_amount: 100,
    },
  ];

  it("displays product and product price", () => {
    const ProductCard = render(
      <BrowserRouter>
        <UserContext.Provider value={{ items, discardedItems, setItems }}>
          <WishlistDetails index={0} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const productCard: any =
      ProductCard.container.querySelector(".product-card");
    expect(productCard.children[1]).toHaveTextContent(
      "Product 1Price: $100Favourite"
    );

    const inputItems = screen.getByPlaceholderText("input count");
    fireEvent.change(inputItems, { target: { value: "2" } });

    waitFor(() =>
      expect(productCard.children[1]).toHaveTextContent(
        "Product 1Price: $200Favourite"
      )
    );
  });

  it("discards product", () => {
    const ProductCard = render(
      <BrowserRouter>
        <UserContext.Provider value={{ items, discardedItems, setItems }}>
          <WishlistDetails index={0} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const productCard: any =
      ProductCard.container.querySelector(".product-card");

    const discardButton = screen.getByText("Discard");
    fireEvent.click(discardButton);
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);
    waitFor(() => expect(productCard.children[1]).toHaveTextContent(""));
  });
});

it("displays empty item", () => {
  const setItems = jest.fn();
  var items: any, discardedItems: any;
  items = discardedItems = [
    {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:02.000Z",
      products: [],
      name: "test name",
      total_items: 1,
      total_amount: 100,
    },
  ];

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, discardedItems, setItems }}>
        <WishlistDetails index={0} />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const emptyText = screen.getByText("No item to be displayed");
  expect(emptyText).toBeInTheDocument();
});
