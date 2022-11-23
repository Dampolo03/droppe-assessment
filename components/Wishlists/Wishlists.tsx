import React, { useContext } from "react";
import { WishlistCards } from "../WishlistCards/WishlistCards";
import { PlaceholderCards } from "../PlaceholderCards/PlaceholderCards";
import { UserContext } from "../../context/UserContext";
import { formatDate } from "../../helpers/helpers";

export const Wishlists = () => {
  const { items, loading, error } = useContext(UserContext);

  return (
    <main className="wishlists-body">
      <h2 className="page-title">Wishlists</h2>
      <div className="cards-container">
        {error ? (
          <div className="error-loading">{error}</div>
        ) : loading ? (
          <PlaceholderCards />
        ) : items?.length ? (
          items?.map((each: any, i: any) => (
            <React.Fragment key={each.id + each.userId}>
              <WishlistCards
                name={each.name}
                dateCreated={`${formatDate(each.date)}`}
                index={i}
              />
            </React.Fragment>
          ))
        ) : (
          <div className="empty-wishlist">No wishlist to be displayed</div>
        )}
      </div>
    </main>
  );
};
