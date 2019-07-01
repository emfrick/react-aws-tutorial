import React, { Component } from 'react'
import { Grid, Header, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { Auth } from 'aws-amplify'

import { withStore } from '../../store'
import * as ROUTES from '../../constants/routes'

const AccountPage = observer((props) => (
    <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue'>
                Actions
            </Header>
            <AccountForm {...props} />
        </Grid.Column>
    </Grid>
))

@observer
class AccountForm extends Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    async onClick() {
        console.log("Removing")
        this.props.store.isLoading = true
        
        try {
            let user = await Auth.currentAuthenticatedUser()

            user.deleteUser(err => {
                if (err) {
                    this.props.store.error = err
                    return
                }

                this.props.history.push(ROUTES.LANDING)
            })

        }
        catch (err) {
            console.log(err)
            this.props.store.error = err
        }
        finally {
            this.props.store.isLoading = false
        }

        
    }

    render() {
        return (
            <Button color="red" onClick={this.onClick} loading={this.props.store.isLoading}>Delete Account</Button>
        )
    }
}

export default withStore(AccountPage)