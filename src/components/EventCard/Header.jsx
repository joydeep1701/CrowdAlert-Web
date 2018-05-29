import React from 'react';
import {
  Feed,
  Image,
  Label,
} from 'semantic-ui-react';
import eventStyles from './styleSheet';

const EventHeader = props => (
  <Feed style={eventStyles.header}>
    <Feed.Event>
      <Feed.Label>
        <Image
          src="https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg"
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Date>
          {calcAge(props.datetime)}
        </Feed.Date>
        <Feed.Summary>
          <a>{props.user_id}</a>
          reported an incident
        </Feed.Summary>
        <br />
        <Label as="a" basic color="orange">Serampore</Label>
        <Label as="a" basic color="blue">West Bengal</Label>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);


export default EventHeader;
