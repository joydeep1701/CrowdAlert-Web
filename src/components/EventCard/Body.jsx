import React from 'react';
import { Item, Divider, Label } from 'semantic-ui-react';
import styleSheet from './styleSheet';

const Body = props => (
  <Item.Content>
    <Item.Header as="a">{props.title}</Item.Header>
    <Label
      color="blue"
      ribbon
      style={styleSheet.ribbonLabel}
    >
      Health
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
export default Body;
