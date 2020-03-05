import React from 'react';
import { Card, ListGroup, ListGroupItem, Container } from 'react-bootstrap';

const InfoBox = (props) => {
    const {visible, marker} = props;
    console.log(props);
    
    if (visible) {
        return (
            <div style={{position: 'fixed', right: '0', marginTop: '1%', overflow: 'scroll'}}>
                <Container>
                <Card style={{ width: '30rem' }}>
                  <Card.Img variant="top" src={marker.item.imageUrl} style={{height: '300px'}}/>
                  <Card.Body>
        <Card.Title>{marker.name} {marker.item.price !== undefined ? `- ${marker.item.price}` : ''}</Card.Title>
                    <Card.Text>
                        {marker.item.isClosed ? 'Closed' : 'Open'}<br />                        
                        Distance: {parseFloat(marker.item.distance).toFixed(2)} miles <br />
                        Rating: {marker.item.rating}/5 ({marker.item.reviewCount} reviews)<br />
                        Supports Delivery: {marker.item.supportsDelivery ? 'Yes' : 'No'}<br />
                    </Card.Text>
                    Phone: <Card.Link href={`tel:${marker.item.phone}`}>{marker.item.displayPhn}</Card.Link>                    
                  </Card.Body>
                </Card>
                </Container>
              </div>
        );
    } else return <React.Fragment />;
}

export default InfoBox;