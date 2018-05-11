import React, { Component } from 'react';
import { Responsive, Container, Image } from 'semantic-ui-react'
import logo from '../../logo.svg'
import MenuBar from '../../components/Menu'
import LeftSidebar from '../../components/Sidebar'

class App extends Component {
    state = { visible: false, dimmed: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    render() {

        return (
            <LeftSidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible}>
                <div>
                    <MenuBar toggleVisibility={this.toggleVisibility}></MenuBar>
                    <Container>                
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>

                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>

                        <Image src={logo} size='small'/>
                        <Image src={logo} size='small'/>
                        
                    </Container>
                </div>
            </LeftSidebar>


        )
    }
}

export default App;