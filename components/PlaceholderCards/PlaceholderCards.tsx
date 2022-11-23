import { WishlistCards } from "../WishlistCards/WishlistCards";

export const PlaceholderCards = () => {
  return (
    <>
      {Array.apply(null, { length: 5 } as any).map((e, i) => (
        <WishlistCards key={i} index={i} />
      ))}
    </>
  );
};
