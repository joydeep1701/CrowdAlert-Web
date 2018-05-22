import React, {Component} from 'react';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Icon,
  Container,
  Image
} from 'semantic-ui-react'
import logo from '../../logo.svg'
import {Link} from 'react-router-dom';

export default class LeftSidebar extends Component {
  render() {
    return (<div style={{
        height: '100vh'
      }}>
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='overlay' width='wide' visible={this.props.visible} icon='labeled' vertical="vertical" style={{
            width: '75%'
          }}>
          <Menu.Item name='logo'>
            <Image src={logo} size='small' bordered="bordered" centered="centered"/>

          </Menu.Item>
          <Link to="/" onClick={this.props.visible
              ? this.props.toggleVisibility
              : null}>
            <Menu.Item name='home'>
              <Icon name='home'/>
              Home
            </Menu.Item>
          </Link>
          <Menu.Item name='camera'>
            <Icon name='camera'/>
            Report
          </Menu.Item>
          <Menu.Item name='user'>
            <Icon name='user circle'/>
            Profile
          </Menu.Item>

          <Link to="/view/-L6MrTH7NgTawjN-LOsd" onClick={this.props.visible
              ? this.props.toggleVisibility
              : null}>
            <Menu.Item name='user'>
              <Icon name='browser'/>
              Sample Incident
            </Menu.Item>
          </Link>

          <Menu.Item name='logout'>
            <Icon name='sign out'/>
            Sign out
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={this.props.visible} onClick={this.props.visible
            ? this.props.toggleVisibility
            : null}>
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>)
  }
}
