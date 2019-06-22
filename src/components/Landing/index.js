import React from 'react'
import { Auth } from 'aws-amplify'

import { observer } from 'mobx-react'
import { withStore } from '../../store';

Auth.currentSession()
    .then(user => console.log("Session", user))
    .catch(err => console.log("Session error", err))

Auth.currentCredentials()
    .then(user => console.log("Creds", user))
    .catch(err => console.log("Creds error", err))

Auth.currentAuthenticatedUser()
    .then(user => console.log("User", user))
    .catch(err => console.log("User error", err))

const LandingPage = observer((props) => (
    <h1>{props.store.tagLine}</h1>
))

export default withStore(LandingPage)