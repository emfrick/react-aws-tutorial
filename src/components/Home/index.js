import React, { Component } from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'
import { Grid, Header, Form, Message, TextArea, Button } from 'semantic-ui-react'

import { withStore } from '../../store'
import { API, Auth } from 'aws-amplify';

const HomePage = observer((props) => (
    <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
                Post Note
            </Header>
            <HomePageForm {...props} />
            { props.store.error && <Message negative>{props.store.error.message}</Message>}
        </Grid.Column>
    </Grid>
))

@observer
class HomePageForm extends Component {

    constructor(props) {
        super(props)

        this.postNote = this.postNote.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    async componentDidMount() {

        let path = `/notes/${this.props.store.user.attributes.sub}`
       
        try {
            let notes = await API.get("NotesService", path)

            console.log(notes)

            this.props.store.home.notes = notes
        }
        catch (err) {
            console.log("Error getting notes", err)
            this.props.store.error = err
        }
    }

    onChange(evt) {
        evt.preventDefault()

        this.props.store.home.note.content = evt.target.value
    }

    async postNote(evt) {
        
        evt.preventDefault()

        const { content } = this.props.store.home.note

        let options = {
            body: {
                content: content,
                userId: this.props.store.user.attributes.sub,
                noteId: uuid.v1()
            }
        }

        console.log("Posting Note", options)

        try {
            let response = await API.post("NotesService", "/notes", options)

            console.log(response)

            this.props.store.home.notes.push(options.body)
        }
        catch (err) {
            console.log("Error creating note", err)
            this.props.store.error = err
        }
        
    }

    render() {

        let list = this.props.store.home.notes.map((note, idx) => {
            return <li key={note.noteId}>{idx}: {note.content}</li>
        })

        return (
            <div>
                <ul>
                    {list}
                </ul>
                <Form onSubmit={this.postNote}>
                    <TextArea rows={10} placeholder='Note Content' onChange={this.onChange} value={this.props.store.home.note.content} />
                    <Button primary>Create Note</Button>
                </Form>
            </div>
        )
    }
}


export default withStore(HomePage)