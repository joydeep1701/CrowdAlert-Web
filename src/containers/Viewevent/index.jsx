import React, { Component } from 'react';
import {
  Responsive,
  Card,
  Item,
  Grid,
  Container,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { Image, Event, Map, LoadingCard, Sonar } from '../../components';
import { GET_EVENT_BY_ID, GET_IMAGE_URLS, REVERSE_GEOCODE } from '../../utils/apipaths';

import styleSheet from './style';

const MapwithSonar = props => (
  <Map
    location={{
        lat: props.latitude,
        lng: props.longitude,
      }}
    zoom={17}
    loaded
  >
    <Sonar
      lat={props.latitude}
      lng={props.longitude}
      id={props.title}
    />
  </Map>
);

const EventCard = (props) => {
  console.log("EVENT CARD", props)
  return (
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
)};

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
  getEventData() {
    fetch(`${GET_EVENT_BY_ID}?id=${this.props.match.params.eventid}`)
      .then(response => (response.json()))
      .then((response) => {
        if (response === null) {
          throw 'Event Not Found';
        }
        this.setState({
          event: response,
          loading: false,
        });
        const imageUuid = response.image_uuid;
        return fetch(`${GET_IMAGE_URLS}?uuid=${imageUuid}`);
      })
      .then(response => response.json())
      .then((response) => {
        if (response === null) {
          throw 'Image not found';
        }
        this.setState({
          ...this.state,
          image_urls: response,
        });
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
      <Container>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            {
            this.state.loading
              ? null
              :
              <MapwithSonar
                latitude={this.state.event.location.coords.latitude}
                longitude={this.state.event.location.coords.longitude}
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
        </Responsive>
      </Container>
    );
  }
}
