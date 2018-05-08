import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import logo from '../../logo.svg'

class App extends Component {
    render() {
        return (
            <Container>
                 <img src={logo} className="App-logo" alt="logo" />
            </Container>
        )
    }
}

export default App;