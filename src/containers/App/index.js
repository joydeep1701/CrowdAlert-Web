import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {Responsive, Container, Image} from 'semantic-ui-react'
import logo from '../../logo.svg'

import MenuBar from '../../components/Menu'
import LeftSidebar from '../../components/Sidebar'
import MapContainer from '../../components/Map';

import {database} from '../../utils/firebase'

import Viewevent from '../Viewevent'
class App extends Component {
  state = {
    visible: false,
    dimmed: false
  }
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
        events: {
          event
        }
      })
    }, () => {})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log(nextProps, nextState);
  //     return false;
  // }

  toggleVisibility = () => this.setState({
    visible: !this.state.visible
  })

  render() {
    console.log(this.state)
    return (<div>

      <Responsive maxWidth={900}>
        <LeftSidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible} location={this.props.location}>
          <div style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10
            }}>
            <MenuBar toggleVisibility={this.toggleVisibility}></MenuBar>
          </div>
          <Route exact path="/view/:eventid" component={Viewevent}/>
          <Route exact path="/" render={props => (<div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                zIndex: -1
              }}>
              <MapContainer/>
            </div>)}/>

        </LeftSidebar>
      </Responsive>

      <Responsive minWidth={901}>
        <MenuBar toggleVisibility={this.toggleVisibility}></MenuBar>
        <Container>
          <Route exact path="/" render={props => (<div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                zIndex: -1
              }}>
              <MapContainer/>
            </div>)}/>
          <Route exact path="/view/:eventid" component={Viewevent}/>
        </Container>

      </Responsive>

    </div>)
  }
}

export default App;
