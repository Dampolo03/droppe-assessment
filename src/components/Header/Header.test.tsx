import React from "react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

it("displays <Header/>", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const appName = screen.getByText("Droppe");
  expect(appName).toBeInTheDocument();
  const spanName = screen.getByText("XMAS");
  expect(spanName).toBeInTheDocument();
  const help = screen.getByText("Help");
  expect(help).toBeInTheDocument();
});
