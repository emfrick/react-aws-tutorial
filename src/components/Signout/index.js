import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import * as ROUTES from '../../constants/routes'

class SignoutButton extends Component {
    constructor(props) {
        super(props)

        this.onSignout = this.onSignout.bind(this)
    }

    onSignout() {
        Auth.signOut()
            .then(() => this.props.history.push(ROUTES.LANDING))
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <button type="button" onClick={this.onSignout}>Sign Out</button>
        )
    }
}

export default withRouter(SignoutButton)