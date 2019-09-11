import React from 'react'
import PropTypes from 'prop-types';
import NoImage from '../../assets/NoImage.png';
import { Link } from 'react-router-dom'

const MenuCategory = ({ category, propStyle, cardStyle }) => {
    return (
        <div style={cardStyle} className="card text-white bg-dark mb-3">
            <h3 className="card-header">{category.name}</h3>
            <div className="card-body">
                {category.menuCategoryImage !== null
                    ?
                    <img style={propStyle} src={category.menuCategoryImage} alt={category.name} />
                    :
                    <img style={propStyle} src={NoImage} alt={category.name} />
                }
            </div>
            <div className="card-footer">
                <Link to={`/menus/${category._id}`} className="btn btn-danger my-2">
                    Ver todos los menús de esta categoría
                </Link>
            </div>
        </div>
    )
}

MenuCategory.propTypes = {
    category: PropTypes.object.isRequired
}

export default MenuCategory;
