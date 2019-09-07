import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Restaurant from './Restaurant';

const RESTAURANTS_QUERY = gql `
    {
        getRestaurants {
            _id
            name
            address
            restaurantImage
            restaurantCategoryID {
                name
            }
        }
    }
`;

const style = {
    "height" : "130px",
    "width" : "auto",
    "display": "block"
}

const cardStyle = {
    "maxWidth": "20rem"
}

const Restaurants = () => {
    return (
        <Fragment>
        <h2 className="text-center mt-4">Restaurants</h2>
            <Query query={RESTAURANTS_QUERY}>

                {
                    ({loading, error, data : { getRestaurants } }) => {
                        if(loading) return (<p>Pidiendo restaurants...</p>);
                        if(error) return null;
                        console.log(getRestaurants)   
                        return (
                          <div className="row col-md-12 justify-content-around my-5">
                            {getRestaurants.map(restaurant => (
                              <Restaurant
                                key={restaurant._id}
                                restaurant={restaurant}
                                propStyle={style}
                                cardStyle={cardStyle}
                              />
                            ))}
                          </div>
                        );

                    }
                }
            
            </Query>
        </Fragment>
    )
}


export default Restaurants
