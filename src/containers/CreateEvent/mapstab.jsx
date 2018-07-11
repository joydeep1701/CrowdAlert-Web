import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Segment,
  Grid,
  Button,
  Header,
  Icon,
  Progress,
} from 'semantic-ui-react';
import {
  MapWrapper,
  Sonar,
  GeoLocator,
} from '../../components';
import {
  saveLocationCreateEvents,
} from './actions';

const MapTab = (props) => {
  return (
    <Segment attached color="yellow">
      <Progress percent={33} attached='top' />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3'>
              <Icon name='marker' />
              <Header.Content>
                Location Information
                <Header.Subheader>Update the incident location by clicking on the map</Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div
              style={{
                width: '100%',
                height: '50vh',
                left: '0px',
              }}
            >
              <MapWrapper
                dispatchOnClick
                shouldFetch={false}
              >
                {props.location.mapCenter.lat?
                  <Sonar
                    lat={props.location.mapCenter.lat || props.map.lat}
                    lng={props.location.mapCenter.lng || props.map.lng}
                    id={null}
                  />
                : null }

              </MapWrapper>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h4'>
              <Icon name='bullseye' />
              <Header.Content>
                Current Map Location
                <Header.Subheader>
                  {props.location.text}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <GeoLocator
              static
              fetchOnLoad={!props.tabs.isValid.location}
              floated="left"
              circular={false}
              size={null}
              zoom={16}
            />
            <Button
              floated="right"
              color="teal"
              disabled={
                props.location.disabled
                || false} 
              onClick={() => props.handleSaveLocation()}
              icon
              labelPosition='right'
            >
              <Icon name='right arrow' />
              Proceed
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    handleSaveLocation: saveLocationCreateEvents,
  }, dispatch)
);
const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
    location: state.createEvents.location,
    map: state.map,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
