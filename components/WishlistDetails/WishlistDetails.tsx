import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";

interface WishlistDetailsProps {
  index: number;
}

export const WishlistDetails: React.FC<WishlistDetailsProps> = ({ index }) => {
  const { items, setItems, discardedItems } = useContext(UserContext);
  const [openModal, setOpenModal] = useState<number>(0);

  const handleChange = useCallback(
    (e: any, each: any) => {
      each.quantity = Number(e.target.value);
      setItems([...items]);
    },
    [items, setItems]
  );

  const discardItem = (id: number) => {
    let prodObj = items[index]?.products[id];
    discardedItems[index].products.push(prodObj);
    items[index]?.products.splice(id, 1);
    setItems([...items]);
  };

  return (
    <div className="details-container">
      <div className="each-detail-container">
        {items[index]?.products?.length ? (
          items[index].products.map((each: any, i: any) => (
            <React.Fragment key={i}>
              <Card className="product-card">
                <>
                  <div>
                    <div
                      style={{
                        backgroundImage: `url(${each.images})`,
                      }}
                    />
                  </div>
                  <div>
                    <div>Product {each.productId}</div>
                    <div>Price: ${each.amount}</div>
                    <input
                      value={each.quantity}
                      onChange={(e) => handleChange(e, each)}
                      type="number"
                      min="0"
                      placeholder="input count"
                    />
                    {i === 0 && <div>Favourite</div>}
                  </div>
                  <div>
                    <Button
                      custom={false}
                      text={"Discard"}
                      clickButton={() => {
                        setOpenModal(each.productId);
                      }}
                    />
                  </div>
                </>
              </Card>
              <Modal
                openModal={openModal === each.productId}
                hideModal={() => setOpenModal(0)}
                executeMethod={() => discardItem(i)}
                header="Discard item"
                texts={`Do you want to discard ${items[index].name}'s product ${each.productId}? This action is irreversible!`}
              />
            </React.Fragment>
          ))
        ) : (
          <div className="empty-item">No item to be displayed</div>
        )}
      </div>
    </div>
  );
};
