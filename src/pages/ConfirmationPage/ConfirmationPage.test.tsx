import React from "react";
import { ConfirmationPage } from "./ConfirmationPage";
import { Router } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import paths from "../../router/paths";

it("renders <ConfirmationPage/>", () => {
  const history = createMemoryHistory();
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
    <Router history={history}>
      <UserContext.Provider value={{ items, discardedItems }}>
        <ConfirmationPage />
      </UserContext.Provider>
    </Router>
  );

  const wishlistButton = screen.getByText(/Return to wishlists/);
  fireEvent.click(wishlistButton);
  expect(history.location.pathname).toBe(paths.root);
});
