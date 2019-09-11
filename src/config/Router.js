import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Container from '../components/Layout/Container';

import NavBar from '../components/Layout/NavBar';
import Logout from '../components/Logout/Logout';

import Restaurants from '../components/Restaurants/Restaurants';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Categories from '../components/Categories/Categories';
import RestaurantSingle from '../components/Restaurants/RestaurantSingle';
import CategorieSingle from '../components/Categories/CategorieSingle';
import AddRestaurant from '../components/Restaurants/AddRestaurant';
import MenuCategories from '../components/Menus/MenuCategories';
import MenuSingleCategory from '../components/Menus/MenuSingleCategory';

const PublicRoute = ({ component : Component, ...rest }) => ( 
    <Route {...rest} render={ props => <Component {...props} /> } />
);


const PrivateRoute = ({ component: Component, ...rest }) => { 
  return <Route {...rest} render={ (props) => !rest.userLogged  ?  (<Redirect to="/" />) : (<Component {...props} />) } />
};

const Routing = ({ userLogged , handleLoggin }) => {
    //console.log(userLogged)
    return (
      <Router>
        <Fragment>
          <PublicRoute
            component={() => <NavBar userLogged={userLogged} />}
          />
          
          <div className="container">
            <Switch>
              <PublicRoute exact path="/" component={() => <Container userLogged={userLogged}  />} />
              <PublicRoute
                exact
                path="/login"
                userLogged={userLogged}
                component={() => <Login handleLoggin={handleLoggin} />}
              />
              <PublicRoute
                exact
                path="/register"
                userLogged={userLogged}
                component={() => <Register handleLoggin={handleLoggin} />}
              />

              <PrivateRoute
                exact
                path="/restaurants"
                userLogged={userLogged}
                handle
                component={() => <Restaurants handleLoggin={handleLoggin} />}
              />

              <PrivateRoute
                exact
                path="/restaurants/:id"
                userLogged={userLogged}
                component={RestaurantSingle}
              />

              <PrivateRoute
                exact
                path="/categories"
                userLogged={userLogged}
                handle
                component={() => <Categories handleLoggin={handleLoggin} />}
              />

              <PrivateRoute
                exact
                path="/categories/:id"
                userLogged={userLogged}
                component={CategorieSingle}
              />

              <PrivateRoute
                exact
                path="/add-restaurant"
                userLogged={userLogged}
                component={AddRestaurant}
              />

              <PrivateRoute
                exact
                path="/menus"
                userLogged={userLogged}
                handle
                component={() => <MenuCategories handleLoggin={handleLoggin} />}
              />

              <PrivateRoute
                exact
                path="/menus/:id"
                userLogged={userLogged}
                component={MenuSingleCategory}
              />

              <PrivateRoute
                exact
                path="/logout"
                userLogged={true}
                component={() => <Logout handleLoggin={handleLoggin} />}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );

}

export default Routing;

// <PublicRoute component={() => <Error404 />} />;

// <PrivateRoute
//   exact
//   path="/restaurants/:id"
//   userLogged={userLogged}
//   component={Restaurant}
// />;