import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {

  return <React.Fragment>
    <header className={classes.header}>
      <h1>Happy Meals</h1>
      <HeaderCartButton />
    </header>
    <div className={classes['main-image']}>
      {/*use url if its from an online database, but use the following for a local image*/}
      <img src={mealsImage}/>
    </div>
  </React.Fragment>
};

export default Header;