import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store'
import { SigninLink } from '../Signin';

const SignupPage = observer((props) => (
    <div>
        <h1>Sign Up</h1>
        { props.store.signup.verificationStep ? <VerificationForm {...props} /> : <SignupForm {...props} /> }
        <SigninLink />
    </div>
))

@observer
class SignupFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { email, password, verificationStep } = this.props.store.signup

        evt.preventDefault();

        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
            }
        })
        .then(() => verificationStep = true)
        .catch(err => console.log(err));
    }

    onChange(evt) {
        this.props.store.signup[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password, passwordConfirmation } = this.props.store.signup

        const isInvalid = password !== passwordConfirmation || password === '' || email === '' 

        return (
            <form onSubmit={this.onSubmit}>
                <input name="email"    value={email}    onChange={this.onChange} type="text" placeholder="Email Address" />
                <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                <input name="passwordConfirmation" value={passwordConfirmation} onChange={this.onChange} type="password" placeholder="Confirm Password" />

                <button type="submit" disabled={isInvalid}>Sign Up</button>
            </form>
        )
    }
}

@observer
class VerificationForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { email, password, verificationCode } = this.props.store.signup

        evt.preventDefault()

        Auth.confirmSignUp(email, verificationCode)
            .then(() => Auth.signIn(email, password))
            .then(() => this.props.store.reset(this.props.store.signup))
            .catch(err => console.log(err))
    }

    onChange(evt) {
        this.props.store.signup[evt.target.name] = evt.target.value
    }

    render() {
        const { verificationCode } = this.props.store.signup
        const isInvalid = verificationCode === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input name="verificationCode" value={verificationCode} onChange={this.onChange} type="text" placeholder="Verification Code" />
                <button type="submit" disabled={isInvalid}>Verify</button>
            </form>
        )
    }
}

const SignupLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

const SignupForm = compose(
    withRouter,
)(SignupFormBase)

export default withStore(SignupPage)

export { SignupForm, SignupLink }