import React from "react";
import { MainBody } from "../../components/MainBody/MainBody";
import { ApprovedAndDiscardedComponent } from "../../components/ApprovedAndDiscardedComponent/ApprovedAndDiscardedComponent";
import { useHistory } from "react-router-dom";
import paths from "../../router/paths";

export const ConfirmationPage = () => {
  const history = useHistory();

  const returnToWishlists = () => {
    history.push(paths.root);
  };

  return (
    <>
      <MainBody
        children={
          <ApprovedAndDiscardedComponent
            header="Confirmation"
            confirmCheckout
            returnToWishlists={() => returnToWishlists()}
          />
        }
      />
    </>
  );
};
