import React, { Component } from 'react';
import { Responsive, Container, Image } from 'semantic-ui-react'
import logo from '../../logo.svg'
import MenuBar from '../../components/Menu'
import LeftSidebar from '../../components/Sidebar'
import { database } from '../../utils/firebase'
import MapContainer from '../../components/Map';
class App extends Component {
    state = { visible: false, dimmed: false }
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            events: {}
        }
    }
    componentDidMount() {
       // console.log(this.state)
        var ref = database.ref('incidents/-L6MqB-dyiY-uFmYF3Ba');
        ref.on("value", snapshot => {
            let event = snapshot.val();
            //console.log(event)
            this.setState({
                ...this.state,
                events: {event}
            })
        }, () => {})
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    
    render() {
        console.log(this.state)
        return (
            <div>

                <Responsive maxWidth={990}>
                    <LeftSidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible}>                           
                                         
                        <div style={{marginLeft:10,marginRight:10, marginTop: 10}}>
                            <MenuBar toggleVisibility={this.toggleVisibility}>
                                <div className='ui left aligned category search item'>
                                    <div className='ui transparent icon input'>
                                        <input className='prompt' type='text' placeholder='Search ...' />
                                        <i className='search link icon' />
                                    </div>
             
                                </div>
                            </MenuBar>
                        </div>
                        
                        <div style={{position:'absolute',width:'100%',height:'100%', top: '0px', zIndex: -1}}>
                            <MapContainer />
 
                        </div>

                                                  
                     </LeftSidebar>
                </Responsive>
                
                <Responsive {...Responsive.onlyComputer}>
                    <MenuBar toggleVisibility={this.toggleVisibility}></MenuBar>
                    <Container>             

                    </Container>
                </Responsive>

            </div>



        )
    }
}

export default App;