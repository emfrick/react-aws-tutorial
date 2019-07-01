import React from 'react'
import ReactDOM from 'react-dom'
import { observable, action } from 'mobx'
import Amplify from 'aws-amplify'

import App from './components/App'
import StoreContext from './store'

import 'semantic-ui-css/semantic.min.css'

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:c0021ddf-e39c-41a7-b03e-bc4151428fd5',
        region: 'us-east-1',
        userPoolId: 'us-east-1_zxOYmAmBN',
        userPoolWebClientId: '6to7beqcsel0d34ln7vgttipba',
    }
})

class AppState {
    @observable appLoading = false
    @observable isLoading = false
    @observable tagLine ='Hello from MobX'
    @observable user = null
    @observable verificationRequired = false
    @observable verificationCode = ''

    @observable signup = {
        email: '',
        password: '',
        passwordConfirmation: '',
        verificationCode: '',
        verificationStep: false
    }

    @observable error = ''

    @observable signin = {
        email: '',
        password: ''
    }

    @action reset = (obj) => {
        Object.keys(obj).forEach((val) => {
            obj[val] = ''
        })
    }

}

ReactDOM.render(
    <StoreContext.Provider value={new AppState()}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
)