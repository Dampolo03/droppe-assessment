import React from "react";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import { useRouter } from "next/router";
import paths from "../../router/paths";

interface MainBodyProps {
  checkout?: boolean;
  children: React.ReactElement<any, any>;
}

export const MainBody: React.FC<MainBodyProps> = ({ children, checkout }) => {
  const history = useRouter();

  const moveToCheckout = () => {
    history.push(paths.checkout);
  };

  return (
    <div className="main-body">
      <div className="body-container">
        <Header />
        {children}
        {checkout && (
          <div className="checkout-button">
            <Button
              clickButton={() => moveToCheckout()}
              custom
              text="Checkout"
              style={{
                width: "8rem",
                height: "3rem",
                fontSize: "1rem",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
