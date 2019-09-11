import React, { Fragment } from 'react';
import Router from './config/Router';
import { Query, Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import client from './apollo';
import { NotificationContainer, NotificationManager } from 'react-notifications';


const LOGGED_USER = gql`
  query {
    loginState @client {
      userLogged
    }
  }
`;

const RESTAURANT_ADDED = gql`
subscription {
  restaurantAdded {
    name
    address
  }
}
`;

function App() {

  const handleLoggin = (usuarioLoggeado = true) => {
    client.mutate({
      mutation: gql`
        mutation setUserLogged($logged: Boolean) {
          setUserLogged(logged: $logged) @client {
            data
          }
        }
      `,
      variables: { logged: usuarioLoggeado }
    });
  };


  return (
    <Fragment>

      <Subscription subscription={RESTAURANT_ADDED}>
        {
          ({ data }) => {
            if (data) NotificationManager.success('Success message', data.restaurantAdded.name);
            return <NotificationContainer />;
          }
        }
      </Subscription>
      
      <Query query={LOGGED_USER}>
        {({ data: { loginState } }) => {
          return (
            <Router
              userLogged={loginState.userLogged}
              handleLoggin={handleLoggin}
            />
          );
        }}
      </Query>
    </Fragment>
  );
}

export default App;

       