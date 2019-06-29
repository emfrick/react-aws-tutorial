import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import { AuthenticatedRoute, AuthorizedRoute } from '../Routes'
import Navigation from '../Navigation'

import LandingPage from '../Landing'
import SignupPage from '../Signup'
import SigninPage from '../Signin'
import HomePage from '../Home'
import ForgotPasswordPage from '../PasswordForgot'
import AdminPage from '../Admin'

const Loading = (props) => (
    <div>Loading...</div>
)

const AppBase = (props) => (
    <Router>
        <div>
            <Navigation />

            <Route exact        path={ ROUTES.LANDING }         component={ LandingPage }                           />
            <Route              path={ ROUTES.SIGN_UP }         component={ SignupPage }                            />
            <Route              path={ ROUTES.SIGN_IN }         component={ SigninPage }                            />
            <Route              path={ ROUTES.FORGOT_PASSWORD } component={ ForgotPasswordPage }                    />
            <AuthenticatedRoute path={ ROUTES.HOME }            component={ HomePage }                              />
            <AuthorizedRoute    path={ ROUTES.ADMIN }           component={ AdminPage }     roles={[ROLES.ADMIN]}   />
        </div>
    </Router>
)

@observer
class App extends Component {
    constructor(props) {
        super(props)

        console.log("App.constructor()")

        this.props.store.appLoading = true
    }

    async componentDidMount() {
        console.log("App.componentDidMount()")

        try {
            let user = await Auth.currentAuthenticatedUser({ bypassCache: true })
            this.props.store.user = user

            console.log("User", user)
        }
        catch (err) {
            console.log("Error", err)
        }
        finally {
            this.props.store.appLoading = false
        }
    }

    render() {

        const isLoading = this.props.store.appLoading
        
         return isLoading ? <Loading /> : <AppBase />
    }
}

export default withStore(App)