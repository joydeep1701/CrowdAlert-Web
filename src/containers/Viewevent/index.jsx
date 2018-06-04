import React, { Component } from 'react';
import {
  Responsive,
  Card,
  Item,
  Grid,
} from 'semantic-ui-react';
import { Image, Event, Map, LoadingCard } from '../../components';
import { GET_EVENT_BY_ID } from '../../utils/apipaths';
import fetch from 'isomorphic-fetch'

import styleSheet from './style';

export default class Viewevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.match.params,
      loading: true,
      event: {},
    };
  }
  componentDidUpdate(prevProps) {
    fetch(`${GET_EVENT_BY_ID}?id=${this.props.match.params.eventid}`)
      .then(response => (response.json))
      .then(response => console.log(response));

  }
  render() {
    console.log(this.state, this.props);
    return (
      <div>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            {
            this.state.loading
              ?
                <Map
                  location={{
                    lat: 22.67,
                    lng: 88.31,
                  }}
                  loaded
                />
              :
                <Map location={{
                  lat: this.state.event.location.coords.latitude,
                  lng: this.state.event.location.coords.longitude,
                }}
                />
          }
          </div>

          <Item style={styleSheet.mobile.itemContainer}>
            {
            this.state.loading
              ? <LoadingCard loading />
              :
              <div>
                <Card style={styleSheet.mobile.cardContainer}>
                  <Event.Header
                    user_id={this.state.event.user_id}
                    dateTime={this.state.event.datetime}
                  />
                  <Event.Body />

                </Card>
                <Event.Footer title={this.state.event.title} />
              </div>
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
                      ?
                        <Map
                          location={{
                            lat: 22.67,
                            lng: 88.31,
                          }}
                          loaded         
                        />                      
                      : <Map location={{
                            lat: this.state.event.location.coords.latitude,
                            lng: this.state.event.location.coords.longitude,
                          }}
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
                      <div>
                        <Card style={styleSheet.desktop.cardContainer}>
                          <Event.Header
                            user_id={this.state.event.user_id}
                            dateTime={this.state.event.datetime}
                          />
                          <Event.Body />
                          <Image image_base64={this.state.event.image_base64} />
                        </Card>
                        <Event.Footer title={this.state.event.title} />
                      </div>
                  }
                </Item>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </Responsive>
      </div>
    );
  }
}
