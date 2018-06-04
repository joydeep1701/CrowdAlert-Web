import React, {Component} from 'react';
import {
  Responsive,
  Card,
  Item,
  Divider,
  Dimmer,
  Loader,
  Grid,
  Label
} from 'semantic-ui-react';
import { Image, Event, Map } from '../../components';

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
  componentDidMount() {
    // eventid is passed as a prop

  }
  render() {
    console.log(this.state, this.props);
    return (<div>
      <Responsive maxWidth={900}>
        <div style={styleSheet.mobile.mapContainer}>
          {
            this.state.loading
              ?<Map location={{
                lat: 22.67,
                lng: 88.31,
              }}
              loaded={true}
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
              ? null
              :
              <div>
                <Card style={styleSheet.mobile.cardContainer}>
                  <Event.Header
                    user_id={this.state.event.user_id}
                    dateTime={this.state.event.datetime}
                  />
                  <Item.Content>
                    <Item.Header as="a">{this.state.event.title}</Item.Header>
                    <Label
                      color="blue"
                      ribbon="ribbon"
                      style={styleSheet.ribbonLabel}>
                      Health
                    </Label>
                    <Item.Description>
                      {this.state.event.comments}
                    </Item.Description>

                    <Divider section="section"/>
                      <Item.Extra>

                      </Item.Extra>
                  </Item.Content>
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
                    ? null
                    : <Map location={{
                          lat: this.state.event.location.coords.latitude,
                          lng: this.state.event.location.coords.longitude,
                        }}/>
                }
              </div>

            </Grid.Column>
            <Grid.Column>
              <Item style={{
                  margin: '10px',
                  width: '100%'
                }}>
                {
                  this.state.loading
                    ? null
                    : <div>
                        <Card style={{
                            width: '95%'
                          }}>
                          <Event.Header user_id={this.state.event.user_id} datetime={this.state.event.datetime}/>

                          <Item.Content>

                            <Item.Header as="a">{this.state.event.title}</Item.Header>
                            <Label
                              color="blue"
                              ribbon="ribbon"
                              style={styleSheet.ribbonLabel}
                            >
                              Health
                            </Label>

                            <Item.Meta>Description</Item.Meta>

                            <Item.Description>
                              {this.state.event.comments}
                            </Item.Description>

                            <Divider section="section"/>
                            <Item.Extra>
                              <Image image_base64={this.state.event.image_base64} />

                            </Item.Extra>
                          </Item.Content>
                        </Card>

                        <Event.Footer title={this.state.event.title}/>
                      </div>
                }

              </Item>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Responsive>
    </div>);
  }
}
