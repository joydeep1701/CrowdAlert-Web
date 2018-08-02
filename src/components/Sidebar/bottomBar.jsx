import React from 'react';
import { Responsive, Segment, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styleSheet from './styles';
import LoginButton from '../../containers/Auth/Loginbutton';

const BottomBar = (props) => {
  if (props.bottomBarIsVisible) {
    return (
      <Responsive maxWidth={900}>
        <Segment style={styleSheet.bottomBar}>
          {props.auth.isLoggedIn?
            <Grid columns="equal" inverted>
              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Link to="/">
                    <Icon circular color="teal" name="map outline" />
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to="/create/">
                    <Icon circular inverted color="teal" name="camera" />
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Icon circular>
                    <Icon.Group >
                      <Icon name='bell' color='teal'/>
                      <Icon corner name='circle' color='red'/>
                    </Icon.Group>
                  </Icon>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          :
            <Grid columns="equal" inverted>
              <Grid.Row textAlign="center">
                <Grid.Column>
                  <Link to="/login/">
                    <LoginButton login />
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  <Link to="/signup/">
                    <LoginButton signup />
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          }
        </Segment>
      </Responsive>
    );
  }
  return null;
};

const mapStateToProps = state => ({
  ...state.sidebar,
  auth: state.auth,
});

export default connect(mapStateToProps)(BottomBar);
