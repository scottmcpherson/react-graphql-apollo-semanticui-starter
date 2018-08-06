import React from 'react'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import thunk from 'redux-thunk'
import routes from './routes'
import reducers from './redux'
import history from './history'
import ScrollToTop from './components/ScrollToTop'
import AuthWrapper from './components/AuthWrapper'
import client from './utils/client'
import 'semantic-ui-css/semantic.min.css'

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
                    checkAuth={route.checkAuth}
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
