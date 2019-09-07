import React, { Fragment } from 'react';
import Router from './config/Router';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import client from './apollo';

const LOGGED_USER = gql`
  query {
    loginState @client {
      userLogged
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
