import React from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return <form onSubmit={submitHandler}>
    <div className={classes.control}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name'/>
    </div>
    <div className={classes.control}>
      <label htmlFor='street'>Street Address</label>
      <input type='text' id='street'/>
    </div>
    <div className={classes.control}>
      <label htmlFor='city'>City</label>
      <input type='text' id='city'/>
    </div>
    <div className={classes.control}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='text' id='postal'/>
    </div>
    <button type='button' onClick={props.onCancel}>Cancel</button>
    <button onClick={props.onConfirm}>Confirm</button>
  </form>
};

export default Checkout;