import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive, Transition, Segment, Header, Icon } from 'semantic-ui-react';
import style from './style';
import {
  openEventPreview,
  closeEventPreview,
} from './actions';
import calcAge from '../../utils/time';
import getEventColor from '../../utils/eventcolors';
import { Link } from 'react-router-dom';

const EventPreviewCard = (props) => {
  if (!props.eventPreview.event) {
    return null;
  }
  return (
    <div>
      <Responsive minWidth={900}>
        <Transition visible={props.eventPreview.isOpen} animation="fade up" duration={400}>        
          <Segment style={style.widescreen} color={getEventColor(props.eventPreview.event.category)}>
            <div>
              <Header as="h3" floated="left">{props.eventPreview.event.category.toLocaleUpperCase()}</Header>
              <Header as="p" floated="right" onClick={() => props.closeEventPreview()}>
                <Icon name="close" size="mini" fitted />
              </Header>
            </div>
            <br />
            <Header as="h4">{props.eventPreview.event.title}</Header>
            <p>{calcAge(props.eventPreview.event.datetime)}</p>
            <Link to={`/view/${props.eventPreview.event.key}`}>View Incident</Link>
          </Segment>
        </Transition>
      </Responsive>
      <Responsive maxWidth={900}>
        <Transition visible={props.eventPreview.isOpen} animation="fly up" duration={1000}>
          <Segment style={style.mobile} color={getEventColor(props.eventPreview.event.category)}>
            <div>
              <Header as="h3" floated="left">{props.eventPreview.event.category.toLocaleUpperCase()}</Header>
              <Header as="p" floated="right" onClick={() => props.closeEventPreview()}>
                <Icon name="close" size="mini" fitted />
              </Header>
            </div>
            <br />
            <Header as="h4">{props.eventPreview.event.title}</Header>
            <p>{calcAge(props.eventPreview.event.datetime)}</p>
            <Link to={`/view/${props.eventPreview.event.key}`}>View Incident</Link>
          </Segment>
        </Transition>
      </Responsive>
    </div>

)};

const mapStateToProps = (state) => {
  const { map } = state;
  const { eventPreview } = state;
  const { event } = state;
  return {
    mapProps: map,
    eventPreview,
    event,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    openEventPreview,
    closeEventPreview,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EventPreviewCard);
