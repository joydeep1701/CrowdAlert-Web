import React, { Component } from 'react';
import { Responsive, Container, Image } from 'semantic-ui-react'
import logo from '../../logo.svg'
import MenuBar from '../../components/Menu'
import LeftSidebar from '../../components/Sidebar'
import { database } from '../../utils/firebase'
import MapContainer from '../../components/Map';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Viewevent from '../Viewevent'
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
            <Router>            
                <div>                    
                    <Responsive maxWidth={900}>
                    
                        <LeftSidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible}> 
                            <div style={{marginLeft:10,marginRight:10, marginTop: 10}}>
                                <MenuBar toggleVisibility={this.toggleVisibility}>            
                                </MenuBar>
                            </div>

                            <Route exact path="/" render={props => (
                                <div>

                                    <div style={{position:'absolute',width:'100%',height:'100%', top: '0px', zIndex: -1}}>
                                        <MapContainer />    
                                    </div>
                                </div>

                            )} />     
                            <Route exact path="/view/:eventid" component={Viewevent}/>      
                
                        </LeftSidebar>
                    </Responsive>
                    
                    <Responsive minWidth={901}>
                        <MenuBar toggleVisibility={this.toggleVisibility}></MenuBar>
                           
                            <Route exact path="/view/:eventid" component={Viewevent}/>
                            <Route exact path="/" render={props => (
                                <div>
                                    <div style={{position:'absolute',width:'100%',height:'100%', top: '0px',left:'0px', zIndex: -1}}>
                                        <MapContainer />    
                                    </div>
                                </div>
                        )} />
                        
                        
                    </Responsive>

                </div>
            </Router>


        )
    }
}

export default App;