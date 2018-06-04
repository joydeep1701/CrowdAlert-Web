import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {Responsive, Container, Image} from 'semantic-ui-react'
import logo from '../../logo.svg'

import {
  Menu,
  Sidebar,
  Map,
  Sonar
} from '../../components';

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
      events: {},
      location: null,
    }
  }
  componentDidMount() {
    // console.log(this.state)
    // var ref = database.ref('incidents/-L6MqB-dyiY-uFmYF3Ba');
    // ref.on("value", snapshot => {
    //   let event = snapshot.val();
    //   //console.log(event)
    //   this.setState({
    //     ...this.state,
    //     events: {
    //       event
    //     }
    //   })
    // }, () => {})
    fetch('https://ipinfo.io/json').then(resp => resp.json()).then((resp) => {
      
      this.setState({
        ...this.state,
        location: {
          ...resp,
          lat: parseFloat(resp.loc.split(',')[0]),
          long: parseFloat(resp.loc.split(',')[1]),
        },
        
      })
    })
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
        <Sidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible} location={this.props.location}>
          <div style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10
            }}>
            <Menu toggleVisibility={this.toggleVisibility}></Menu>
          </div>
          <Route exact path="/view/:eventid" component={Viewevent}/>
          <Route exact path="/" render={props => (<div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                zIndex: -1
              }}>
              {
                this.state.location?
                  <Map location={{
                    lat: this.state.location.lat,
                    lng: this.state.location.long,
                  }} zoom={11}>
                      <Sonar lat={22.67} lng={88.36} id={'Event 1'} />
                      <Sonar lat={22.66} lng={88.35} id={'Event 2'} />
                      <Sonar lat={22.65} lng={88.35} id={'Event 3'} />

                  </Map>
                :null
              }
             
            </div>)}/>

        </Sidebar>
      </Responsive>

      <Responsive minWidth={901}>
        <Menu toggleVisibility={this.toggleVisibility}></Menu>
        <Container>
          <Route exact path="/" render={props => (<div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                zIndex: -1
              }}>
              {
                this.state.location?
                  <Map location={{
                    lat: this.state.location.lat,
                    lng: this.state.location.long,
                  }} zoom={11}>
                    <Sonar lat={22.67} lng={88.36} id={'Event 1'} />
                    <Sonar lat={22.66} lng={88.35} id={'Event 2'} />
                    <Sonar lat={22.65} lng={88.34} id={'Event 3'} />
                  </Map>
                :null
              }
            </div>)}/>
          <Route exact path="/view/:eventid" component={Viewevent}/>
        </Container>

      </Responsive>

    </div>)
  }
}

export default App;
