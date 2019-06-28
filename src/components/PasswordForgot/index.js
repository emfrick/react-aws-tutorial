import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Auth } from 'aws-amplify'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const PasswordForgotPage = () => (
    <div>
        <h1>Forgot Password</h1>
        <PasswordForgotForm />
    </div>
)

@observer
class PasswordForgotFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeCode = this.onChangeCode.bind(this)
    }

    async onSubmit(evt) {
        const { signin, verificationRequired, verificationCode, error } = this.props.store
        
        evt.preventDefault()

        if (!verificationRequired) {
            try {
                let response = await Auth.forgotPassword(signin.email)
                this.props.store.verificationRequired = true
            }
            catch (err) {
                console.log("Error", err)
                error = err
            }
        }
        else {
            try {
                await Auth.forgotPasswordSubmit(signin.email, verificationCode, signin.password)

                this.props.store.reset(this.props.store.signin)
                this.props.store.verificationCode = ''
                this.props.history.push(ROUTES.SIGN_IN)
            }
            catch (err) {
                console.log("Error", err)
                error = err
            }
        }
    }

    onChange(evt) {
        this.props.store.signin[evt.target.name] = evt.target.value
    }

    onChangeCode(evt) {
        this.props.store[evt.target.name] = evt.target.value
    }

    render() {
        const { signin, verificationRequired, verificationCode, error } = this.props.store
        const isInvalid = signin.email === ''

        return verificationRequired ?
        (
            <form onSubmit={this.onSubmit}>
                <input name="verificationCode" value={verificationCode} onChange={this.onChangeCode} type="text" placeholder="Verification Code" />
                <input name="password" value={signin.password} onChange={this.onChange} type="password" placeholder="New Password" />

                <button disabled={isInvalid} type="submit">Reset Password</button>
            </form>
        ) :
        (
            <form onSubmit={this.onSubmit}>
                <input name="email" value={signin.email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <button disabled={isInvalid} type="submit">Reset Password</button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

const PasswordForgotLink = () => (
    <p>
        <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password?</Link>
    </p>
)

export default PasswordForgotPage

const PasswordForgotForm = compose(
    withRouter,
    withStore,
)(PasswordForgotFormBase)

export { PasswordForgotForm, PasswordForgotLink }