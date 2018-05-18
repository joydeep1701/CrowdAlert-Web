import React, { Component } from 'react';
import { Responsive, Card, Item, Image, Feed, Icon, Divider, Dimmer, Loader, Grid, Menu, Dropdown, Label, Button } from 'semantic-ui-react'
import  MapContainer  from '../../components/Map'
import ShareModal from '../../components/Share'
import ImageModal from '../../components/Image'
import { database } from '../../utils/firebase';
import { calcAge } from '../../utils/time';

const EventHeader = (props) => (
    <Feed style={{paddingTop:'10px',paddingLeft:'10px'}}>
        <Feed.Event>
            <Feed.Label>
                <Image src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg'/>                                            
            </Feed.Label>                                               
                <Feed.Content>
                    <Feed.Date>
                        {calcAge(props.datetime)}
                    </Feed.Date>
                    <Feed.Summary>
                        <a>{props.user_id}</a> reported an incident
                    </Feed.Summary>
                    <br />
                    <Label as='a' basic color='orange'>Serampore</Label>
                    <Label as='a' basic color='blue'>West Bengal</Label>
                </Feed.Content>                                               
        </Feed.Event>
    </Feed>
) 



const EventFooter = (props) => (
    <Menu style={{width:'95%'}} widths={3}>
        <Menu.Item active={true}>
            <Icon color='black' name='thumbs up' color='red'/>
            <Label color='red' floating={true}>12</Label>
            Upvoted
        </Menu.Item>
        <Menu.Item>
            <Dropdown icon='bars'>
                <Dropdown.Menu>
                    <Dropdown.Item>                        
                        <ShareModal title={props.title}>                                                            
                            <p> <Icon color='black' name='external share' /> Share</p>
                        </ShareModal>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Icon color='black' name='warning circle' />Mark as Spam
                    </Dropdown.Item>

                </Dropdown.Menu>
                
            </Dropdown>
        </Menu.Item>
        <Menu.Item >
            <Icon color='black' name='comments outline' color='blue'/>
            <Label color='blue' floating={true}>5</Label>
            Comment
        </Menu.Item>
    </Menu>
) 



export default class Viewevent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.match.params,
            loading: true,
            event: {
                location: {
                    coords: {
                        latitude: null,
                        longitude: null,
                    }
                }
            },

        }
    }
    componentDidMount() {
        // eventid is passed as a prop
        var ref = database.ref(`incidents/${this.state.eventid}`);
        ref.on("value", snapshot => {
            let event = snapshot.val();
            console.log(event);
            this.setState({
                ...this.state,
                loading: false,
                event
            })
        }, (err) => {console.log('err')})
    }
    render() {
        console.log(this.state,this.props);
        return (
            <div>
                <Responsive maxWidth={900}>
                    <div style={{position:'absolute',width:'100%',height:'50vh', top: '0px', zIndex: -1}}>
                    {this.state.loading?
                        null:
                        <MapContainer 
                            location={
                                {
                                   lat: this.state.event.location.coords.latitude,
                                   lng: this.state.event.location.coords.longitude
                                 }
                            }
                        />  
                    }
                    </div>
                        
                        <Item style={{margin:'10px', paddingTop: '30vh', paddingBottom: '8vh', width:'100%'}}>
                            {this.state.loading?
                                <Card style={{width:'95%', height:'25vh'}}>
                                    <Item.Content>
                                        <Item.Description>
                                            <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                            <Dimmer active={this.state.loading} inverted={true}>                                            
                                                <Loader />
                                            </Dimmer>
                                        </Item.Description>
                                    </Item.Content>
                                 </Card>                                
                                :
                                <div>
                                    <Card style={{width:'95%'}}>                                    
                                        <EventHeader user_id={this.state.event.user_id} datetime={this.state.event.datetime}/>

                                        <Item.Content>
                                            
                                            <Item.Header as='a'>{this.state.event.title}</Item.Header>
                                            <Label color='blue' ribbon style={{marginTop:'7px',marginBottom:'7px'}}>Health</Label>
                                            {/* <Item.Meta>Description</Item.Meta> */}
                                            
                                            <Item.Description>
                                                {this.state.event.comments}
                                            </Item.Description>
                                            
                                            <Divider section />
                                            <Item.Extra>
                                            <ImageModal image_base64={this.state.event.image_base64} />

                                            </Item.Extra>
                                        </Item.Content>
                                    </Card>
                                    <EventFooter title={this.state.event.title}/>
                                </div>
                               
                            }
                            

                                   
                            </Item>

                    


                    


                    
                </Responsive>
                <Responsive minWidth={901}>
                  
                                
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                            <div style={{position:'absolute',width:'100%', height:'90vh', left:'0px'}}>
                                {this.state.loading?
                                    null:
                                            <MapContainer 
                                                location={
                                                    {
                                                    lat: this.state.event.location.coords.latitude,
                                                    lng: this.state.event.location.coords.longitude
                                                    }
                                                }
                                            />  
                                }
                            </div>

                            </Grid.Column>
                            <Grid.Column>
                            <Item style={{margin:'10px',width:'100%'}}>
                            {this.state.loading?
                                <Card style={{width:'95%', height:'50vh'}}>
                                    <Item.Content>
                                        <Item.Description>
                                            <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                            <Dimmer active={this.state.loading} inverted={true}>                                            
                                                <Loader />
                                            </Dimmer>
                                        </Item.Description>
                                    </Item.Content>
                                 </Card>                                
                                :
                                <div>
                                    <Card style={{width:'95%'}}>                                    
                                        <EventHeader user_id={this.state.event.user_id} datetime={this.state.event.datetime}/>

                                        <Item.Content>
                                            
                                            <Item.Header as='a'>{this.state.event.title}</Item.Header>
                                            <Label color='blue' ribbon style={{marginTop:'7px',marginBottom:'7px'}}>Health</Label>
                                            <Item.Meta>Description</Item.Meta>
                                            
                                            <Item.Description>
                                                {this.state.event.comments}
                                            </Item.Description>


                                            <Divider section />
                                            <Item.Extra>
                                            <ImageModal image_base64={this.state.event.image_base64} />

                                            </Item.Extra>
                                        </Item.Content>
                                    </Card>
                                   

                                    <EventFooter title={this.state.event.title}/>
                                </div>
                               
                            }
                            

                                   
                            </Item>
                            </Grid.Column>
                        </Grid.Row>


                    </Grid>
                </Responsive>
            </div>
        )
    }
}