import React, { Component } from 'react';
import { Responsive, Card, Item, Image } from 'semantic-ui-react'
import  MapContainer  from '../../components/Map'
export default class Viewevent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Responsive maxWidth={990}>
                    <div style={{position:'absolute',width:'100%',height:'50%', top: '0px', zIndex: -1}}>
                        <MapContainer />  
                    </div>
                    <div style={{position:'absolute',width:'100%',minHeight:'100vh', top: '10vp', overflowY:'scroll', zIndex: 0}}>
                        <Item style={{margin:'10px', paddingTop: '30vh', paddingBottom:'30vp'}}>
                            <Card style={{width:'100%'}}>
                                <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />

                                <Item.Content>
                                    <Item.Header as='a'>Header</Item.Header>
                                    <Item.Meta>Description</Item.Meta>
                                    <Item.Description>
                                    <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                    <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                    <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />

              
                                    </Item.Description>
                                    <Item.Extra>Additional Details</Item.Extra>
                                </Item.Content>
                                </Card>
                        </Item>
                    </div>

                    


                    
                </Responsive>
                <Responsive minWidth={990}>
                    Viewevent Computer
                </Responsive>
            </div>
        )
    }
}