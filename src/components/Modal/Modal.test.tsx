import React from "react";
import { Modal } from "./Modal";
import { fireEvent, render, screen } from "@testing-library/react";

it("displays modal", () => {
  const hideModal = jest.fn();
  const executeMethod = jest.fn();

  render(
    <Modal
      openModal
      hideModal={hideModal}
      executeMethod={executeMethod}
      header="test modal header"
      texts={<div>test modal texts</div>}
    />
  );

  const modalHeader = screen.getByText("test modal header");
  expect(modalHeader).toBeInTheDocument();

  const modalTexts = screen.getByText("test modal texts");
  expect(modalTexts).toBeInTheDocument();

  const yesButton = screen.getByText("Yes");
  fireEvent.click(yesButton);
  expect(executeMethod).toBeCalledTimes(1);

  const noButton = screen.getByText("No");
  fireEvent.click(noButton);
  expect(hideModal).toBeCalledTimes(1);
});
