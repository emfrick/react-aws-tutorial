import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '../Landing'
import SignupPage from '../Signup';

const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={ LandingPage } />
            <Route  path='/signup' component={ SignupPage } />
        </div>
    </Router>
)

export default App