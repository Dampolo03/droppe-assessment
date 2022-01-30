import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { ConfirmationPage } from "../pages/ConfirmationPage/ConfirmationPage";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../services/axiosServices";
import { getData } from "../helpers/helpers";
import paths from "./paths";

export const RouterComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Array<any>>([]);
  const [discardedItems, setDiscardedItems] = useState<Array<any>>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("carts?limit=5")
      .then((data: any) => {
        const newData = getData(data.data);
        setItems(newData);

        let discardedData = [...newData];
        for (var q = 0; q < discardedData.length; q++) {
          discardedData[q] = Object.assign({}, discardedData[q], {
            products: [],
          });
        }
        setDiscardedItems(discardedData);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong...");
      });
  }, []);

  return (
    <Router>
      <UserContext.Provider
        value={{
          items,
          loading,
          error,
          setItems,
          discardedItems,
          setDiscardedItems,
        }}
      >
        <Switch>
          <Route exact path={paths.root} component={HomePage} />
          <Route exact path={paths.checkout} component={CheckoutPage} />
          <Route exact path={paths.confirmation} component={ConfirmationPage} />
          <Route exact path={paths.noPage} component={HomePage} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};
