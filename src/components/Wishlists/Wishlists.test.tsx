import React from "react";
import { Wishlists } from "./Wishlists";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { render, screen } from "@testing-library/react";

it("displays wishlist", () => {
  const loading = "";
  const error = "";
  const items = [
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
      <UserContext.Provider value={{ items, loading, error }}>
        <Wishlists />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const name = screen.getByText(/test name's Wishlist/);
  expect(name).toBeInTheDocument();

  const product = screen.getByText(/Product 1/);
  expect(product).toBeInTheDocument();
});

it("displays no wishlist", () => {
  const loading = "";
  const error = "";
  const items: any = [];

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, loading, error }}>
        <Wishlists />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const noWishlist = screen.getByText("No wishlist to be displayed");
  expect(noWishlist).toBeInTheDocument();
});

it("displays placeholders", () => {
  const loading = "loading";
  const error = "";
  const items: any = [];

  const PlaceholderComponent = render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, loading, error }}>
        <Wishlists />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const loaderAvatar: any = PlaceholderComponent.container.querySelector(
    ".placeholder-avatar-and-name"
  );
  expect(loaderAvatar).toBeInTheDocument();

  const loaderDetails: any = PlaceholderComponent.container.querySelector(
    ".placeholder-details"
  );
  expect(loaderDetails).toBeInTheDocument();

  const emptyItems = screen.getAllByText("No item to be displayed");
  expect(emptyItems).toBeTruthy();
});

it("displays error", () => {
  const loading = "";
  const error = "error";
  const items: any = [];

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, loading, error }}>
        <Wishlists />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const errorMessage = screen.getByText("error");
  expect(errorMessage).toBeInTheDocument();
});
