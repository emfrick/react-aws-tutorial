import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store'

const ProtectedRoute = withStore(({ component: Component, store, ...rest }) => (
    <Route {...rest} render={(props) => {
            console.log("ProtectedRoute", store.user === null)

            return store.user === null
                    ? <Redirect to={ROUTES.SIGN_IN} />
                    : <Component props={props} {...rest} />
        }}
    />
))

export { ProtectedRoute }