import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { Auth } from 'aws-amplify'
import { Form, Input, Button } from 'semantic-ui-react'

import { SignupLink } from '../SignUp'
import { PasswordForgotLink } from '../PasswordForgot'
import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const SigninPage = () => (
    <div>
        <h1>Sign In</h1>
        <SigninForm />
        <PasswordForgotLink />
        <SignupLink />
    </div>
)

@observer
class SigninFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    async onSubmit(evt) {
        const { email, password } = this.props.store.signin

        evt.preventDefault()

        try {
            await Auth.signIn(email, password)
            const user = await Auth.currentAuthenticatedUser()

            this.props.store.user = user
            this.props.store.reset(this.props.store.signin)
            this.props.history.push(ROUTES.HOME)
        }
        catch (err) {
            this.props.store.error = err
        }
    }

    onChange(evt) {
        this.props.store.signin[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password, error } = this.props.store.signin

        const isInvalid = password === '' || email === ''

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <Input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                </Form.Field>

                <Button primary disabled={isInvalid} type="submit">Sign In</Button>

                { error && <p>{error.message}</p> }
            </Form>
        )
    }
}

const SigninLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
)

const SigninForm = compose(
    withRouter,
    withStore,
)(SigninFormBase)

export default SigninPage

export { SigninForm, SigninLink }