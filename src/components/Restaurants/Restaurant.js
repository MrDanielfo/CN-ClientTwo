import React from 'react'
import PropTypes from 'prop-types';
import NoImage from '../../assets/NoImage.png';
import { Link } from 'react-router-dom';

const Restaurant = ({restaurant, cardStyle, propStyle}) => {
    return (
            <div style={cardStyle} className="card text-white bg-dark mb-3" key={restaurant._id}>
                <h3 className="card-header">{restaurant.name}</h3>
                <div className="card-body">
                    <h4 className="card-title">{restaurant.address}</h4>
                    { restaurant.restaurantImage !== null 
                    ?
                    <img style={propStyle} src={restaurant.restaurantImage} alt={restaurant.name} />
                    :
                    <img style={propStyle} src={NoImage} alt={restaurant.name} />
                }
                    <p className="my-1">{restaurant.restaurantCategoryID.name}</p>
                    <Link to={`/restaurants/${restaurant._id}`} className="btn btn-success">
                        Ver más
                    </Link>

                </div>
            </div>
        
    )
}

Restaurant.propTypes = {
    restaurant: PropTypes.object.isRequired
}

export default Restaurant
