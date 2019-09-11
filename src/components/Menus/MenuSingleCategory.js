import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import NoImage from '../../assets/NoImage.png';

const MENUSINGLECAT_QUERY = gql`
   query consultarMenuCategory($mCategoryID : String) {
        getMenuCategory(mCategoryID: $mCategoryID) {
            name
            menuCategoryImage
            menus {
            _id
            name
            price
            description
            menuImage
            restaurantID {
                _id
                name
            }
        }
    }
}
`;

const style = {
    "height": "auto",
    "width": "60rem",
    "display": "block",
    "maxWidth": "100%"
}

const cardStyle = {
    "width": "60rem",
    "maxWidth": "100%",
}

const littleCard = {
    "width": "18rem",
    "maxWidth" : "100%"
}

const littleImg = {
    "height": "15rem",
    "width": "15rem",
    "display": "block",
    "maxWidth": "100%"
}

const MenuSingleCategory = ({ match }) => {
    let mCategoryID = match.params.id

    return (
        <Fragment>
            <Query query={MENUSINGLECAT_QUERY} variables={{ mCategoryID }} >
                {({ loading, error, data: { getMenuCategory } }) => {
                    if (loading) return <p>Encontrando Categoría...</p>;
                    if (error) return `Error ${error}`;
                    return (
                        <div className="row col-md-12 justify-content-around my-4">
                            <h1 className="text-center w-100">{getMenuCategory.name}</h1>
                            <div style={cardStyle} className="card my-4">
                                <div className="card-body">
                                    {getMenuCategory.menuCategoryImage !== null
                                        ?
                                        <img style={style} src={getMenuCategory.menuCategoryImage} alt={getMenuCategory.name} />
                                        :
                                        <img style={style} src={NoImage} alt={getMenuCategory.name} />
                                    }
                                </div>
                                <div className="card-footer">
                                    <h2 className="card-title my-3">Platillos de {getMenuCategory.name}</h2>
                                    <div className="row">
                                    {
                                        getMenuCategory.menus.length === 0
                                        ? <h3>Por el momento no hay platillos disponibles</h3>
                                        : getMenuCategory.menus.map(menu => (
                                            <div key={menu._id} className="card text-white bg-info my-4 mx-2" style={littleCard}>
                                                <div className="card-header">
                                                    <Link className="text-white text-center" to={`/menus/single/${menu._id}`}>
                                                        <h3>{menu.name}</h3>
                                                    </Link>
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">$ {menu.price}</h4>
                                                    <p className="card-text">{menu.description}</p>
                                                </div>
                                                <div className="card-footer">
                                                    {menu.menuImage !== null
                                                        ?
                                                        <img style={littleImg} src={menu.menuImage} alt={menu.name} />
                                                        :
                                                        <img style={littleImg} src={NoImage} alt={menu.name} />
                                                    }
                                                    <Link to={`/menus/single/${menu._id}`} className="btn btn-warning my-2">
                                                        Ordenar
                                                    </Link>
                                                </div>
                                            </div>
                                        ))    
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        </Fragment>
    )
}

MenuSingleCategory.propTypes = {
    match: PropTypes.object.isRequired,
}

export default MenuSingleCategory

/*
    Para poder mostrar el nombre restaurante desde la tarjeta pequeña
    podría importarse la query de Menu.
    Tal como se hizo en el componente para agregar Restaurante
    Habría que intentarlo.
    O si no, dejar el nombre del restaurante en la página single de dicho Menú
    Enlazar en el componente del restaurant Single el del Menú single para que el usuario pueda ir directamente a ellos.
*/