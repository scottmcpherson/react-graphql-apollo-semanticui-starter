import React from 'react'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { ApolloLink, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import thunk from 'redux-thunk'
import routes from './routes'
import reducers from './redux'
import history from './history'
import ScrollToTop from './components/ScrollToTop'
import AuthWrapper from './components/AuthWrapper'
import 'semantic-ui-css/semantic.min.css'

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

const store = createStore(reducers, applyMiddleware(thunk))

const Routes = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <AuthWrapper history={history} client={client}>
              {routes.map((route, index) => {
                const { layout: Layout } = route
                return (
                  <Layout
                    key={index}
                    client={client}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                )
              })}
            </AuthWrapper>
          </ApolloProvider>
        </Provider>
      </ScrollToTop>
    </Router>
  )
}

export default Routes
