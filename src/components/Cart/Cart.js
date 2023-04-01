import React, {useContext, useState} from 'react';
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    context.addItem({...item, quantity: 1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    // TODO: handle the potential errors for the response
    await fetch(process.env.REACT_APP_BACKEND_URL + "orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };

  // Remark: use .bind() to make sure the bound parameter is executed when the function is called
  const cartItems = <ul className={classes['cart-items']}>
    {context.items.map(item => (
      <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
    ))}
  </ul>;

  const modalActionsComponent = <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHidingCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

  const cartModalContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHidingCart} />}
    {!isCheckout && modalActionsComponent}
  </React.Fragment>;

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <React.Fragment>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onHidingCart}>Close</button>
    </div>
  </React.Fragment>;

  return <Modal onClose={props.onHidingCart}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>
};

export default Cart;