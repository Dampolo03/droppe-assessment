import React from "react";
import { MainBody } from "../../components/MainBody/MainBody";
import { Wishlists } from "../../components/Wishlists/Wishlists";

export const HomePage = () => {
  return (
    <>
      <MainBody children={<Wishlists />} checkout />
    </>
  );
};
