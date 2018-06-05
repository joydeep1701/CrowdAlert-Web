import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Responsive,
  Card,
  Item,
  Grid,
  Container,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import {
  Image,
  Event,
  Map,
  LoadingCard,
  Sonar,
} from '../../components';
import {
  GET_EVENT_BY_ID,
  GET_IMAGE_URLS,
  REVERSE_GEOCODE,
} from '../../utils/apipaths';

import styleSheet from './style';

/**
 * [MapwithSonar Combines the Map & Sonar component to view a single marker
 * on a single marker]
 * @param {[type]} props [description]
 */
const MapwithSonar = props => (
  <Map location={{ lat: props.latitude, lng: props.longitude }} zoom={15}>
    <Sonar lat={props.latitude} lng={props.longitude} id={props.id} />
  </Map>
);
MapwithSonar.propTypes = {
  latitude: propTypes.number.isRequired,
  longitude: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
};
/**
 * [EventCard Combines the all the three parts of event cards to form a single
 * whole component ]
 * @param {[type]} props [description]
 */
const EventCard = props => (
  <Card style={styleSheet[props.viewmode].cardContainer}>
    <Event.Header
      user_id={props.user_id}
      dateTime={props.datetime}
      reverse_geocode={props.reverse_geocode}
    />
    <Event.Body
      title={props.title}
      description={props.description}
    >
      <Image imageUrls={props.imageUrls} />
    </Event.Body>
    <Event.Footer title={props.title} />
  </Card>
);
EventCard.propTypes = {
  viewmode: propTypes.string.isRequired,
  user_id: propTypes.string.isRequired,
  datetime: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string,
  reverse_geocode: propTypes.shape({
    /* Name of the place */
    name: propTypes.string,
    /* Top levels administative area */
    admin1: propTypes.string,
    /* Upper administative area */
    admin2: propTypes.string,
  }),
  imageUrls: propTypes.shape({
    /* SVG url for the image thumbnail */
    thumbnail: propTypes.string,
    /* Original image thumbnail */
    url: propTypes.string,
  }),
};
EventCard.defaultProps = {
  reverse_geocode: { name: '', admin2: '', admin1: '' },
  description: '',
  imageUrls: {
    thumbnail: '',
    url: '',
  },
};
/**
 * [Viewevents Responsive Viewevents component. Fetches data & renders the
 * component]
 * @type {Object}
 */
export default class Viewevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.match.params,
      loading: true,
      event: {},
    };
  }
  componentWillMount() {
    this.getEventData();
  }
  /**
   * [getEventData Issue fetch requests to server to get data]
   * @return {[none]}
   */
  getEventData() {
    // Fetch the json data for the given event id
    fetch(`${GET_EVENT_BY_ID}?id=${this.props.match.params.eventid}`)
      // Decode json
      .then(response => (response.json()))
      // setState or reject eventid
      .then((response) => {
        if (response === null) {
          throw Error('Event Not Found');
        }
        this.setState({
          event: response,
          loading: false,
        });
        // For a valid event get the corresponding image uuid
        // Considering there is a image for every event
        const imageUuid = response.image_uuid;
        return fetch(`${GET_IMAGE_URLS}?uuid=${imageUuid}`);
      })
      // Decode json
      .then(response => response.json())
      .then((response) => {
        // reject if something bad happens
        if (response === null) {
          throw Error('Image not found');
        }
        this.setState({
          ...this.state,
          image_urls: response,
        });
        // Should be updated. The main fetch should return an array of promises
        const lat = this.state.event.location.coords.latitude;
        const long = this.state.event.location.coords.longitude;
        return fetch(`${REVERSE_GEOCODE}?lat=${lat}&long=${long}`);
      })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          ...this.state,
          reverse_geocode: response,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    console.log(this.state, this.props);
    return (
      <div>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            {
            this.state.loading
              ? null
              :
              <MapwithSonar
                latitude={this.state.event.location.coords.latitude}
                longitude={this.state.event.location.coords.longitude}
                id={this.state.eventid}
              />
          }
          </div>
          <Item style={styleSheet.mobile.itemContainer}>
            {
            this.state.loading
              ? <LoadingCard loading />
              :
              <EventCard
                viewmode="mobile"
                user_id={this.state.event.user_id}
                datetime={this.state.event.datetime}
                title={this.state.event.title}
                description={this.state.event.comments}
                imageUrls={this.state.image_urls}
                reverse_geocode={this.state.reverse_geocode}
              />
          }
          </Item>
        </Responsive>
        <Responsive minWidth={901}>
          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div style={styleSheet.desktop.mapContainer}>
                    {
                      this.state.loading
                        ? null :
                        <MapwithSonar
                          latitude={this.state.event.location.coords.latitude}
                          longitude={this.state.event.location.coords.longitude}
                          id={this.state.eventid}
                        />
                    }
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Item style={styleSheet.desktop.itemContainer}>
                    {
                      this.state.loading
                        ? <LoadingCard loading />
                        :
                        <EventCard
                          viewmode="desktop"
                          user_id={this.state.event.user_id}
                          datetime={this.state.event.datetime}
                          title={this.state.event.title}
                          description={this.state.event.comments}
                          imageUrls={this.state.image_urls}
                          reverse_geocode={this.state.reverse_geocode}
                        />
                    }
                  </Item>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </div>
    );
  }
}
Viewevent.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      eventid: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
