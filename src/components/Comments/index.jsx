import React, { Component } from 'react';
import { Comment, Image, Card, Icon, Feed, Form, Responsive } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import { STATIC_IMAGES } from '../../utils/apipaths';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card style={{ width: '95%', padding: '0.3rem' }} color="red">
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/matt.jpg" style={{ marginTop: '1rem' }}/>
              <Feed.Content>
                <Feed.Summary>
                  Write a comment
                </Feed.Summary>
                <Feed.Extra text>
                  <Form>
                    <Form.Group>
                      <Form.TextArea width={14} autoHeight placeholder='Comment..' />
                      <Responsive minWidth={901}>
                        <Form.Button width={2} color="teal">
                          <Icon name="comment" />
                        </Form.Button>
                      </Responsive>
                      <Responsive maxWidth={900}>
                        <Form.Button width={2} color="teal" style={{ marginTop: '1rem' }} icon labelPosition='left'>                        
                          <Icon name="comment" />
                          Post
                        </Form.Button>
                      </Responsive>
                    </Form.Group>
                  </Form>
                </Feed.Extra>

              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
        <Card.Content>
          <Comment.Group minimal>
            <Comment>
              <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <a><Icon name="like" /> Upvote</a>
                  <a><Icon name="flag" /> Flag</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
            {/* <center>
              <Image src={`${STATIC_IMAGES}/meerkat.svg`} size="tiny" circular bordered centered />
            </center> */}

          </Comment.Group>
        </Card.Content>
      </Card>
    );
  }
}

CommentsSection.propTypes = {

};

export default CommentsSection;
