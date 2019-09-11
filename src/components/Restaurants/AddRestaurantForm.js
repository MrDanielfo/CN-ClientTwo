import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const RESTAURANT_CATEGORIES = gql`
  {
    getRestaurantCategories {
      _id
      name
    }
  }
`;

const AddRestaurantForm = ({ handleFormSubmit }) => {

    const initialState = {  
        name: '',
        address: '',
        restaurantImage: '',
        restaurantCategoryID: '',
        previewImage: '',
    }

    const [restaurantData, setRestaurantData ] = useState(initialState);

    const { name, address, restaurantImage, restaurantCategoryID, previewImage } = restaurantData;

     const onDrop = (acceptedFiles) => {
       console.log('TCL: SignupForm -> onDrop -> acceptedFiles', acceptedFiles);
       acceptedFiles.forEach(file => {
         const reader = new FileReader();
         reader.onload = () => {
           const binaryString = reader.result;
           console.log('TCL: SignupForm -> reader.onload -> binaryString', binaryString );
           setRestaurantData({...restaurantData, restaurantImage: file , previewImage: binaryString});
         };

         reader.onabort = () => console.log('hubo un error al leer el archivo');
         reader.onerror = () => console.log('hubo un error al leer el archivo');
         reader.readAsDataURL(file);
       });
     };

    const onChange = e =>  setRestaurantData({...restaurantData, [e.target.name]: e.target.value });

    const sendData = (e) => {
        e.preventDefault();
        const nuevoRestaurant = {
            name,
            address,
            restaurantImage,
            restaurantCategoryID
        };
        console.log(nuevoRestaurant);
        handleFormSubmit(nuevoRestaurant);
    }

  return (
    <Fragment>
      <div className="row my-2">
        <h2 className="text-center mt-4">Registra tus datos</h2>

        <div className="col-md-10 mt-2">
          <form onSubmit={sendData}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <Query query={RESTAURANT_CATEGORIES}>
              {({ loading, error, data: { getRestaurantCategories } }) => {
                if (loading) return <p>Pidiendo categorías...</p>;
                if (error) return null;
                return (
                  <div className="form-group">
                    <label>Categoría</label>
                    <select
                      multiple=""
                      className="form-control"
                      name="restaurantCategoryID"
                      value={restaurantCategoryID}
                      onChange={e => onChange(e)}
                    >
                      <option value="">Selecciona una categoría</option>
                      {getRestaurantCategories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }}
            </Query>

            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => {
                return (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="lead my-2">
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                );
              }}
            </Dropzone>

            <img src={previewImage} alt={name} />

            <button className="btn btn-primary" type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

AddRestaurantForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
};

export default AddRestaurantForm;

 