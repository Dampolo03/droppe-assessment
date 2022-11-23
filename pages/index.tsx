import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "../components/Button/Button";
import { Wishlists } from "../components/Wishlists/Wishlists";
import { getData } from "../helpers/helpers";
import { useRouter } from "next/router";
import paths from "../router/paths";

export const getStaticProps = async () => {
  // export const getServerSideProps = async () => {
  // let obtainedData = [];

  // axiosInstance.get("carts?limit=5").then((data) => {
  //   obtainedData = data.data;
  // });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}carts?limit=5`);
  const data = await res.json();

  return {
    props: { obtainedData: data },
  };
};

const Home = ({ obtainedData }) => {
  const { setItems, setDiscardedItems } = useContext(UserContext);

  useEffect(() => {
    const newData = getData(obtainedData);
    setItems(newData);
    let discardedData = [...newData];
    for (var q = 0; q < discardedData?.length; q++) {
      discardedData[q] = Object.assign({}, discardedData[q], {
        products: [],
      });
    }
    setDiscardedItems(discardedData);
  }, []);

  const history = useRouter();

  const moveToCheckout = () => {
    history.push(paths.checkout);
  };

  return (
    <>
      <Wishlists />
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
    </>
  );
};

export default Home;
