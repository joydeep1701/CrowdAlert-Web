import React from 'react';
import {
  Step,
  Icon,
  Responsive,
} from 'semantic-ui-react';

const Tabs = (props) => {
  console.log(props);
  return (
    <Step.Group fluid attached="top" widths={3} unstackable>
      <Step
        completed={this.state.eventFormData.location.isValid}
        active={this.state.reportForm.activeTab === 0}
        onClick={() => this.handleTabChange(0)}
      >
        <Icon circular color="yellow" name="map outline" size="small" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Location</Step.Title>
            <Step.Description>{this.state.eventFormData.text}</Step.Description>
          </Step.Content>
        </Responsive>

      </Step>
      <Step
        active={this.state.reportForm.activeTab === 1}
        onClick={() => this.handleTabChange(1)}
        completed={this.state.eventFormData.details.isValid}
      >
        <Icon circular color={getEventColor(this.state.eventFormData.details.eventType)} name="edit" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Description</Step.Title>
            <Step.Description>Enter incident information</Step.Description>
          </Step.Content>
        </Responsive>
      </Step>

      <Step
        active={this.state.reportForm.activeTab === 2}
        onClick={() => this.handleTabChange(2)}
        completed={this.state.reportForm.uploadComplete}
      >
        <Icon circular color="brown" name="camera retro" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Image</Step.Title>
            <Step.Description>Click a photo</Step.Description>
          </Step.Content>
        </Responsive>
      </Step>
    </Step.Group>

  );
};
