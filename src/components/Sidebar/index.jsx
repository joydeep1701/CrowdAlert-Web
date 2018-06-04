import React from 'react';
import {
  Sidebar,
  Segment,
  Menu,
  Icon,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './styles';

const LeftSidebar = props => (
  <div style={styles.fitContainer}>
    <Sidebar.Pushable
      as={Segment}
      style={styles.darkBackground}
    >
      <Sidebar
        as={Menu}
        animation="overlay"
        width="wide"
        visible={props.visible}
        icon="labeled"
        vertical="vertical"
        style={styles.sidebar}
      >
        <Menu.Item name="logo">
          <Image src={logo} size="small" bordered="bordered" centered="centered" />

        </Menu.Item>
        <Link
          to="/"
          onClick={props.visible
                    ? props.toggleVisibility
                    : null}
        >
          <Menu.Item name="home">
            <Icon name="home" />
                        Home
          </Menu.Item>
        </Link>
        <Menu.Item name="camera">
          <Icon name="camera" />
                    Report
        </Menu.Item>
        <Menu.Item name="user">
          <Icon name="user circle" />
                    Profile
        </Menu.Item>

        <Link
          to="/view/-L6MrTH7NgTawjN-LOsd"
          onClick={props.visible
                    ? props.toggleVisibility
                    : null}
        >
          <Menu.Item name="user">
            <Icon name="browser" />
                        Sample Incident
          </Menu.Item>
        </Link>

        <Menu.Item name="logout">
          <Icon name="sign out" />
                    Sign out
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={props.visible}
        onClick={props.visible
                ? props.toggleVisibility
                : null}
        style={styles.darkBackground}
      >
        {props.children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);
export default LeftSidebar;
