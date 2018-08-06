import { ApolloClient } from 'apollo-boost'
import { ApolloLink, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
const GRAPHQL_URI = 'http://localhost:3001/graphql'

const httpLink = new HttpLink({
  uri: GRAPHQL_URI
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }))

  return forward(operation)
})

const errorMiddleware = onError(({ graphQLErrors, networkError }) => {
  // TODO: Implement logout pattern here and handle global errors
  // if (networkError.statusCode === 401) logout();
})

const client = new ApolloClient({
  link: from([authMiddleware, errorMiddleware, httpLink]),
  cache: new InMemoryCache()
})

export default client
