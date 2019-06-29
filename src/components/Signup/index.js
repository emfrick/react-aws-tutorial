import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'
import { compose } from 'recompose'
import { Grid, Header, Form, Message, Button, Segment } from 'semantic-ui-react'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store'
import { SigninLink } from '../Signin';

const SignupPage = observer((props) => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Sign Up
            </Header>
            <Segment>
                { props.store.signup.verificationStep ? <VerificationForm {...props} /> : <SignupForm {...props} /> }
            </Segment>
            <Message>
                <SigninLink />
            </Message>
        </Grid.Column>
    </Grid>
))

@observer
class SignupFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.props.store.error = null
    }

    async onSubmit(evt) {
        const { email, password } = this.props.store.signup

        evt.preventDefault();

        try {
            await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                }
            })
            
            this.props.store.signup.verificationStep = true
            this.props.store.error = null
        }
        catch (err) {
            this.props.store.error = err
        }
    }

    onChange(evt) {
        this.props.store.signup[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password, passwordConfirmation } = this.props.store.signup
        const { error } = this.props.store

        const isInvalid = password !== passwordConfirmation || password === '' || email === '' 

        return (
            <Form size='large' onSubmit={this.onSubmit}>
                <Form.Input fluid name="email"    value={email}    onChange={this.onChange} type="text" placeholder="Email Address" />
                <Form.Input fluid name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                <Form.Input fluid name="passwordConfirmation" value={passwordConfirmation} onChange={this.onChange} type="password" placeholder="Confirm Password" />

                <Button fluid primary type="submit" disabled={isInvalid}>Sign Up</Button>

                { error && <Message negative>{error.message}</Message> }
            </Form>
        )
    }
}

@observer
class VerificationForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.props.store.error = null
    }

    async onSubmit(evt) {
        const { email, password, verificationCode } = this.props.store.signup

        evt.preventDefault()

        try {
            await Auth.confirmSignUp(email, verificationCode)
            await Auth.signIn(email, password)
            const user = await Auth.currentAuthenticatedUser()

            this.props.store.user = user
            this.props.store.reset(this.props.store.signup)
            this.props.history.push(ROUTES.HOME)

            this.props.store.error = null
        }
        catch (err) {
            this.props.store.error = err
        }
    }

    onChange(evt) {
        this.props.store.signup[evt.target.name] = evt.target.value
    }

    render() {
        const { verificationCode } = this.props.store.signup
        const { error } = this.props.store
        const isInvalid = verificationCode === ''

        return (
            <Form fluid size='large' onSubmit={this.onSubmit}>
                <Form.Input fluid name="verificationCode" value={verificationCode} onChange={this.onChange} type="text" placeholder="Verification Code" />
                <Button fluid primary type="submit" disabled={isInvalid}>Verify</Button>
            </Form>
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