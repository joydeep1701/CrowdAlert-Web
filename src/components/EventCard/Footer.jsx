import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { ShareModal, UpvoteButton, SpamReport } from '../';

/**
 * [EventFooter Footer Bar component for Events Card ]
 * @param {[type]} props [description]
 */
const EventFooter = props => (
  <Button.Group widths={3} basic fluid>
    <UpvoteButton uuid={props.uuid} />    
    <ShareModal title={props.title}>
      <Button>
        <Icon color="black" name="external share" />
            Share
      </Button>
    </ShareModal>
    <SpamReport.Flag uuid={props.uuid} />
  </Button.Group>
);
EventFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventFooter;
