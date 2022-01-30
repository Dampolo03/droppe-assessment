import React from "react";
import { Card } from "./Card";
import { render } from "@testing-library/react";

it("assigns class name to card", () => {
  const CardComponent = render(
    <Card
      className="test-classname"
      children={<div>test card</div>}
      style={{}}
    />
  );

  const card = CardComponent.container.querySelector(".test-classname");
  expect(card).toBeInTheDocument();
  expect(card).toHaveTextContent("test card");
});

it("displays default card", () => {
  const CardComponent = render(<Card />);

  const card = CardComponent.container.querySelector(".card");
  expect(card).toBeInTheDocument();
});
