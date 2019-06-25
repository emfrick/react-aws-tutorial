import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { Auth } from 'aws-amplify'

// import { SignupLink } from '../SignUp'
// import { PasswordForgotLink } from '../PasswordForget'
import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SigninForm />
        {/* <PasswordForgotLink /> */}
        {/* <SignupLink /> */}
    </div>
)

@observer
class SigninFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { email, password } = this.props.store.signin

        evt.preventDefault()

        Auth.signIn(email, password)
            .then(() => {
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.props.store.error = error
            })
    }

    onChange(evt) {
        this.props.store.signin[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password, error } = this.props.store.signin

        const isInvalid = password === '' || email === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />

                <button disabled={isInvalid} type="submit">Sign In</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

const SigninForm = compose(
    withRouter,
    withStore,
)(SigninFormBase)

export default SignInPage

export { SigninForm }