import React from "react";
import { Avatar } from "./Avatar";
import { render, screen } from "@testing-library/react";

it("displays the first and second characters", () => {
  render(<Avatar firstChar="New" secondChar="Test" />);

  const avatarText = screen.getByText("NT");
  expect(avatarText).toBeInTheDocument();
});

it("displays only the first character", () => {
  render(<Avatar firstChar="Test" />);

  const avatarText = screen.getByText("T");
  expect(avatarText).toBeInTheDocument();
});

it("displays empty characters", () => {
  const AvatarComponent = render(<Avatar firstChar="" secondChar="" />);

  const avatarContainer =
    AvatarComponent.container.querySelector(".avatar-custom");
  expect(avatarContainer).toHaveTextContent("");
});
