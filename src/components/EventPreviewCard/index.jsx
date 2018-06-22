import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive, Transition, Segment, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import style from './style';
import {
  openEventPreview,
  closeEventPreview,
} from './actions';
import calcAge from '../../utils/time';
import getEventColor from '../../utils/eventcolors';


const EventPreviewCard = (props) => {
  if (!props.eventPreview.event) {
    return null;
  }
  return (
    <div>
      <Responsive minWidth={900}>
        <Transition style={style.widescreen} visible={props.eventPreview.isOpen} animation="fade up" duration={1000}>        
          <Segment color={getEventColor(props.eventPreview.event.category)}>
            <div>
              <Header as="h3" floated="left">{props.eventPreview.event.category.toLocaleUpperCase()}</Header>
              <Header as="p" floated="right" onClick={() => props.closeEventPreview()}>
                <Icon name="close" size="mini" fitted />
              </Header>
            </div>
            <br />
            <Header as="h4">{props.eventPreview.event.title}</Header>
            <p>{calcAge(props.eventPreview.event.datetime)}</p>
            <Link to={`/view/${props.eventPreview.event.key}`} onClick={() => props.closeEventPreview()}>View Incident</Link>
          </Segment>
        </Transition>
      </Responsive>
      <Responsive maxWidth={900}>
        
        <div style={style.mobile}>
          <Transition style={style.mobile} visible={props.eventPreview.isOpen} animation="fly up" duration={1000}>
            <Segment color={getEventColor(props.eventPreview.event.category)}>
              <div>
                <Header as="h3" floated="left">{props.eventPreview.event.category.toLocaleUpperCase()}</Header>
                <Header as="p" floated="right" onClick={() => props.closeEventPreview()}>
                  <Icon name="close" size="mini" fitted />
                </Header>
              </div>
              <br />
              <Header as="h4">{props.eventPreview.event.title}</Header>
              <p>{calcAge(props.eventPreview.event.datetime)}</p>
              <Link to={`/view/${props.eventPreview.event.key}`} onClick={() => props.closeEventPreview()}>View Incident</Link>
            </Segment>
          </Transition>
        </div>
        
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
