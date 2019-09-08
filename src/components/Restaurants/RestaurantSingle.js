import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

// Image
import NoImage from '../../assets/NoImage.png';

const RES_QUERY = gql`
   query consultarRestaurante($restaurantID:String) {
        getRestaurant(restaurantID: $restaurantID) {
            name
            address
            restaurantImage
            restaurantCategoryID {
                _id
                name
            }
            menus {
                _id
                name
            }
        }
    }
`;

const style = {
  "height": "auto",
  "width": "60rem",
  "display": "block",
  "maxWidth" : "100%"
}

const cardStyle = {
  "width": "60rem",
  "maxWidth": "100%",
}

const RestaurantSingle = ({match}) => {

    let id = match.params.id
    return (
      <Fragment>
            <Query query={RES_QUERY} variables={{ restaurantID : id }} >
              {({ loading, error, data: { getRestaurant } }) => {
                if (loading) return <p>Encontrando Restaurant...</p>;
                if (error) return `Error ${error}`;
                console.log(getRestaurant)
                return (
                  <div className="row col-md-12 justify-content-around my-4">
                    <h1 className="text-center w-100">{getRestaurant.name}</h1>
                    <div style={cardStyle} className="card my-4">
                      <div className="card-body">
                        <h5 className="card-title mb-2">{getRestaurant.address}</h5>
                        <Link to={`/categories/${getRestaurant.restaurantCategoryID._id}`}>
                          <h6 className="card-subtitle text-muted mt-2">{getRestaurant.restaurantCategoryID.name}</h6>
                        </Link>
                      </div>
                      {getRestaurant.restaurantImage !== null
                        ?
                        <img style={style} src={getRestaurant.restaurantImage} alt={getRestaurant.name} />
                        :
                        <img style={style} src={NoImage} alt={getRestaurant.name} />
                      }
                      <div className="card-footer">
                        <h5 className="card-title my-3">Menús de {getRestaurant.name}</h5>
                        <ul>
                          {
                            getRestaurant.menus.length === 0 
                            ?  <li>Por el momento no hay menús disponibles</li>
                            : getRestaurant.menus.map(menus => (
                              <li key={menus._id}>{menus.name}</li>
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

RestaurantSingle.propTypes = {
  match: PropTypes.object.isRequired
}

export default RestaurantSingle
