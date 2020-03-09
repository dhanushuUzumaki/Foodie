import React from 'react';
import { Card, Container } from 'react-bootstrap';
import '../styles/InfoBox.css'

const InfoBox = (props) => {
  const { visible, marker } = props;
  console.log(props);

  if (visible && marker.name !== 'current') {
    return (
      <div id="infobox">
        <Container>
          <Card>
            <Card.Img variant="top" src={marker.item.imageUrl} />
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