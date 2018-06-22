import React from 'react';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geolocatoretLocationPermission, geolocatorModalClose } from './actions';

const ConfirmationModal = props => (
  <Modal open={props.isOpen} basic size="small">
    <Header icon="archive" content="Permissions Required" />
    <Modal.Content>
      <p>{props.text}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="teal" inverted onClick={() => props.closeModal()}>
        <Icon name="checkmark" />
        Okay
      </Button>
    </Modal.Actions>
  </Modal>
);

const GeoLocator = (props) => {
  return (
    <div style={{position: 'fixed', bottom: '10vh', right: '20px', zIndex: 1000}}>
      <Button icon='crosshairs' circular color='black' size='huge' onClick={props.getLocation}/>
      <ConfirmationModal text={props.modal.modalText} isOpen={props.modal.isOpen} closeModal={props.closeModal} />
    </div>
  )
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getLocation: geolocatoretLocationPermission,
    closeModal: geolocatorModalClose,
  }, dispatch)
);
const mapStateToProps = (state) => {
  const { geoLocator } = state;
  return {
    modal: geoLocator,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocator);
