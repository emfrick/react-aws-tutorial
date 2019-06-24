import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

import LandingPage from '../Landing'
import SignupPage from '../Signup';

@observer
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then((user) => console.log(user))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={ LandingPage } />
                    <Route  path='/signup' component={ SignupPage } />
                </div>
            </Router>
        )
    }
}

export default withStore(App)