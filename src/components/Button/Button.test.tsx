import React from "react";
import { Button } from "./Button";
import { fireEvent, render } from "@testing-library/react";

it("displays the custom button", () => {
  const clickButton = jest.fn();

  const ButtonCustom = render(
    <Button text="custom button" custom clickButton={clickButton} style={{}} />
  );

  const button: any = ButtonCustom.container.querySelector(".custom-button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("custom button");

  fireEvent.click(button);
  expect(clickButton).toBeCalledTimes(1);
});

it("displays the red button", () => {
  const ButtonCustom = render(<Button text="red button" custom={false} />);

  const button: any = ButtonCustom.container.querySelector(".danger-button");
  expect(button).toBeInTheDocument();
});
