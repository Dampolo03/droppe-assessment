import React from "react";
import { HomePage } from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { render, screen } from "@testing-library/react";

it("renders <HomePage/>", () => {
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

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, discardedItems }}>
        <HomePage />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const wishlist = screen.getByText("Wishlists");
  expect(wishlist).toBeInTheDocument();
});
