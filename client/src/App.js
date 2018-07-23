import React from 'react'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import thunk from 'redux-thunk'
import routes from './routes'
import reducers from './redux'
import history from './history'
import ScrollToTop from './components/ScrollToTop'
import AuthWrapper from './components/AuthWrapper'
import 'semantic-ui-css/semantic.min.css'

const GRAPHQL_URI = 'http://localhost:3001/graphql'

const httpLink = createHttpLink({
  uri: GRAPHQL_URI
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // Return the headers to the context so httpLink
  // can read them and include the jwt token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
