import React, {useContext, useState} from 'react';
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
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
  return <Modal onClose={props.onHidingCart}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onCancel={props.onHidingCart} onConfirm={props.onHidingCart} />}
    {!isCheckout && modalActionsComponent}
  </Modal>
};

export default Cart;