import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Grid, Header, Form, Container, Button } from 'semantic-ui-react'

import { withStore } from '../../store'

const HomePage = observer((props) => (
    <Container>
    <Grid columns={1} textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column>
            <Header as='h2' color='blue' textAlign='center'>
                Document Upload
            </Header>
            <HomePageForm {...props} />
        </Grid.Column>
    </Grid>
    </Container>
))

@observer
class HomePageForm extends Component {

    constructor(props) {
        super(props)

        console.log("HomePage.constructor()")

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        console.log("HomePage.componentDidMount()")
    }

    onSubmit(evt) {
        evt.preventDefault()

        console.log(this.props.store.home.file)
    }

    onChange(evt) {
        this.props.store.home[evt.target.name] = evt.target.value
    }

    render() {
        const { file } = this.props.store.home
        const isInvalid = file === ''

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Input fluid name="file" value={file} onChange={this.onChange} type="file" placeholder="Document" />

                <Button primary type="submit" disabled={isInvalid}>Upload</Button>
            </Form>
        )
    }
}


export default withStore(HomePage)