import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { WishlistDetails } from "../WishlistDetails/WishlistDetails";
import { Avatar } from "../Avatar/Avatar";
import { Card } from "../Card/Card";

interface WishlistCardsProps {
  name?: string;
  index: number;
  dateCreated?: string;
}

export const WishlistCards: React.FC<WishlistCardsProps> = ({
  name,
  index,
  dateCreated,
}) => {
  const { items } = useContext(UserContext);

  const viewTotalPrice = (data: any, i: any) => {
    let numberSum = 0;
    let numberArray = [];

    for (var o = 0; o < data.length; o++) {
      for (var p = 0; p < data[o].products?.length; p++) {
        if (!data[o]?.products?.length) {
          data[o].total_amount = 0;
        }
        numberSum += data[o].products[p].quantity * data[o].products[p].amount;
      }
      numberArray.push(numberSum);
      numberSum = 0;
      data[o].total_amount = numberArray[o];
    }
    return data[i]?.total_amount;
  };

  const viewTotalItems = (data: any, i: any) => {
    let sumArray = [];
    let productArray = [];

    for (var j = 0; j < data.length; j++) {
      productArray = data[j]?.products;
      const res: any = Array.from(
        productArray?.reduce(
          (m: any, { total, quantity }: any) =>
            m.set(total, (m.get(total) || 0) + quantity),
          new Map()
        ),
        ([total, quantity]) => ({ total, quantity })
      );
      sumArray.push(res[0]?.quantity);
    }
    for (var k = 0; k < sumArray?.length; k++) {
      if (sumArray[k] !== undefined) {
        data[k].total_items = sumArray[k];
      } else data[k].total_items = 0;
    }
    return data[i]?.total_items;
  };

  return (
    <Card className="card-details">
      <>
        <div className="avatar-and-name">
          {name ? (
            <div className="card-avatar">
              <Avatar
                firstChar={name?.substr(0, name.indexOf(" "))}
                secondChar={name?.substr(name.indexOf(" ") + 1)}
                style={{ marginRight: "1rem" }}
              />
              <div className="card-name">{name}'s Wishlist</div>
            </div>
          ) : (
            <div className="placeholder-avatar-and-name" />
          )}
          {name ? (
            <div className="wishlist-details">
              <div>Number of items: {viewTotalItems(items, index)}</div>
              <div>Total amount: ${viewTotalPrice(items, index)}</div>
              <div>Created: {dateCreated}</div>
            </div>
          ) : (
            <div className="placeholder-details" />
          )}
        </div>
        <WishlistDetails index={index} />
      </>
    </Card>
  );
};
