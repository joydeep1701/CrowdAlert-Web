import React from 'react';
import { Responsive, Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import logo from '../../logo.png';

const MenuBar = props => (
  <Menu size="small" inverted>
    <Menu.Menu position="left">
      <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
        <Icon name="content" onClick={props.toggleVisibility} />
      </Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyComputer}>
        <Image
          src={logo}
          style={{
          height: '4vh',
        }}
        />

        <Link to="/">
          <Menu.Item>
            <Icon name="browser" />
            Feed
          </Menu.Item>
        </Link>
        <Link to="/view/-L6MrTH7NgTawjN-LOsd">
          <Menu.Item>
            <Icon name="browser" />
            Sample Incident
          </Menu.Item>
        </Link>
        {/* <Menu.Item /> */}

      </Responsive>
    </Menu.Menu>
    <div className="ui transparent icon input">
      <input className="prompt" type="text" placeholder="Search ..." />
    </div>
    <Menu.Menu position="right">
      <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
        <Icon name="search" />
      </Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyLargeScreen}>Large Screen</Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyWidescreen}>Widescreen</Responsive>
    </Menu.Menu>
  </Menu>
);

Menu.propTypes = {
  toggleVisibility: propTypes.func.isRequired,
};

export default MenuBar;
