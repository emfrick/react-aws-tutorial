import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

import * as ROUTES from '../../constants/routes'
import Navigation from '../Navigation'

import LandingPage from '../Landing'
import SignupPage from '../Signup'
import SigninPage from '../Signin'
import HomePage from '../Home'

const Loading = (props) => (
    <div>Loading...</div>
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
            .then((user) => console.log("User", user))
            .catch((err) => console.log("Error", err))
            .finally(() => this.props.store.appLoading = false)
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation />

                    <hr />

                    <Route exact path={ ROUTES.LANDING }         component={ LandingPage } />
                    <Route       path={ ROUTES.SIGN_UP }         component={ SignupPage } />
                    <Route       path={ ROUTES.SIGN_IN }         component={ SigninPage } />
                    {/* <Route       path={ ROUTES.FORGOT_PASSWORD } component={ ForgotPasswordPage } /> */}
                    <Route       path={ ROUTES.HOME }            component={ HomePage } />
                    {/* <Route       path={ ROUTES.ACCOUNT }         component={ AccountPage } /> */}
                    {/* <Route       path={ ROUTES.ADMIN }           component={ AdminPage } /> */}
                </div>
            </Router>
        )
    }
}

export default withStore(App)