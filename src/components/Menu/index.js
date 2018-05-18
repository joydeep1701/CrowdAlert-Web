import React, {Component} from 'react';
import { Responsive, Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg'

export default class MenuBar extends Component {
    render() {
        return (
            <Menu size='small'>         

                <Menu.Menu position='left'>
                    <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
                       <Icon name='content' onClick={this.props.toggleVisibility}></Icon>
                    </Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyComputer}>

                            <Image src={logo} style={{height:'4vh'}}/>
 
                        <Link to="/">
                            <Menu.Item>
                                <Icon name='browser' />
                                    Feed
                            </Menu.Item>                        
                        </Link>
                        <Link to="/view/-L6MrTH7NgTawjN-LOsd">
                            <Menu.Item>
                            <Icon name='browser' />
                                    Sample Incident
                            </Menu.Item>                              
                        </Link>
                        <Menu.Item></Menu.Item>

                    </Responsive>
                </Menu.Menu>
                <div className='ui transparent icon input'>
                    <input className='prompt' type='text' placeholder='Search ...' />
                </div>
                <Menu.Menu position='right'>
                    <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
                        <Icon name='search'/>
                    </Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyTablet}>Tablet</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyLargeScreen}>Large Screen</Responsive>
                    <Responsive as={Menu.Item} {...Responsive.onlyWidescreen}>Widescreen</Responsive>
                </Menu.Menu>
            </Menu>
        )
    }
}