import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Header } from "../components/Header/Header";
import Head from "next/head";
import "../styles/globals.scss";

// export const getStaticProps = async () => {
//   // let obtainedData = [];

//   // axiosInstance.get("carts?limit=5").then((data) => {
//   //   obtainedData = data.data;
//   // });

//   const res = await fetch("https://fakestoreapi.com/carts?limit=5");
//   const data = await res.json();

//   return {
//     props: { obtainedData: data },
//   };
// };

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [discardedItems, setDiscardedItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // setLoading(true);
    // const newData = getData(obtainedData);
    // setItems(newData);
    setError("");
    // let discardedData = newData;
    // for (var q = 0; q < discardedData?.length; q++) {
    //   discardedData[q] = Object.assign({}, discardedData[q], {
    //     products: [],
    //   });
    // }
    // setDiscardedItems(discardedData);
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Droppe Assessment" />
        <title>Droppe Assessment</title>
      </Head>
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
        <div className="main-body">
          <div className="body-container">
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default MyApp;
