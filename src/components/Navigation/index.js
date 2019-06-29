import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Responsive, Segment, Container, Menu } from 'semantic-ui-react'

import { withStore } from '../../store'
import SignoutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

const Navigation = observer((props) => (
    <Responsive>
        <Segment textAlign='center' vertical>
            <Menu pointing={true} secondary={true} size='large'>
                { props.store.user ? <NavigationAuth {...props} /> : <NavigationNonAuth {...props} /> }
            </Menu>
        </Segment>
    </Responsive>
))

const NavigationAuth = (props) => (
    <Container>
        <Menu.Item active>
            <Link to={ ROUTES.HOME }>Home</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={ ROUTES.ACCOUNT }>Account</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={ ROUTES.ADMIN }>Admin</Link>
        </Menu.Item>
        <Menu.Item position='right'>
            <SignoutButton />
        </Menu.Item>
    </Container>
)

const NavigationNonAuth = (props) => (
    <Container>
        <Menu.Item>
            <Link to={ ROUTES.LANDING }>App</Link>
        </Menu.Item>
        <Menu.Item position='right'>
            <Link to={ ROUTES.SIGN_IN }>Sign In</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={ ROUTES.SIGN_UP }>Sign Up</Link>
        </Menu.Item>
    </Container>
)

export default withStore(Navigation)