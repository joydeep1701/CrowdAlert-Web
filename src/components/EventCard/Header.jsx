import React from 'react';
import {
  Feed,
  Image,
  Label,
} from 'semantic-ui-react';
import eventStyles from './styleSheet';
import { calcAge } from '../../utils/time';


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
          {calcAge(props.dateTime)}
        </Feed.Date>
        <Feed.Summary>
          <a>{props.user_id}</a>
           <br/> reported an incident
        </Feed.Summary>
        <br />
        {props.reverse_geocode?
          <div>
              <Label as="a" basic color="purple">{props.reverse_geocode.name}</Label>
              <Label as="a" basic color="orange">{props.reverse_geocode.admin2}</Label>
              <Label as="a" basic color="yellow">{props.reverse_geocode.admin1}</Label>
          </div>
          :null
        }
       
      </Feed.Content>
    </Feed.Event>
  </Feed>
);


export default EventHeader;
