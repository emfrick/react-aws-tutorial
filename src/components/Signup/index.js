import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

const SignupPage = (props) => (
    <div>
        <h1>Sign Up</h1>
        <SignupForm {...props} />
    </div>
)

@observer
class SignupForm extends Component {
    constructor(props) {
        super(props)

        console.log("SignupForm constructor", this.props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(evt) {
        const { email, password } = this.props.store.signup

        evt.preventDefault();

        console.log("Signing up with ", email, password)
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

export default withStore(SignupPage)