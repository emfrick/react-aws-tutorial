import React from 'react'

import { observer } from 'mobx-react'
import { withStore } from '../../store';

const LandingPage = observer((props) => (
    <h1>{props.store.tagLine}</h1>
))

export default withStore(LandingPage)