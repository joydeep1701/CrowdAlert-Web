import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { ShareModal, UpvoteButton } from '../';

/**
 * [EventFooter Footer Bar component for Events Card ]
 * @param {[type]} props [description]
 */
const EventFooter = props => (
  <Button.Group widths={3} basic fluid>
    <UpvoteButton uuid={props.uuid} />
    <Button>
      <ShareModal title={props.title}>
        <div>
          <Icon color="black" name="external share" />
              Share
        </div>
      </ShareModal>
    </Button>
    <Button>
      <Icon color="black" name="flag" /> Flag
    </Button>
  </Button.Group>
);
EventFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventFooter;
