import React from "react";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { amount } = useGlobalContext();

  return (
    <nav>
      <div className="nav-center">
        <h3>useReducer</h3>
        <div className="nav-container">
          <img src="https://img.icons8.com/nolan/96/fast-cart.png" />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
