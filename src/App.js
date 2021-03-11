import React, { useContext } from "react";
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
// import Loading from "./Loading";
import { useGlobalContext } from "./context";

// let loading = false;

const App = () => {
  const { loading } = useGlobalContext();
  // take time to load the data.
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
