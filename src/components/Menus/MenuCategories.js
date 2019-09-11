import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import MenuCategory from './MenuCategory';

const MENUCAT_QUERY = gql`
    {
        getMenuCategories {
            _id
            name
            menuCategoryImage
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


const MenuCategories = () => {
    return (
        <Fragment>
            <h2 className="text-center mt-4">Deliciosos Menús</h2>
            <Query query={MENUCAT_QUERY}>
                {
                    ({ loading, error, data: { getMenuCategories } }) => {
                        if (loading) return (<p>Encontrando categorías...</p>);
                        if (error) return null; 
                        return (
                            <div className="row col-md-12 justify-content-around my-5">
                                {getMenuCategories.map(category => (
                                    <MenuCategory
                                        key={category._id}
                                        category={category}
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


export default MenuCategories;
