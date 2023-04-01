import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = (props) => {
  const [isInputValid, setIsInputValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true
  });
  const nameInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const nameInput = nameInputRef.current.value;
    const streetInput = streetInputRef.current.value;
    const cityInput = cityInputRef.current.value;
    const postalInput = postalInputRef.current.value;

    const isNameInputValid = !isEmpty(nameInput);
    const isStreetInputValid = !isEmpty(streetInput);
    const isCityInputValid = !isEmpty(cityInput);
    const isPostalInputValid = isFiveChars(postalInput);

    setIsInputValid({
      name: isNameInputValid,
      street: isStreetInputValid,
      city: isCityInputValid,
      postal: isPostalInputValid
    });
    const formIsValid = isNameInputValid && isStreetInputValid && isCityInputValid && isPostalInputValid;

    if (!formIsValid) {
      return;
    }
    // Submit cart data
    props.onConfirm({
      name: nameInput,
      street: streetInput,
      city: cityInput,
      postal: postalInput
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={`${classes.control} ${isInputValid.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!isInputValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${isInputValid.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!isInputValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${isInputValid.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!isInputValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={`${classes.control} ${isInputValid.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!isInputValid.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;