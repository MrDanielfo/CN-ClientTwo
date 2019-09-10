import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import AddRestaurantForm from './AddRestaurantForm';

const ADD_RESTAURANT = gql`
  mutation agregarRestaurante($data: RestaurantInput) {
    addRestaurant(data: $data) {
    _id
    name
    address
    }
  }
`;


class AddRestaurant extends Component {
  state = { 
    name: '',
    address: '',
    restaurantImage: '',
    restaurantCategoryID: ''
  };

  handleMutation = (values, mutation) => {
    this.setState(
      {
        ...values
      },
      () => mutation()
    );
  };

  render() {
    return (
      <div>
        <Mutation mutation={ADD_RESTAURANT} variables={{data: this.state}}>
          {(addRestaurant, { data, error, loading }) => {
            if (data) {
              return <Redirect to="/restaurants" />;
            }
            if (loading) return <p>Enviando datos</p>;

            if (error) {
              console.log(error);
              return <p>Error</p>;
            }

            return (
              <div>
                <AddRestaurantForm
                  handleFormSubmit={values =>
                    this.handleMutation(values, addRestaurant)
                  }
                />
                {error && <p>Error</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}



export default AddRestaurant;