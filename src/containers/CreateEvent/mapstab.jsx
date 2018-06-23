import React from 'react';
import {
  Segment,
  Grid,
  Button,
} from 'semantic-ui-react';
import {
  MapWrapper,
  Sonar,
} from '../../components';

const MapTab = (props) => {
  return (
    <Segment attached color="yellow" secondary>
      <Grid>
        <Grid.Row>
          <div
            style={{
              width: '100%',
              height: '50vh',
              left: '0px',
            }}
          >              
            <MapWrapper
              location={{
                  lat: this.state.eventFormData.location.lat,
                  lng: this.state.eventFormData.location.lng,
              }}
              onClick={e => this.handleMapLocationChange(e)}
              zoom={16}
            >
              <Sonar
                lat={this.state.eventFormData.location.lat}
                lng={this.state.eventFormData.location.lng}
                id={null}
              />
            </MapWrapper>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>{this.state.eventFormData.text}</p>
            <Button
              floated="right"
              color="teal"
              disabled={
                this.state.eventFormData.location.isValid
                || this.state.reportForm.isFreezed} 
              onClick={() => this.handleSaveLocation()}
            >
              Save Location
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default MapTab;