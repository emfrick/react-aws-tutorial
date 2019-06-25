import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { withStore } from '../../store'
import SignoutButton from '../SignOut'
import * as ROUTES from '../../constants/routes'

const Navigation = observer((props) => (
    <div>
        { console.log("Navigation.render()", props.store.user) }
        { props.store.user ? <NavigationAuth {...props} /> : <NavigationNonAuth {...props} /> }
    </div>
))

const NavigationAuth = (props) => (
    <div>
        <ul>
            <li>
                <Link to={ ROUTES.HOME }>Home</Link>
            </li>
            <li>
                <Link to={ ROUTES.ACCOUNT }>Account</Link>
            </li>
            <li>
                <Link to={ ROUTES.ADMIN }>Admin</Link>
            </li>
            <li>
                <SignoutButton />
            </li>
        </ul>
    </div>
)

const NavigationNonAuth = (props) => (
    <ul>
        <li>
            <Link to={ ROUTES.LANDING }>Landing</Link>
        </li>
        <li>
            <Link to={ ROUTES.SIGN_IN }>Sign In</Link>
        </li>
        <li>
            <Link to={ ROUTES.SIGN_UP }>Sign Up</Link>
        </li>
    </ul>
)

export default withStore(Navigation)