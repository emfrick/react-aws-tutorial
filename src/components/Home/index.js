import React, { Component } from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'
import { Container, Loader, Grid, Header, Form, Message, TextArea, Button, Card } from 'semantic-ui-react'

import { withStore } from '../../store'
import { API } from 'aws-amplify';

const HomePage = observer((props) => (
    <Container>
    <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column>
            { props.store.home.loadingNotes ? <Loader active inline='centered' content='Loading Notes' /> : <NotesList {...props} /> }
            <Header as='h2' color='blue' textAlign='center'>
                New Note
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

        this.postNote = this.postNote.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    async componentDidMount() {

        let path = `/notes/${this.props.store.user.attributes.sub}`
       
        this.props.store.home.loadingNotes = true

        // Test more of a delay
        setTimeout(async () => {
            try {
                let notes = await API.get("NotesService", path)
    
                console.log(notes)
    
                this.props.store.home.notes = notes
            }
            catch (err) {
                console.log("Error getting notes", err)
                this.props.store.error = err
            }
            finally {
                this.props.store.home.loadingNotes = false
            }
        }, 3000);

        
    }

    onChange(evt) {
        evt.preventDefault()

        this.props.store.home.note[evt.target.name] = evt.target.value
    }

    async postNote(evt) {
        
        evt.preventDefault()

        const { note } = this.props.store.home

        let options = {
            body: {
                title: note.title,
                content: note.content,
                date: Date.now(),
                userId: this.props.store.user.attributes.sub,
                noteId: uuid.v1()
            }
        }

        console.log("Posting Note", options)

        try {
            let response = await API.post("NotesService", "/notes", options)

            console.log(response)

            this.props.store.home.notes.push(options.body)
            console.log(this.props.store.home.notes)

            this.props.store.reset(this.props.store.home.note)
        }
        catch (err) {
            console.log("Error creating note", err)
            this.props.store.error = err
        }
        
    }

    render() {
        let { note } = this.props.store.home
        const isInvalid = note.title === '' || note.content === ''

        return (
            <NewNoteForm onSubmit={this.postNote} onChange={this.onChange} model={note} isInvalid={isInvalid} />
        )
    }
}

const NewNoteForm = (props) => (
    <Form onSubmit={props.onSubmit}>
        <Form.Input name="title" value={props.model.title} onChange={props.onChange} placeholder='Title' />
        <TextArea name="content" value={props.model.content} onChange={props.onChange} placeholder='Content' rows={10} />

        <Button fluid primary type="submit" disabled={props.isInvalid}>Create Note</Button>
    </Form>
)

const NotesList = observer((props) => (
    <Card.Group>
        { props.store.home.notes.map((note) => {
            return (
                <Card key={note.noteId}>
                    <Card.Content>
                        <Card.Header>{note.title}</Card.Header>
                        <Card.Meta>{Date(note.date)}</Card.Meta>
                        <Card.Description>{note.content}</Card.Description>
                    </Card.Content>
                </Card>
            )
        })}
    </Card.Group>
))


export default withStore(HomePage)