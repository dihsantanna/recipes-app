import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExploreFoodsByArea from './pages/Explore/ExploreFoodsByArea';
import ExploreIngredientsDrink from './pages/Explore/ExploreIngredientsDrink';
import ExploreIngredientsFood from './pages/Explore/ExploreIngredientsFood';
import Login from './pages/Login';
import FavoritesRecipes from './pages/MyRecipes/FavoritesRecipes';
import MadeRecipes from './pages/MyRecipes/MadeRecipes';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Drinks from './pages/Recipes/Drinks';
import DetailsDrink from './pages/Recipes/Drinks/DetailsDrink';
import ProgressDrink from './pages/Recipes/Drinks/ProgressDrink';
import Foods from './pages/Recipes/Foods';
import DetailsFood from './pages/Recipes/Foods/DetailsFood';
import ProgressFood from './pages/Recipes/Foods/ProgressFood';

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
          path="*"
          element={ NotFound }
        />

      </Switch>
    </BrowserRouter>
  );
}
