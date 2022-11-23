import { ApprovedAndDiscardedComponent } from "../components/ApprovedAndDiscardedComponent/ApprovedAndDiscardedComponent";
import { useRouter } from "next/router";
import paths from "../router/paths";

const ConfirmationPage = () => {
  const history = useRouter();

  const returnToWishlists = () => {
    history.push(paths.root);
  };

  return (
    <>
      <ApprovedAndDiscardedComponent
        header="Confirmation"
        confirmCheckout
        returnToWishlists={() => returnToWishlists()}
      />
    </>
  );
};

export default ConfirmationPage;
