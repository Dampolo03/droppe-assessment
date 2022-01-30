import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import {
  prices,
  images,
  unique,
  getGrouppedArray,
  getEachProductCount,
  getGroupedQuantities,
} from "../../helpers/helpers";

interface ApprovedAndDiscardedComponentProps {
  header: string;
  returnToWishlists?: () => void;
  moveToCheckout?: () => void;
  confirmCheckout?: boolean;
}

export const ApprovedAndDiscardedComponent: React.FC<
  ApprovedAndDiscardedComponentProps
> = ({ confirmCheckout, returnToWishlists, moveToCheckout, header }) => {
  const { items, discardedItems } = useContext(UserContext);
  const [totalApprovedItems, setTotalApprovedItems] = useState<number>(0);
  const [totalDiscardedItems, setTotalDiscardedItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState<number>(0);
  const [totalOriginalDiscardedPrice, setTotalOriginalDiscardedPrice] =
    useState<number>(0);
  const [checkoutApprovedArray, setCheckoutApprovedArray] = useState<
    Array<any>
  >([]);
  const [checkoutDiscardedArray, setCheckoutDiscardedArray] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    const groupedArray = getGrouppedArray(items);
    const eachProductCount: any = getEachProductCount(groupedArray);
    const groupedQuantities: any = getGroupedQuantities(groupedArray);

    const groupedDiscardedArray = getGrouppedArray(discardedItems);
    const eachDiscardedProductCount: any = getEachProductCount(
      groupedDiscardedArray
    );
    const groupedDiscardedQuantities: any = getGroupedQuantities(
      groupedDiscardedArray
    );

    const getUniqueArrays = (
      setState: React.Dispatch<React.SetStateAction<any[]>>,
      productCounts: any,
      quantityCounts: any
    ) => {
      let combinedArray: any = [];

      for (var i = 0; i < productCounts?.length; i++) {
        combinedArray[i] = {
          count: productCounts[i]?.count,
          Id: quantityCounts[i]?.Id,
          quantity: quantityCounts[i]?.quantity,
        };
      }
      for (var m = 0; m < combinedArray?.length; m++) {
        for (var n = 0; n < Object.keys(prices).length; n++) {
          if (combinedArray[m].Id === Number(Object.keys(prices[n])[0])) {
            const newPrice: any = prices;
            const obtainedIndex = Number(Object.keys(prices[n])[0]);
            combinedArray[m].amount = newPrice[n][obtainedIndex];
          }
        }
        for (var q = 0; q < Object.keys(images)?.length; q++) {
          if (combinedArray[m].Id === Number(Object.keys(images[q])[0])) {
            const newImage: any = images;
            const obtainedImagesIndex = Number(Object.keys(images[q])[0]);
            combinedArray[m].images = newImage[q][obtainedImagesIndex];
          }
        }
      }
      const newCombinedArray: any = unique(combinedArray);
      setState(newCombinedArray);
      return newCombinedArray;
    };

    const modifiedData = (
      data: any,
      setStateOne: React.Dispatch<React.SetStateAction<number>>,
      setStateTwo: React.Dispatch<React.SetStateAction<number>>,
      setStateThree?: React.Dispatch<React.SetStateAction<number>>
    ) => {
      let allItems = 0;
      let allPrice = 0;
      let allOriginalPrice = 0;

      for (var r = 0; r < data.length; r++) {
        allItems += data[r].quantity;
        if (data[r].count > 1) {
          data[r].total_price =
            data[r].quantity * data[r].amount -
            ((data[r].count * 10) / 100) * (data[r].quantity * data[r].amount);
        } else {
          data[r].total_price = data[r].quantity * data[r].amount;
        }
        data[r].original_total_price = data[r].quantity * data[r].amount;
      }
      for (var s = 0; s < data.length; s++) {
        allPrice += data[s].total_price;
        allOriginalPrice += data[s].original_total_price;
      }
      setStateOne(allItems);
      setStateTwo(allOriginalPrice);
      setStateThree && setStateThree(allPrice);
    };

    const newCheckoutArray = getUniqueArrays(
      setCheckoutApprovedArray,
      eachProductCount,
      groupedQuantities
    );

    const newDiscardedArray = getUniqueArrays(
      setCheckoutDiscardedArray,
      eachDiscardedProductCount,
      groupedDiscardedQuantities
    );

    modifiedData(
      newCheckoutArray,
      setTotalApprovedItems,
      setTotalOriginalPrice,
      setTotalPrice
    );

    modifiedData(
      newDiscardedArray,
      setTotalDiscardedItems,
      setTotalOriginalDiscardedPrice
    );
  }, [items, discardedItems]);

  return (
    <main className="carts-body">
      <h2 className="page-title">{header}</h2>
      <div className="return-arrow" onClick={returnToWishlists}>
        &#60; Return to wishlists
      </div>
      {confirmCheckout && (
        <div className="successful-save">Cart saved successfully &#10003;</div>
      )}
      <>
        <div className="approved-container">
          <h3 className="approved-title">Approved Cart</h3>
          <div className="approved-cart-container">
            <>
              <Card>
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Details</th>
                        <th>Wishlist</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkoutApprovedArray?.length ? (
                        checkoutApprovedArray.map((each: any) => (
                          <tr className="all-approved-trs" key={each.Id}>
                            <td className="approved-image-and-name-td">
                              <div
                                className="approved-image-td-child"
                                style={{
                                  backgroundImage: `url(${each.images})`,
                                }}
                              />
                              <div>Product {each.Id}</div>
                            </td>
                            <td>{each.count}</td>
                            <td>{each.quantity}</td>
                            <td>${each.amount}</td>
                            <td>
                              {each.count > 1 ? (
                                <div className="count-greater-than-one">
                                  $
                                  {each.quantity * each.amount -
                                    ((each.count * 10) / 100) *
                                      (each.quantity * each.amount)}
                                  <span className="discount-percent">
                                    -{each.count * 10}%
                                  </span>
                                </div>
                              ) : (
                                <div>${each.quantity * each.amount}</div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="empty-approved-cart">
                          <td>No approved product to be displayed</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              </Card>
              <div>
                <Card className="approved-order-card">
                  <>
                    <div className="approved-order-container">
                      <div>
                        {confirmCheckout ? (
                          <h3>Approved Order Summary</h3>
                        ) : (
                          <h3>Order Summary</h3>
                        )}
                      </div>
                      <div>
                        <div>Total Wishlists</div>
                        <div>{items.length}</div>
                      </div>
                      <div>
                        <div>Total Items</div>
                        <div>{totalApprovedItems}</div>
                      </div>
                      <div>
                        <div>Total Price</div>
                        <div>${totalOriginalPrice}</div>
                      </div>
                      <div>
                        <div>Discount</div>
                        <div>${totalOriginalPrice - totalPrice}</div>
                      </div>
                      <div>
                        <div>Grand Total</div>
                        <div>${totalPrice}</div>
                      </div>
                    </div>
                  </>
                </Card>
                {!confirmCheckout && (
                  <div className="approved-button-container">
                    <Button
                      custom
                      text="Save"
                      clickButton={moveToCheckout}
                      style={{
                        width: "100%",
                        height: "3rem",
                        fontSize: "1rem",
                      }}
                    />
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
        {confirmCheckout && (
          <div className="discarded-container">
            <h3 className="discarded-title">Discarded Cart</h3>
            <div className="discarded-cart-container">
              <>
                <Card>
                  <>
                    <table>
                      <thead>
                        <tr className="discarded-header-tr">
                          <th>Product Details</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkoutDiscardedArray?.length ? (
                          checkoutDiscardedArray.map((each: any) => (
                            <tr className="all-discarded-trs" key={each.Id}>
                              <td className="discarded-image-and-name-td">
                                <div
                                  className="discarded-image-td-child"
                                  style={{
                                    backgroundImage: `url(${each.images})`,
                                  }}
                                />
                                <div>Product {each.Id}</div>
                              </td>
                              <td>{each.quantity}</td>
                              <td>${each.amount}</td>
                              <td>${each.quantity * each.amount}</td>
                            </tr>
                          ))
                        ) : (
                          <tr className="empty-discarded-cart">
                            <td>No discarded product to be displayed</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                </Card>
                <Card>
                  <div className="discarded-order-container">
                    <div>
                      <h3>Discarded Order Summary</h3>
                    </div>
                    <div>
                      <div>Total Items</div>
                      <div>{totalDiscardedItems}</div>
                    </div>
                    <div>
                      <div>Total Price</div>
                      <div>${totalOriginalDiscardedPrice}</div>
                    </div>
                  </div>
                </Card>
              </>
            </div>
          </div>
        )}
      </>
    </main>
  );
};
