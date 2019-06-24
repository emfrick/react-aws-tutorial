import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

import LandingPage from '../Landing'
import SignupPage from '../Signup'
import HomePage from '../Home'

const Loading = (props) => (
    <div>Loading...</div>
)

const Navigation = (props) => (
    <Router>
        <div>
            <Route path='/'         component={ LandingPage } exact />
            <Route path='/signup'   component={ SignupPage } />
            <Route path='/home'     component={ HomePage } />
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
            .then((user) => console.log("User", user))
            .then(() => this.props.store.appLoading = false)
            .catch((err) => console.log("Error", err))
    }

    render() {
        const { appLoading } = this.props.store

        const comp = appLoading ? <Loading /> : <Navigation />

        return (
            comp
        )
    }
}

export default withStore(App)