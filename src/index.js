import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx';
import Amplify from 'aws-amplify'

import App from './components/App'
import StoreContext from './store';

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:c0021ddf-e39c-41a7-b03e-bc4151428fd5',
        region: 'us-east-1',
        userPoolId: 'us-east-1_qEjqMr3iq',
        userPoolWebClientId: '2od8fl0e1b1t5iil71q1qn3fj5',
    }
})

const appState = observable({
    tagLine: 'Hello AWS',
    signup: {
        email: '',
        password: '',
        passwordConfirmation: ''
    }
})

ReactDOM.render(
    <StoreContext.Provider value={appState}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
)