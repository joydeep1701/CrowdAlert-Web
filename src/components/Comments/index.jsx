import React, { Component } from 'react';
import { Comment, Image, Card, Icon, Feed, Form, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { LoadingCard } from '../';
import {
  fetchCommentsThread,
  fetchCommentsThreadCancel,
} from './actions';
import { STATIC_IMAGES } from '../../utils/apipaths';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  componentWillMount() {
    this.props.fetchCommentsThread(this.props.threadId, true);
  }
  render() {
    if (this.props.comments.loading) {
      return (<LoadingCard loading />);
    }
    return (

      <Card style={{ width: '95%', padding: '0.3rem' }} color="red">
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label
                image={this.props.user.photoURL ||
                  `${STATIC_IMAGES}/meerkat.svg`}
                style={{ marginTop: '1rem' }}
              />
              <Feed.Content>
                <Feed.Summary>
                  Write a comment
                </Feed.Summary>
                <Feed.Extra text>
                  <Form>
                    <Form.Group>
                      <Form.TextArea width={14} autoHeight placeholder="Comment.." />
                      <Responsive minWidth={901}>
                        <Form.Button width={2} color="teal">
                          <Icon name="comment" />
                        </Form.Button>
                      </Responsive>
                      <Responsive maxWidth={900}>
                        <Form.Button width={2} color="teal" style={{ marginTop: '1rem' }} icon labelPosition="left">
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
          <Comment.Group>
            {this.props.comments.comments.map(comment => (
              <Comment key={comment.key}>
                <Comment.Avatar
                  src={this.props.comments.userData[comment.user].photoURL ||
                      `${STATIC_IMAGES}/meerkat.svg`}
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    {this.props.comments.userData[comment.user].displayName}

                  </Comment.Author>
                  <Comment.Metadata as="a">
                    <span>Today at 5:42PM</span>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <a><Icon name="like" /></a>
                    <a><Icon name="flag" /></a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
            
            {this.props.comments.comments.length ?
              null
            :
              <center>
                <Image
                  src={`${STATIC_IMAGES}/meerkat.svg`}
                  size="tiny"
                  circular
                  bordered
                  centered
                  disabled
                />
                <br />
                <p>Nothing here</p>
              </center>
            }

          </Comment.Group>
        </Card.Content>
      </Card>
    );
  }
}

CommentsSection.propTypes = {

};

const mapStateToProps = state => ({
  comments: state.comments,
  user: state.auth.user,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchCommentsThread,
    fetchCommentsThreadCancel,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
