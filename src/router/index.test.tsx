import React from "react";
import { RouterComponent } from "./index";
import { axiosInstance } from "../services/axiosServices";
import { render, screen, waitFor } from "@testing-library/react";

it("routes to the home page", async () => {
  jest.spyOn(axiosInstance, "get").mockReturnValue(
    Promise.resolve({
      data: [
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
      ],
    })
  );

  render(<RouterComponent />);

  await waitFor(() => axiosInstance.get);
  const homeText = screen.getByText("Wishlists");
  expect(homeText).toBeInTheDocument();
});

it("displays error message", async () => {
  jest.spyOn(axiosInstance, "get").mockReturnValue(Promise.reject({}));

  render(<RouterComponent />);

  await waitFor(() => axiosInstance.get);
  const errorMessage = screen.getByText("Something went wrong...");
  expect(errorMessage).toBeInTheDocument();
});
