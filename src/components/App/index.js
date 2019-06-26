import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

import * as ROUTES from '../../constants/routes'
import { ProtectedRoute } from '../Routes'
import Navigation from '../Navigation'

import LandingPage from '../Landing'
import SignupPage from '../Signup'
import SigninPage from '../Signin'
import HomePage from '../Home'
import ForgotPasswordPage from '../PasswordForgot'

const Loading = (props) => (
    <div>Loading...</div>
)

const AppBase = (props) => (
    <Router>
        <div>
            <Navigation />

            <hr />

            <Route exact path={ ROUTES.LANDING }         component={ LandingPage } />
            <Route       path={ ROUTES.SIGN_UP }         component={ SignupPage } />
            <Route       path={ ROUTES.SIGN_IN }         component={ SigninPage } />
            <Route       path={ ROUTES.FORGOT_PASSWORD } component={ ForgotPasswordPage } />
            <ProtectedRoute       path={ ROUTES.HOME }            component={ HomePage } />
            {/* <Route       path={ ROUTES.ACCOUNT }         component={ AccountPage } /> */}
            {/* <Route       path={ ROUTES.ADMIN }           component={ AdminPage } /> */}
        </div>
    </Router>
)

@observer
class App extends Component {
    constructor(props) {
        super(props)

        console.log("App.constructor()")
    }

    componentDidMount() {
        console.log("App.componentDidMount()")

        this.props.store.appLoading = true

        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then((user) => {
                this.props.store.user = user
                console.log("User", user)
            })
            .catch((err) => console.log("Error", err))
            .finally(() => this.props.store.appLoading = false)
    }

    render() {

        const isLoading = this.props.store.appLoading
        
         return isLoading ? <Loading /> : <AppBase />
    }
}

export default withStore(App)