import React from 'react';
import { Card, Item, Image, Dimmer, Loader } from 'semantic-ui-react';
import propTypes from 'prop-types';
import paragraph from './paragraph.png';
import styleSheet from './style';

const LoaderCard = props => (
  <Card style={styleSheet.cardContainer}>
    <Item.Content>
      <Item.Description>
        <Image src={paragraph} />
        <Dimmer active={props.loading} inverted>
          <Loader />
        </Dimmer>
      </Item.Description>
    </Item.Content>
  </Card>
);
LoaderCard.propTypes = {
  loading: propTypes.bool.isRequired,
};
export default LoaderCard;
