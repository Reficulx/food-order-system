import React, {useReducer} from 'react';
import CartContext from "./cart-context";


const defaultCartState = {
  items: [],
  totalAmount: 0
}

// state: latest states managed by reducer
// action: your action
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // .push() operates on the old array
    // .concat() returns a new array
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "REMOVE") {
    const updatedItems = state.items.remove(action.id);

  }
  return defaultCartState;
};
const CartProvider = props => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: "ADD", item: item});
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: "REMOVE", id: id});
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
};

export default CartProvider;