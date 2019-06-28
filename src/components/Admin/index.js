import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { withStore } from '../../store'

@observer
class AdminPage extends Component {

    constructor(props) {
        super(props)

        console.log("AdminPage.constructor()")
    }

    componentDidMount() {
        console.log("AdminPage.componentDidMount()")
    }

    render() {
        return (
            <div>
                <h1>Admin Page</h1>
                <p>Only available to administrators.</p>
            </div>
        )
    }
}


export default withStore(AdminPage)