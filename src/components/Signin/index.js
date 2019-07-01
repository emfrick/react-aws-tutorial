import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { observer } from 'mobx-react'
import { Auth } from 'aws-amplify'
import { Grid, Header, Form, Message, Button, Segment } from 'semantic-ui-react'

import { SignupLink } from '../SignUp'
import { PasswordForgotLink } from '../PasswordForgot'
import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const SigninPage = () => (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
                Sign-in
            </Header>
            <Segment>
                <SigninForm />
            </Segment>
            <Message>
                <SignupLink />
            </Message>
            <PasswordForgotLink />
        </Grid.Column>
    </Grid>
)

@observer
class SigninFormBase extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        this.props.store.error = null
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

            this.props.store.error = null
        }
        catch (err) {
            this.props.store.error = err
        }
    }

    onChange(evt) {
        this.props.store.signin[evt.target.name] = evt.target.value
    }

    render() {
        const { email, password } = this.props.store.signin
        const { error } = this.props.store

        const isInvalid = password === '' || email === ''

        return (
            <Form size='large' onSubmit={this.onSubmit}>
                <Form.Input fluid name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <Form.Input fluid name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />

                <Button fluid primary disabled={isInvalid} type="submit">Sign In</Button>

                { error && <Message negative>{error.message}</Message> }
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