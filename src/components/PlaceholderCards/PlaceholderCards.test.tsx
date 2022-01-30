import React from "react";
import { PlaceholderCards } from "./PlaceholderCards";
import { render, screen } from "@testing-library/react";

jest.mock("../WishlistCards/WishlistCards", () => {
  return {
    __esModule: true,
    WishlistCards: () => {
      return <div>test wishlist cards</div>;
    },
  };
});

it("renders <PlaceholderCards/>", () => {
  render(<PlaceholderCards />);

  const placeholders = screen.getAllByText("test wishlist cards");
  expect(placeholders).toBeTruthy();
});
