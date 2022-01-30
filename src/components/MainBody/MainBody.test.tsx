import React from "react";
import { MainBody } from "./MainBody";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from "@testing-library/react";
import paths from "../../router/paths";

it("displays the main body with the checkout button", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <MainBody children={<div>test children</div>} checkout />
    </Router>
  );

  const childElement = screen.getByText("test children");
  expect(childElement).toBeInTheDocument();

  const checkoutButton = screen.getByText("Checkout");
  fireEvent.click(checkoutButton);
  expect(history.location.pathname).toBe(paths.checkout);
});
