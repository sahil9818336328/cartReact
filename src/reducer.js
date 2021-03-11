const reducer = (state, action) => {
  // loading...
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  //   display the items
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  //clear cart action
  if (action.type === "CLEAR_CART") {
    //return all the existing values and empty the cart .
    return { ...state, cart: [] };
  }
  //   remove item action
  if (action.type === "REMOVE_ITEM") {
    //return all the existing values and filter the cart .
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  //   increase the item
  if (action.type === "INCREASE_ITEM") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        // if the id matches, only alter that item and modify the amount.
        return { ...item, amount: item.amount + 1 }; //...item === individual object having 5 properties.//just modifying the amount .
      }
      return item; // return the item as it is if the id does'nt match.
    });
    return { ...state, cart: tempCart }; // just changing the amount value
  }
  //   deccrease the item
  if (action.type === "DECREASE_ITEM") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount !== 0); // if the item has an amount === 0 , dont show that item .
    return { ...state, cart: tempCart }; //just changing the amount value
  }
  if (action.type === "GET_TOTALS") {
    let { amount, total } = state.cart.reduce(
      //this will return us an object with amount and total as properties, so we destructure it.
      (accumulator, currentItem) => {
        //   console.log(currentItem);
        const { price, amount } = currentItem; //single item === object.
        // console.log(price, amount);
        const itemTotal = price * amount;

        accumulator.total += itemTotal; // total of all the items.
        accumulator.amount += amount; //total items in the cart .
        return accumulator;
      },
      { amount: 0, total: 0 }
    );
    total = parseFloat(total).toFixed(2);
    return { ...state, amount, total };
  }
};

export default reducer;
