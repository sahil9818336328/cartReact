import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import CartItem from "./data";

//setting initial state for Reducer
const initialValue = {
  loading: false,
  cart: CartItem, //local data.
  total: 0,
  amount: 0,
};
const url = "https://course-api.com/react-useReducer-cart-project";
const globalContext = createContext("PROVIDER NOT FOUND");
const AppProvider = ({ children }) => {
  const Provider = globalContext.Provider;

  const [state, dispatch] = useReducer(reducer, initialValue); //initial value is an object

  // clear cart function
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  //   function to remove an item from the cart.
  const remove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  //   increase the item
  const increase = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };
  //   decrease the item
  const decrease = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };
  // FETCH THE DATA //LOADING
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const finalResponse = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: finalResponse }); //response from external API.
  };
  useEffect(() => {
    fetchData();
  }, []); //only run once on the initial render
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]); //runs when cart is modified.
  return (
    <Provider value={{ ...state, clearCart, remove, increase, decrease }}>
      {children}
    </Provider>
  );
};

//CUSTOM HOOK
const useGlobalContext = () => {
  return useContext(globalContext);
};
export { globalContext, AppProvider, useGlobalContext };
