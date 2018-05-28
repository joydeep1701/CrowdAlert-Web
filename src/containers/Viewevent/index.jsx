import React, { Component } from 'react';
import {
  Responsive,
  Card,
  Item,
  Divider,
  Dimmer,
  Loader,
  Grid,
  Label,
} from 'semantic-ui-react';
import {
  Map,
  Image,
  Event,
} from '../../components';
// import { database } from '../../utils/firebase';
import { calcAge } from '../../utils/time';

export default class Viewevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.match.params,
      loading: true,
      event: {
        location: {
          coords: {
            latitude: null,
            longitude: null,
          },
        },
      },
    };
  }
  componentDidMount() {
    // eventid is passed as a prop
    const ref = database.ref(`incidents/${this.state.eventid}`);
    ref.on('value', (snapshot) => {
      const event = snapshot.val();
      console.log(event);
      this.setState({
        ...this.state,
        loading: false,
        event,
      });
    }, (err) => {
      console.log(err);
    });
  }
  render() {
    console.log(this.state, this.props);
    return (
          <div>
              <Responsive maxWidth={900}>
                  <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '50vh',
                        top: '0px',
                        zIndex: -1,
                    }}
                    >
                      {this.state.loading
                            ? null
                            : <MapContainer
                              location={{
                                lat: this.state.event.location.coords.latitude,
                                lng: this.state.event.location.coords.longitude,
                            }} 
                            />
}
                    </div>

                  <Item
                      style={{
                        margin: '10px',
                        paddingTop: '30vh',
                        paddingBottom: '8vh',
                        width: '100%',
                    }}
                    >
                      {this.state.loading
                            ? <Card
                              style={{
                                    width: '95%',
                                    height: '25vh',
                                }}
                            >
                              <Item.Content>
                                      <Item.Description>
                                          <Image
                                              src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png" 
                                            />
                                          <Dimmer active={this.state.loading} inverted>
                                              <Loader />
                                            </Dimmer>
                                        </Item.Description>
                                    </Item.Content>
                            </Card>
                            : <div>
                              <Card
                                  style={{
                                    width: '95%',
                                }}
                                >
                                  <EventHeader
                                      user_id={this.state.event.user_id}
                                      datetime={this.state.event.datetime} 
                                    />

                                  <Item.Content>

                                      <Item.Header as="a">{this.state.event.title}</Item.Header>
                                      <Label
                                          color="blue"
                                          ribbon
                                          style={{
                                            marginTop: '7px',
                                            marginBottom: '7px',
                                        }}
                                        >Health
                                        </Label>
                                      {/* <Item.Meta>Description</Item.Meta> */}

                                      <Item.Description>
                                          {this.state.event.comments}
                                        </Item.Description>

                                      <Divider section />
                                      <Item.Extra>
                                          <ImageModal image_base64={this.state.event.image_base64} />

                                        </Item.Extra>
                                    </Item.Content>
                                </Card>
                              <EventFooter title={this.state.event.title} />
                              </div>
}

                    </Item>

                </Responsive>
              <Responsive minWidth={901}>

                  <Grid columns={2}>
                      <Grid.Row>
                          <Grid.Column>
                              <div
                                  style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '90vh',
                                    left: '0px',
                                }}
                                >
                                  {this.state.loading
                                        ? null
                                        : <MapContainer
                                          location={{
                                            lat: this.state.event.location.coords.latitude,
                                            lng: this.state.event.location.coords.longitude,
                                        }} 
                                        />
}
                                </div>

                            </Grid.Column>
                          <Grid.Column>
                              <Item
                                  style={{
                                    margin: '10px',
                                    width: '100%',
                                }}
                                >
                                  {this.state.loading
                                        ? <Card
                                          style={{
                                                width: '95%',
                                                height: '50vh',
                                            }}
                                        >
                                          <Item.Content>
                                                  <Item.Description>
                                                      <Image
                                                          src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png" 
                                                        />
                                                      <Dimmer active={this.state.loading} inverted>
                                                          <Loader />
                                                        </Dimmer>
                                                    </Item.Description>
                                                </Item.Content>
                                          </Card>
                                        : <div>
                                          <Card
                                              style={{
                                                width: '95%',
                                            }}
                                            >
                                              <EventHeader
                                                  user_id={this.state.event.user_id}
                                                  datetime={this.state.event.datetime} 
                                                />

                                              <Item.Content>

                                                  <Item.Header as="a">{this.state.event.title}</Item.Header>
                                                  <Label
                                                      color="blue"
                                                      ribbon
                                                      style={{
                                                        marginTop: '7px',
                                                        marginBottom: '7px',
                                                    }}
                                                    >Health
                                                    </Label>
                                                  <Item.Meta>Description</Item.Meta>

                                                  <Item.Description>
                                                      {this.state.event.comments}
                                                    </Item.Description>

                                                  <Divider section />
                                                  <Item.Extra>
                                                      <ImageModal image_base64={this.state.event.image_base64} />

                                                    </Item.Extra>
                                                </Item.Content>
                                            </Card>

                                          <EventFooter title={this.state.event.title} />
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
