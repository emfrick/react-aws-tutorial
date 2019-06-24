import React from 'react'
import ReactDOM from 'react-dom'
import { observable, action } from 'mobx'
import Amplify from 'aws-amplify'

import App from './components/App'
import StoreContext from './store'

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
    @observable tagLine ='Hello from MobX'
    @observable user = null
    @observable signup = {
        email: '',
        password: '',
        passwordConfirmation: '',
        verificationCode: '',
        verificationStep: ''
    }

    @action resetSignup = () => {
        Object.keys(this.signup).forEach((val) => {
            this.signup[val] = ''
        })
    }

}

ReactDOM.render(
    <StoreContext.Provider value={new AppState()}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
)