import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const REGISTER = gql`
  mutation addUser($name: String!, $lastName: String!, $email: String!, $password: String!, $gender: Gender) {
      addUser(data: {
        name: $name
        lastName: $lastName
        email: $email
        password: $password
        gender: $gender
      }) {
          token
      }
  }
`;

class Register extends Component {

    state = {
        name : '',
        lastName: '',
        email: '',
        password: '',
        gender: ''
    }

    handleSubmit = (values, mutation) => {
        this.setState({
            ...values
        }, () => mutation())
    }

    setToken = ({ token }) => {
        this.props.handleLoggin();
        if (token) {
            localStorage.setItem("jwt", token);
        }
    }

    render() {
        return (
            <div>
                <Mutation mutation={REGISTER} variables={this.state}>
                    {
                        (addUser, { data, error, loading }) => {
                            if (data) {
                                this.setToken(data.addUser);
                                return <Redirect to="/" />
                            }
                            if (loading) return <p>haciendo login..</p>

                            return (
                                <div>
                                    <RegisterForm
                                        handleSubmit={(values) => this.handleSubmit(values, addUser)}
                                    />
                                    {
                                        error && <p>Error</p>
                                    }
                                </div>
                            );

                        }
                    }
                </Mutation>
            </div>
        )

    }

}


export default Register; 
