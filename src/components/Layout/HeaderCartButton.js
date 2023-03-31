import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  // access the cart context
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
  const context = useContext(CartContext);
  const { items } = context;
  const numberOfCartItems = items.reduce((quant, item) => quant + item.quantity, 0);

  const buttonClasses = `${classes.button} ${isBtnHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBtnHighlighted(true);
    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [items]);
  return <button className={buttonClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>
      {numberOfCartItems}
    </span>
  </button>
};

export default HeaderCartButton;