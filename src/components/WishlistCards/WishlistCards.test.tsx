import React from "react";
import { WishlistCards } from "./WishlistCards";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { render, screen } from "@testing-library/react";

jest.mock("../WishlistDetails/WishlistDetails", () => {
  return {
    __esModule: true,
    WishlistDetails: () => {
      return <div>test wishlist details</div>;
    },
  };
});

describe("displays <WishlistCards/>", () => {
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

  it("displays wishlist", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ items }}>
          <WishlistCards name="test name" index={0} dateCreated="01-01-2022" />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const numberOfItems = screen.getByText("Number of items: 1");
    expect(numberOfItems).toBeInTheDocument();

    const created = screen.getByText("Created: 01-01-2022");
    expect(created).toBeInTheDocument();
  });

  it("displays placeholder", () => {
    const PlaceholderCards = render(
      <BrowserRouter>
        <UserContext.Provider value={{ items }}>
          <WishlistCards index={0} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const placeholders = PlaceholderCards.container.querySelector(
      ".placeholder-details"
    );
    expect(placeholders).toBeInTheDocument();
  });
});
