import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DetailsDrink from './pages/drinks/DetailsDrink';
import Drinks from './pages/drinks/Drinks';
import ProgressDrink from './pages/drinks/ProgressDrink';
import Explore from './pages/explore/Explore';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreFoods from './pages/explore/ExploreFoods';
import ExploreFoodsByArea from './pages/explore/ExploreFoodsByArea';
import ExploreIngredientsDrink from './pages/explore/ExploreIngredientsDrink';
import ExploreIngredientsFood from './pages/explore/ExploreIngredientsFood';
import DetailsFood from './pages/foods/DetailsFood';
import Foods from './pages/foods/Foods';
import ProgressFood from './pages/foods/ProgressFood';
import Login from './pages/Login';
import FavoritesRecipes from './pages/myRecipes/FavoritesRecipes';
import MadeRecipes from './pages/myRecipes/MadeRecipes';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route
          exact
          path="/"
          component={ Login }
        />

        <Route
          exact
          path="/comidas"
          render={ (props) => <Foods { ...props } /> }
        />

        <Route
          exact
          path="/bebidas"
          render={ (props) => <Drinks { ...props } /> }
        />

        <Route
          path="/comidas/:id/in-progress"
          component={ ProgressFood }
        />

        <Route
          path="/bebidas/:id/in-progress"
          component={ ProgressDrink }
        />

        <Route
          path="/comidas/:id"
          component={ DetailsFood }
        />

        <Route
          path="/bebidas/:id"
          component={ DetailsDrink }
        />

        <Route
          exact
          path="/explorar"
          component={ Explore }
        />

        <Route
          exact
          path="/explorar/comidas"
          component={ ExploreFoods }
        />

        <Route
          exact
          path="/explorar/bebidas"
          component={ ExploreDrinks }
        />

        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredientsFood }
        />

        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredientsDrink }
        />

        <Route
          path="/explorar/comidas/area"
          component={ ExploreFoodsByArea }
        />

        <Route
          path="/perfil"
          component={ Profile }
        />

        <Route
          path="/receitas-feitas"
          component={ MadeRecipes }
        />

        <Route
          path="/receitas-favoritas"
          render={ (props) => <FavoritesRecipes { ...props } /> }
        />

        <Route
          component={ NotFound }
        />

      </Switch>
    </BrowserRouter>
  );
}
