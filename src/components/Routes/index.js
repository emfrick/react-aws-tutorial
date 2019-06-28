import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store'

const AuthenticatedRoute = withStore(({ component: Component, store, ...rest }) => (
    <Route {...rest} render={(props) => {
        console.log("AuthenticatedRoute")

        return store.user === null
            ? <Redirect to={ROUTES.SIGN_IN} />
            : <Component props={props} {...rest} />
    }} />
))

const AuthorizedRoute = withStore(({ component: Component, store, ...rest }) => (
    <Route {...rest} render={(props) => {
        console.log("AuthorizedRoute")

        const { roles } = {...rest}
        const { user } = store

        if (store.user === null) {
            return <Redirect to={ROUTES.SIGN_IN} />
        }

        return !roles.includes(user.role)
                ? <div>Not Authorized</div>
                :<Component props={props} {...rest} />
    }} />
))

export { AuthenticatedRoute, AuthorizedRoute }