import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Container = () => {

    const token = localStorage.getItem('jwt');

    const authLinks = (
      <Fragment>
        <div className="col-md-6 col-sm-12">
          <p className="lead">Mira los restaurantes como si estuvieras ahí!</p>
          <p className="lead">
            <Link to="/restaurants" className="btn btn-primary btn-lg">
              Restaurantes
            </Link>
          </p>
        </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <div className="col-md-6 col-sm-12">
          <p className="lead">Si aún no eres miembro</p>
          <p className="lead">
            <Link to="/register" className="btn btn-primary btn-lg">
              Regístrate
            </Link>
          </p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p className="lead">O si ya estás registrado</p>
          <p className="lead">
            <Link to="/login" className="btn btn-primary btn-lg">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </Fragment>
    );

    return (
        <Fragment>
            <div className="row jumbotron mt-4">
                <h1 className="display-3">Bienvenido a Chubber Eats</h1>
                <p className="lead">Pide tu comida de tus lugares favoritos desde donde te encuentres!</p>
                <hr className="my-4"/>
                {  token ? authLinks : guestLinks  }    
            </div>
        </Fragment>
    )
}

export default Container;
