import React from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Redirect
} from 'react-router-dom'

const RedirectRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={ props =>
      !localStorage.getItem('isLogged') ? (
        <Component />
      ) : (
        <Redirect
          to={ {
            pathname: '/',
          } }
        />
      )
    }
  />
)

RedirectRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object
}

export default RedirectRoute