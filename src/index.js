import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx';

import App from './components/App'
import StoreContext from './store';

const appState = observable({
    tagLine: 'Hello AWS'
})

ReactDOM.render(
    <StoreContext.Provider value={appState}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
)