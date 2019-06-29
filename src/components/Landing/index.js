import React from 'react'
import { observer } from 'mobx-react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import { withStore } from '../../store';

const LandingPage = observer((props) => (
    <Container text>
        <Header as='h1' content='Welcome to React/AWS'
        style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
        }}
        textAlign='center'
        />
        <Header as='h3' textAlign='center'>
            <Link to={ROUTES.SIGN_IN}>Sign in to get started</Link>
        </Header>
    </Container>
))

export default withStore(LandingPage)