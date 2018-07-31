import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Responsive,
  Card,
  Image as SemanticImage,
  Item,
  Grid,
  Container,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
  Event,
  MapWrapper,
  LoadingCard,
  Sonar,
  CommentsSection,
} from '../../components';

import { fetchEventData } from './actions';

import styleSheet from './style';

/**
 * [MapwithSonar Combines the MapWrapper & Sonar component to view a single marker
 * on a single marker]
 * @param {[type]} props [description]
 */
const MapwithSonar = props => (
  <MapWrapper>
    {!props.loading ?
      <Sonar
        lat={props.latitude}
        lng={props.longitude}
        id={null}
        type={props.type}
      />
      : null}
  </MapWrapper>


);
MapwithSonar.propTypes = {
  latitude: propTypes.number.isRequired,
  longitude: propTypes.number.isRequired,
  type: propTypes.string,
  loading: propTypes.bool.isRequired,
};
MapwithSonar.defaultProps = {
  type: undefined,
};
/**
 * [EventCard Combines the all the three parts of event cards to form a single
 * whole component ]
 * @param {[type]} props [description]
 */
const EventCard = props => (
  <Card style={styleSheet[props.viewmode].cardContainer}>
    <Event.Header
      reportedBy={props.reportedBy}
      dateTime={props.datetime}
      reverse_geocode={props.reverse_geocode}
    />
    {(props.spam.count > 2) ?
      <Event.SpamAlert />
    : null}
    <Event.Body
      title={props.title}
      description={props.description}
      spam={props.spam}
      eventType={props.eventType}
    >
      <SemanticImage.Group size={props.viewmode === 'desktop' ? 'small' : 'tiny'}>
        {
          props.images ? props.images.map(image => (
            <Image
              uuid={image.uuid}
              key={image.uuid}
              isTrusted={image.isTrusted}
            />
          )) : null
        }
      </SemanticImage.Group>
    </Event.Body>
    <Event.Footer title={props.title} uuid={props.uuid} />
  </Card>
);
EventCard.propTypes = {
  reportedBy: propTypes.object.isRequired,
  spam: propTypes.object.isRequired,
  viewmode: propTypes.string.isRequired,
  // reportedBy: propTypes..isRequired,
  datetime: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string,
  eventType: propTypes.string,
  reverse_geocode: propTypes.shape({
    /* Name of the place */
    name: propTypes.string,
    /* Top levels administative area */
    admin1: propTypes.string,
    /* Upper administative area */
    admin2: propTypes.string,
  }),
  images: propTypes.arrayOf(propTypes.shape({
    isNsfw: propTypes.bool.isRequired,
    isTrusted: propTypes.bool.isRequired,
    uuid: propTypes.string.isRequired,
  })).isRequired,
};
EventCard.defaultProps = {
  reverse_geocode: { name: '', admin2: '', admin1: '' },
  description: '',
  eventType: 'N/A',
};
/**
 * [Viewevents Responsive Viewevents component. Fetches data & renders the
 * component]
 * @type {Object}
 */
class Viewevent extends Component {
  componentWillMount() {
    const { eventid } = this.props.match.params;
    const shouldRefresh =
      this.props.match.params.eventid !== this.props.event.data.eventid;
    this.props.fetchEventData({ eventid, shouldRefresh });
  }
  render() {
    let lat = 0;
    let lng = 0;
    if (this.props.event.isLoading) {
      ({ lat, lng } = this.props.map);
    } else {
      ({ latitude: lat, longitude: lng } = this.props.event.data.location.coords);
    }
    return (
      <div style={{ paddingTop: '1rem', marginBottom: '6rem' }}>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            <MapwithSonar
              latitude={lat}
              longitude={lng}
              type={this.props.event.data.category}
              loading={this.props.event.isLoading}
            />

          </div>
          <Item style={styleSheet.mobile.itemContainer}>
            {
              this.props.event.isLoading
              ? <LoadingCard loading />
              :
              <EventCard
                viewmode="mobile"
                reportedBy={this.props.event.data.reportedBy}
                datetime={this.props.event.data.datetime}
                title={this.props.event.data.title}
                description={this.props.event.data.description}
                images={this.props.event.data.images}
                reverse_geocode={this.props.event.reverse_geocode}
                eventType={this.props.event.data.category}
                uuid={this.props.match.params.eventid}
                spam={this.props.event.data.spam}
              />
          }
            {!this.props.event.isLoading ?
              <CommentsSection
                threadId={this.props.match.params.eventid}
              />
            : null }
          </Item>
        </Responsive>
        <Responsive minWidth={901}>
          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div style={styleSheet.desktop.mapContainer}>
                    <MapwithSonar
                      latitude={lat}
                      longitude={lng}
                      type={this.props.event.data.category}
                      loading={this.props.event.isLoading}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Item style={styleSheet.desktop.itemContainer}>
                    {
                      this.props.event.isLoading
                        ? <LoadingCard loading />
                        :
                        <EventCard
                          viewmode="desktop"
                          reportedBy={this.props.event.data.reportedBy}
                          datetime={this.props.event.data.datetime}
                          title={this.props.event.data.title}
                          description={this.props.event.data.description}
                          images={this.props.event.data.images}
                          reverse_geocode={this.props.event.reverse_geocode}
                          eventType={this.props.event.data.category}
                          spam={this.props.event.data.spam}
                          uuid={this.props.match.params.eventid}
                        />
                    }
                    {!this.props.event.isLoading ?
                      <CommentsSection
                        threadId={this.props.match.params.eventid}
                      />
                    : null }
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
  fetchEventData: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchEventData,
  }, dispatch)
);
const mapStateToProps = state => ({
  map: state.map,
  event: state.event,
});
export default connect(mapStateToProps, mapDispatchToProps)(Viewevent);
