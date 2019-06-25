import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { observer } from 'mobx-react'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store'

@observer
class SignoutButton extends Component {
    constructor(props) {
        super(props)

        this.onSignout = this.onSignout.bind(this)
    }

    onSignout() {
        Auth.signOut()
            .then(() => {
                this.props.store.user = null
                this.props.history.push(ROUTES.LANDING)
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <button type="button" onClick={this.onSignout}>Sign Out</button>
        )
    }
}

export default compose(
    withRouter,
    withStore,
)(SignoutButton)