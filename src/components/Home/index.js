import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { withStore } from '../../store'
import SignoutButton from '../Signout'

@observer
class HomePage extends Component {

    constructor(props) {
        super(props)

        console.log("HomePage.constructor()")
    }

    componentDidMount() {
        console.log("HomePage.componentDidMount()")
    }

    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <p>Only available to signed in users.</p>
                <SignoutButton />
            </div>
        )
    }
}


export default withStore(HomePage)