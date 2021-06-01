import React from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props =>
      localStorage.getItem('isLogged') ? (
        <Component  />
      ) : (
        <Redirect
          to={ {
            pathname: '/entrar',
          } }
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object
}

export default PrivateRoute