import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({userLogged}) => {

    

    const logged = userLogged

    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <Link to="/restaurants" className="nav-link">
            Restaurants
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/categories" className="nav-link">
            Categorías
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-restaurant" className="nav-link">
            Agregar Restaurant
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/menus" className="nav-link">
            Menús
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            Cerrar Sesión
          </Link>
        </li>
      </Fragment>
    );
    
    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Iniciar Sesión
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Registrarse
          </Link>
        </li>
      </Fragment>
    );
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">
                Ubear Eats Clone App
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    { logged ? authLinks : guestLinks }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
