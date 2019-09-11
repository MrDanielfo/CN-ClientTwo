import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import defaults from './defaults';
import resolvers from './resolvers';


const HTTP_HOST = 'http://localhost:4000/graphql';
const WSS_HOST = 'ws://localhost:4000/graphql';


const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
  resolvers
});

const httpLink = new createUploadLink({
    uri: HTTP_HOST,
});

const wssLink = new WebSocketLink({
    uri: WSS_HOST,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wssLink,
    httpLink
)

const AuthLink = (operation, next) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        operation.setContext(context => ({
            ...context,
            headers: {
                ...context.headers,
                Authorization: token,
            },
        }));
    }
    return next(operation);
};


const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path, extensions }) => {
                    if (extensions.code === 'UNAUTHENTICATED') {
                        localStorage.removeItem('jwt');
                        client.resetStore()
                    }
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
                    return message;
                });
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }
            }
        }),
        stateLink,
        AuthLink,
        link
    ]),
    cache,
});

export default client;