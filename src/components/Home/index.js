import React, { Component } from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'
import { Container, Loader, Grid, Header, Form, Message, TextArea, Button, Card } from 'semantic-ui-react'

import { withStore } from '../../store'

const HomePage = observer((props) => (
    <Container>
    <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column>
            <Header as='h2' color='blue' textAlign='center'>
                {props.store.home.title}
            </Header>
            <HomePageForm {...props} />
            { props.store.error && <Message negative>{props.store.error.message}</Message>}
        </Grid.Column>
    </Grid>
    </Container>
))

@observer
class HomePageForm extends Component {

    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    async componentDidMount() {

        
    }

    onChange(evt) {
        evt.preventDefault()

        this.props.store.home[evt.target.name] = evt.target.value
    }

    render() {
        return (
            <p>Home Page Details</p>
        )
    }
}


export default withStore(HomePage)