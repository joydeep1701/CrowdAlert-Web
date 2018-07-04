import React, { PureComponent } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SignUpForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <Form.Input placeholder='Fullname' label="Fullname" />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder='Email' label="Email" />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder='Password' label="Password" />
          </Form.Field>
          <Form.Field>
            <Button primary fluid>
              Sign up
            </Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

SignUpForm.propTypes = {

};

export default SignUpForm;