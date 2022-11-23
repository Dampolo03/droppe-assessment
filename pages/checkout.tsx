import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
import { ApprovedAndDiscardedComponent } from "../components/ApprovedAndDiscardedComponent/ApprovedAndDiscardedComponent";
import { axiosInstance } from "./api/axiosServices";
import paths from "../router/paths";

const CheckoutPage = () => {
  const { items, discardedItems } = useContext(UserContext);

  const history = useRouter();

  const returnToWishlists = () => {
    history.push(paths.root);
  };

  const moveToConfirmation = () => {
    history.push(paths.confirmation);
  };

  const saveCarts = () => {
    let id: number;
    for (var i = 0; i < items?.length; i++) {
      id = items[i].id;
      axiosInstance.patch(
        `carts/${id}`,
        JSON.stringify({
          userId: items[i].id,
          date: items[i].date,
          products: items[i].products,
        })
      );
    }

    for (var j = 0; j < discardedItems?.length; j++) {
      id = discardedItems[j].id;
      axiosInstance.patch(
        `carts/${id}`,
        JSON.stringify({
          userId: discardedItems[j].id,
          date: discardedItems[j].date,
          products: discardedItems[j].products,
        })
      );
    }
    moveToConfirmation();
  };
  return (
    <>
      <ApprovedAndDiscardedComponent
        header="Checkout"
        returnToWishlists={() => returnToWishlists()}
        moveToCheckout={() => saveCarts()}
      />
    </>
  );
};

export default CheckoutPage;
