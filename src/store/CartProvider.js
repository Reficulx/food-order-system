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
    let updatedItem;
    let updatedItems;
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
    // return the index of the found item
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "REMOVE") {
    let updatedItems;
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...existingItem, quantity: existingItem.quantity-1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
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