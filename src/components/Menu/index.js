import React, {Component} from 'react';
import { Responsive, Menu } from 'semantic-ui-react';

export default class MenuBar extends Component {
    render() {
        return (
            <Menu size='large'>          

                <Menu.Menu position='left'>
                    <Responsive as={Menu.Item} {...Responsive.onlyMobile}>Mobile</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyComputer}>Computer</Responsive>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Responsive as={Menu.Item} {...Responsive.onlyMobile}>Mobile</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyLargeScreen}>Large Screen</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyWidescreen}>Widescreen</Responsive>
                </Menu.Menu>
            </Menu>
        )
    }
}