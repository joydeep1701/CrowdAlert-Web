import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {Responsive, Container, Image, ButtonGroup} from 'semantic-ui-react'

import {
  Menu,
  Sidebar,
  Map,
  Sonar
} from '../../components';

// import {database} from '../../utils/firebase'

import Viewevent from '../Viewevent'
import Feed from '../Feed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dimmed: false,      
    }
  }

  toggleVisibility = () => this.setState({
    visible: !this.state.visible
  })

  render() {
    console.log(this.state)
    return (   
    <Sidebar toggleVisibility={this.toggleVisibility} visible={this.state.visible} location={this.props.location}>
      <div style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10
        }}>
        <Menu toggleVisibility={this.toggleVisibility}></Menu>
      </div>
      <Route exact path="/view/:eventid" component={Viewevent}/>
      <Route exact path="/" component={Feed}/>

    </Sidebar>


    )
  }
}

export default App;
