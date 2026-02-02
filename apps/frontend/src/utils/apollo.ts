import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: '/graphql',
  credentials: 'include',
});

const errorHandler = onError(({ graphQLErrors }) => {
  console.log(graphQLErrors);
  //if (graphQLErrors)
  // useErrorStore().$state = {
  //   message: graphQLErrors[0].message,
  //   category: graphQLErrors[0].extensions.category,
  //   fields: graphQLErrors[0].extensions.validation ?? { input: {} },
  // };
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token'),
    },
  };
});

// Cache implementation - REMOVE addTypename option
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(errorHandler.concat(httpLink)),
  cache: cache, // Sử dụng cache đã tạo
});

export default apolloClient;
