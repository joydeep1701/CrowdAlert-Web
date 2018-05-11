import React, { Component } from 'react';
import { Responsive, Container, Image } from 'semantic-ui-react'
import logo from '../../logo.svg'
import MenuBar from '../../components/Menu'

class App extends Component {
    render() {
        return (
            <div>
                <MenuBar></MenuBar>
                <Container>                
                    <Image src={logo} size='small'/>
                    {console.log({...Responsive})}
                </Container>
            </div>

        )
    }
}

export default App;