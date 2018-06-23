import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Form,
  Message,
  TextArea,
  Icon,
  Input,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getEventColor from '../../utils/eventcolors';

const eventOptions = [
  { key: 'rd', text: 'Road', value: 'road' },
  { key: 'el', text: 'Electric', value: 'electric' },
  { key: 'hl', text: 'Health', value: 'health' },
  { key: 'fr', text: 'Fire', value: 'fire' },
];

class FormTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportForm: {
        loading: false,
        message: {
          header: '',
          body: '',
        },
        eventID: 'Some Random ID',
        isFreezed: false,
        validationErrors: false,
        uploading: false,
        imageSelectDisabled: false,
        uploadComplete: false,
      },
      eventFormData: {
        details: {
          eventType: null,
          title: '',
          description: '',
          isValid: false,
          public: true,
          help: false,
        },
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      ...this.state,
      eventFormData: {
        ...this.state.eventFormData,
        details: {
          ...this.state.eventFormData.details,
          [name]: value,
        },
      },
    });
  }
  render() {
    if (this.props.tabs.activeTab !== 1) {
      return null;
    }
    return (
      <Segment
        attached
        color={getEventColor(this.state.eventFormData.details.eventType)}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form loading={this.state.reportForm.loading}>
                <Form.Field>
                  {this.state.reportForm.validationErrors ?
                    <Message
                      error
                      header={this.state.reportForm.message.header}
                      content={this.state.reportForm.message.body}
                    />
                    : null }
                </Form.Field>
                <Form.Field required disabled={this.state.reportForm.isFreezed}>
                  <p>Event Type</p>
                  <Form.Select
                    options={eventOptions}
                    placeholder="Event Type"
                    value={this.state.eventFormData.details.eventType}
                    onChange={(e, { value }) =>
                      this.handleInputChange({
                        target: {
                          value,
                          name: 'eventType',
                        },
                      })
                    }
                  />
                </Form.Field>
                <Form.Field required disabled={this.state.reportForm.isFreezed}>
                  <p>Short Description</p>
                  <Input
                    name="title"
                    label={{
                      basic: true,
                      content:
                        `${this.state.eventFormData.details.title.length}/50`,
                    }}
                    labelPosition="right"
                    onChange={this.handleInputChange}
                    value={this.state.eventFormData.details.title}
                    autoComplete="off"
                    maxLength={50}
                  />
                </Form.Field>
                <Form.Field disabled={this.state.reportForm.isFreezed}>
                  <TextArea
                    placeholder="Tell us more"
                    style={{ minHeight: 100 }}
                    onChange={this.handleInputChange}
                    value={this.state.eventFormData.details.description}
                    name="description"
                  />
                </Form.Field>
                <Form.Field disabled={this.state.reportForm.isFreezed}>
                  <Checkbox
                    label={{ children: 'Make incident publicly visible' }}
                    checked={this.state.eventFormData.details.public}
                    onChange={() => this.handleInputChange({
                        target: {
                          checked: !this.state.eventFormData.details.public,
                          name: 'public',
                          type: 'checkbox',
                        },
                      })}
                  />
                </Form.Field>
                <Form.Field disabled={this.state.reportForm.isFreezed}>
                  <Checkbox
                    label={{ children: 'Ask for public help' }}
                    checked={this.state.eventFormData.details.help}
                    name="help"
                    onChange={() => this.handleInputChange({
                        target: {
                          checked:
                            this.state.eventFormData.details.public
                            && !this.state.eventFormData.details.help,
                          name: 'help',
                          type: 'checkbox',
                        },
                      })}
                  />
                </Form.Field>
                <Form.Button
                  floated="right"
                  color="orange"
                  onClick={this.handleSubmit}
                  disabled={
                    this.state.reportForm.loading
                    || this.state.reportForm.isFreezed}
                >
                  <Icon name="check" /> Report Incident
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
  };
};

export default connect(mapStateToProps, null)(FormTab);
