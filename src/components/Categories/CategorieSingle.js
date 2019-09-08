import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

// Image
import NoImage from '../../assets/NoImage.png';

const RES_QUERY = gql`
   query consultarCategoriaRestaurante($rCategoryID : String) {
        getRestaurantCategory(rCategoryID: $rCategoryID) {
            name
            restaurantCategoryImage
            restaurants {
                _id
                name
                address
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


const CategorieSingle = ({ match }) => {
    let rCategoryID = match.params.id
    return (
        <Fragment>
            <Query query={RES_QUERY} variables={{ rCategoryID }} >
                {({ loading, error, data: { getRestaurantCategory } }) => {
                    if (loading) return <p>Encontrando Categoría...</p>;
                    if (error) return `Error ${error}`;
                    return (
                        <div className="row col-md-12 justify-content-around my-4">
                            <h1 className="text-center w-100">{getRestaurantCategory.name}</h1>
                            <div style={cardStyle} className="card my-4">
                                <div className="card-body">
                                    {getRestaurantCategory.restaurantCategoryImage !== null
                                        ?
                                        <img style={style} src={getRestaurantCategory.restaurantCategoryImage} alt={getRestaurantCategory.name} />
                                        :
                                        <img style={style} src={NoImage} alt={getRestaurantCategory.name} />
                                    }
                                </div>
                                <div className="card-footer">
                                    <h5 className="card-title my-3">Restaurantes con {getRestaurantCategory.name}</h5>
                                    <ul>
                                        {
                                            getRestaurantCategory.restaurants.length === 0
                                                ? <li>Por el momento no hay restaurantes con esta categoría</li>
                                                : getRestaurantCategory.restaurants.map(restaurant => (
                                                    <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
                                                        <li>
                                                            {restaurant.name}
                                                            <span className="text-danger ml-4">{restaurant.address}</span>
                                                        </li>
                                                    </Link>
                                                ))
                                        }
                                    </ul>

                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        </Fragment>
    );
}

CategorieSingle.propTypes = {
    match: PropTypes.object.isRequired
}

export default CategorieSingle
