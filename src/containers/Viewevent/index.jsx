import React, { Component } from 'react';
import {
  Responsive,
  Card,
  Item,
  Grid,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { Image, Event, Map, LoadingCard, Sonar } from '../../components';
import { GET_EVENT_BY_ID } from '../../utils/apipaths';


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
  componentWillMount() {
    fetch(`${GET_EVENT_BY_ID}?id=${this.props.match.params.eventid}`)
      .then(response => (response.json()))
      .then((response) => {
        if (response === null) {
          throw "Error";
        }
        this.setState({
          event: response,
          loading: false,
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
              <Map
                location={{
                    lat: this.state.event.location.coords.latitude,
                    lng: this.state.event.location.coords.longitude,
                  }}
                zoom={17}
                loaded
              >
                <Sonar
                  lat={this.state.event.location.coords.latitude}
                  lng={this.state.event.location.coords.longitude}
                  id={this.state.event.title}
                />
              </Map>
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
                  <Event.Body
                    title={this.state.event.title}
                    description={this.state.event.comments}
                  />
                  <Event.Footer title={this.state.event.title} />
                </Card>

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
                      ? null :
                      <Map
                        location={{
                            lat: this.state.event.location.coords.latitude,
                            lng: this.state.event.location.coords.longitude,
                          }}
                        zoom={17}
                        loaded
                      >
                        <Sonar
                          lat={this.state.event.location.coords.latitude}
                          lng={this.state.event.location.coords.longitude}
                          id={this.state.event.title}
                        />
                      </Map>

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
                          <Event.Body
                            title={this.state.event.title}
                            description={this.state.event.comments}
                          >
                            <Image image_base64={this.state.event.image_base64} />
                          </Event.Body>
                          <Event.Footer title={this.state.event.title} />

                        </Card>
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
