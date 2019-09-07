import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Categorie from './Categorie';

const RCATEGORIES_QUERY = gql`
    {
        getRestaurantCategories {
            _id
            name
            restaurantCategoryImage
        }
    }
`;

const style = {
    "height": "130px",
    "width": "auto",
    "display": "block"
}

const cardStyle = {
    "maxWidth": "20rem"
}


const Categories = () => {
    return (
        <Fragment>
            <h2 className="text-center mt-4">Categorías</h2>
            <Query query={RCATEGORIES_QUERY}>
                {
                    ({ loading, error, data: { getRestaurantCategories } }) => {
                        if (loading) return (<p>Encontrando categorías...</p>);
                        if (error) return null;
                        //console.log(getRestaurants)   
                        return (
                          <div className="row col-md-12 justify-content-around my-5">
                            {getRestaurantCategories.map(rCategory => (
                              <Categorie
                                key={rCategory._id}
                                rCategory={rCategory}
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


export default Categories
