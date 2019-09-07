import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const RES_QUERY = gql`
   query consultarRestaurante($restaurantID:String) {
        getRestaurant(restaurantID: $restaurantID) {
            name
            address
        }
    }
 
`;

const RestaurantSingle = ({match}) => {

    console.log(match)
    let id = match.params.id
    
    return (
      <Fragment>
            <Query query={RES_QUERY} variables={{ restaurantID : id }} >
          {({ loading, error, data: { getRestaurant } }) => {
            if (loading) return <p>Encontrando Restaurant...</p>;
            if (error) return `Error ${error}`;
            console.log(getRestaurant);
            return (
              <div className="row col-md-12 justify-content-around my-5">
                <h1>{getRestaurant.name}</h1>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
}

RestaurantSingle.propTypes = {

}

export default RestaurantSingle
