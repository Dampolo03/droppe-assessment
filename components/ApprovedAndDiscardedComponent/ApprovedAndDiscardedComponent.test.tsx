import React from "react";
import { ApprovedAndDiscardedComponent } from "./ApprovedAndDiscardedComponent";
import { Router, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { UserContext } from "../../context/UserContext";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

afterEach(cleanup);

describe("renders <ApprovedAndDiscardedComponent/>", () => {
  const history = createMemoryHistory();
  const returnToWishlists = jest.fn();
  const moveToCheckout = jest.fn();
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
  const discardedItems = [
    {
      id: 2,
      userId: 2,
      date: "2020-03-02T00:00:02.000Z",
      products: [
        {
          productId: 2,
          quantity: 2,
          amount: 200,
          images: "test-image1.png",
        },
      ],
      name: "test name",
      total_items: 2,
      total_amount: 400,
    },
  ];

  it("displays approved carts and routes to the confirmation page", async () => {
    const ApprovedAndDiscardedTestComponent = render(
      <Router history={history}>
        <UserContext.Provider value={{ items, discardedItems }}>
          <ApprovedAndDiscardedComponent
            header="test checkout"
            returnToWishlists={returnToWishlists}
            moveToCheckout={moveToCheckout}
          />
        </UserContext.Provider>
      </Router>
    );

    const approvedTable: any =
      ApprovedAndDiscardedTestComponent.container.querySelector(
        ".all-approved-trs"
      );
    expect(approvedTable).toHaveTextContent("Product 111$100$100");
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(moveToCheckout).toBeCalledTimes(1);
  });

  it("displays the confirmation page", async () => {
    const ApprovedAndDiscardedTestComponent = render(
      <Router history={history}>
        <UserContext.Provider value={{ items, discardedItems }}>
          <ApprovedAndDiscardedComponent
            header="test confirmation"
            returnToWishlists={returnToWishlists}
            moveToCheckout={moveToCheckout}
            confirmCheckout
          />
        </UserContext.Provider>
      </Router>
    );

    const successText = screen.getByText(/Cart saved successfully/);
    expect(successText).toBeInTheDocument();

    const approvedTable: any =
      ApprovedAndDiscardedTestComponent.container.querySelector(
        ".all-approved-trs"
      );
    expect(approvedTable).toHaveTextContent("Product 111$100$100");

    const discardedTable: any =
      ApprovedAndDiscardedTestComponent.container.querySelector(
        ".all-discarded-trs"
      );
    expect(discardedTable).toHaveTextContent("Product 22$200$400");

    const returnToWishlistsButton = screen.getByText(/Return to wishlists/);
    fireEvent.click(returnToWishlistsButton);
    expect(returnToWishlists).toBeCalledTimes(1);
  });
});

it("displays empty approved and discared carts", async () => {
  var items, discardedItems;
  items = discardedItems = [
    {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:02.000Z",
      products: [],
      name: "test name",
      total_items: 1,
      total_amount: 100,
    },
  ];

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, discardedItems }}>
        <ApprovedAndDiscardedComponent
          header="test empty checkout"
          confirmCheckout
        />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const emptyApprovedCart = screen.getByText(
    "No approved product to be displayed"
  );
  expect(emptyApprovedCart).toBeInTheDocument();

  const emptyDiscardedCart = screen.getByText(
    "No discarded product to be displayed"
  );
  expect(emptyDiscardedCart).toBeInTheDocument();
});

it("displays discount for items present in two or more wishlists", async () => {
  var items, discardedItems;
  items = discardedItems = [
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
      name: "test name 1",
      total_items: 1,
      total_amount: 100,
    },
    {
      id: 2,
      userId: 2,
      date: "2020-03-02T00:00:02.000Z",
      products: [
        {
          productId: 1,
          quantity: 2,
          amount: 100,
          images: "test-image1.png",
        },
      ],
      name: "test name 2",
      total_items: 2,
      total_amount: 200,
    },
  ];

  const ApprovedAndDiscardedTable = render(
    <BrowserRouter>
      <UserContext.Provider value={{ items, discardedItems }}>
        <ApprovedAndDiscardedComponent
          header="test empty checkout"
          confirmCheckout
        />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const approvedTable: any = ApprovedAndDiscardedTable.container.querySelector(
    ".approved-order-container"
  );

  const discount = screen.getByText(/-20%/);
  expect(discount).toBeInTheDocument();

  expect(approvedTable.children[3]).toHaveTextContent("Total Price$300");
  expect(approvedTable.children[4]).toHaveTextContent("Discount$60");
  expect(approvedTable.children[5]).toHaveTextContent("Grand Total$240");
});
