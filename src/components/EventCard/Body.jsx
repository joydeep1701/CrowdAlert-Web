import React from 'react';
import PropTypes from 'prop-types';
import { Item, Divider, Label } from 'semantic-ui-react';
import styleSheet from './styleSheet';

/**
 * [Body JSX element for Event Card Body. Contains the event description]
 * @param {[type]} props
 */
const Body = props => (
  <Item.Content>
    <Item.Header as="a">{props.title}</Item.Header>
    <Label color="blue" ribbon style={styleSheet.ribbonLabel}>
      {props.eventType}
    </Label>
    {props.desktop ?
      <Item.Meta>Description</Item.Meta>
    : null}
    <Item.Description>
      {props.description}
    </Item.Description>
    <Divider section />
    <Item.Extra>
      {props.children}
    </Item.Extra>
  </Item.Content>
);

Body.propTypes = {
  title: PropTypes.string.isRequired,
  desktop: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  eventType: PropTypes.string,
};
Body.defaultProps = {
  desktop: false,
  description: 'None available',
  eventType: 'N/A',
};

export default Body;
