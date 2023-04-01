import React, {useEffect, useState} from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect should not return a Promise function but a cleanup function, which is synchronous
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "meal.json");
      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          ...data[key]
        })
      }
      console.log(data);
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals();
  }, []);
  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>;
  }
  const mealItems = meals.map(meal => {
    return <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  });
  return <section className={classes.meals}>
    <Card>
      <ul>{mealItems}</ul>
    </Card>
    </section>
};

export default AvailableMeals;
