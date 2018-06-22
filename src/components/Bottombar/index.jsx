import React from 'react';
import { Responsive, Transition, Segment, Header, Grid, Icon } from 'semantic-ui-react';
import styleSheet from './style';

const BottomBar = props => (
  <Responsive maxWidth={900}>
    <Segment style={styleSheet}>
      <Grid columns="equal" inverted>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Icon circular color="teal" name="map outline" />
          </Grid.Column>
          <Grid.Column>
            <Icon circular inverted color="teal" name="camera" />
          </Grid.Column>
          <Grid.Column>
            <Icon circular color="teal" name="bell" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>      
  </Responsive>
);

export default BottomBar;
