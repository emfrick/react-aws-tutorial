import React from 'react'

const StoreContext = React.createContext(null)

export const withStore = Component => props => (
    <StoreContext.Consumer>
        { store => <Component {...props} store={store} /> }
    </StoreContext.Consumer>
)

export default StoreContext