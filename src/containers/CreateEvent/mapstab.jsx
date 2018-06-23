import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Segment,
  Grid,
  Button,
} from 'semantic-ui-react';
import {
  MapWrapper,
  Sonar,
  GeoLocator,
} from '../../components';
import Geolocator from '../../components/Geolocator';

const MapTab = (props) => {
  console.log(props);
  if (props.tabs.activeTab !== 0) {
    return null;
  }
  return (
    <Segment attached color="yellow" secondary>    
      <Grid>

        <Grid.Row>
          <Grid.Column>
            {/* <p>{this.state.eventFormData.text}</p> */}
            <Button
              floated="left"
              color="teal"
              // disabled={
              //   this.state.eventFormData.location.isValid
              //   || this.state.reportForm.isFreezed} 
              onClick={() => this.handleSaveLocation()}
            >
              Save Location
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <div
            style={{
              width: '100%',
              height: '50vh',
              left: '0px',
            }}
          >
            <MapWrapper onClick={e => this.handleMapLocationChange(e)}>
              {/* <Sonar
                lat={this.state.eventFormData.location.lat}
                lng={this.state.eventFormData.location.lng}
                id={null}
              /> */}
            </MapWrapper>
          </div>
        </Grid.Row>
      </Grid>
      <Geolocator />
    </Segment>
  );
}
const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
  };
};
export default connect(mapStateToProps, null)(MapTab);
