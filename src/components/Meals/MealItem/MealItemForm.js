import React, {useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const quantInputRef = useRef();
  const [isQuantValid, setIsQuantValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const quantInput = quantInputRef.current.value;
    const enteredQuant = +quantInput;
    if (quantInput.trim().length === 0 || enteredQuant < 1 || enteredQuant > 5) {
      setIsQuantValid(false);
      return;
    }
    props.onAddItemToCart(enteredQuant);
  };

  return <form className={classes.form} onSubmit={submitHandler}>
    <Input ref={quantInputRef} label="Quantity"
           input={{id: "quantity_" + props.id, type: "number", min: "1", max: "5", step: "1", defaultValue: "1"}}/>
    <button>+ Add</button>
    {!isQuantValid && <p>Please enter a valid amount (1-5).</p>}
  </form>
};

export default MealItemForm;
