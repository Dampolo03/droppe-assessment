export const fetchCarts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}carts?limit=5`);
  const data = await res.json();

  return data;
};
