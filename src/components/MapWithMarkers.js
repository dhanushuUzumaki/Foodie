import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import businessesData from '../data/businesses';
import InfoBox from './InfoBox';
import '../styles/MapWithMarkers.css';

const mockApi = false;

class MapWithMarkers extends React.Component {

  state = {
    location: null,
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    businesses: []
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  parseBuisinessResponse = (data) => {
    const d = data.businesses.map(business => {
      let {
        id,
        name,
        image_url: imageUrl,
        is_closed: isClosed,
        review_count: reviewCount,
        rating,
        price,
        phone,
        display_phone: displayPhn,
        distance,
        coordinates
      } = business,
        supportsDelivery = business.transactions.indexOf('delivery') !== -1;
      distance /= 1609; // converting to mile
      return {
        id,
        name,
        imageUrl,
        isClosed,
        reviewCount,
        rating,
        price,
        phone,
        displayPhn,
        distance,
        supportsDelivery,
        coordinates
      };
    });
    return d;
  }

  getBusinesses = ({ latitude, longitude, limit, sortBy }) => {
    console.log(process.env.MOCK_API);
    
    if (mockApi) {
      const businesses = this.parseBuisinessResponse(businessesData);
      this.setState({ businesses });
      return;
    } else {
      // TODO: Support pagination style requests
      axios({
        method: "GET",
        url: process.env.YELP_URL,
        params: {
          latitude,
          longitude,
          limit,
          sort_by: sortBy
        },
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`
        }
      }).then(r => {
        const businesses = this.parseBuisinessResponse(r.data);
        this.setState({ businesses });
      }).catch(e => console.error(e));
    }
  }


  componentDidMount = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.setState({
        location: {
          lat, lng
        }
      }, this.getBusinesses({
        latitude: lat,
        longitude: lng,
        limit: 50, // max
        sortBy: "distance"
      }));
    }
    const error = () => {
      alert("Access to location is required for the application to function.")
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  getBusinessMarkers() {
    const { businesses } = this.state;
    const { google } = this.props;
    return businesses.map(business => {
      const { latitude: lat, longitude: lng } = business.coordinates;
      return <Marker
        name={business.name}
        key={business.id}
        onClick={this.onMarkerClick}
        position={{ lat, lng }}
        icon={{
          url: business.imageUrl,
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(64, 64)
        }}
        item={business}
      />;
    });
  }

  getMap() {
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}        
        initialCenter={this.state.location}
        zoom={15}>

        <Marker name="current" onClick={this.onMarkerClick} />

        {this.getBusinessMarkers()}
      </Map>
    );
  }

  render() {
    console.log(this.state)
    if (this.state.location != null) {
      return (
        <div>
          <div>
            {this.getMap()}
          </div>
          <div>
            <InfoBox
              marker={this.state.activeMarker}
              onClose={this.onInfoWindowClose}
              visible={this.state.showingInfoWindow}
            />
          </div>
        </div>
      )
    }
    else { return <div /> }

  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GAPI_KEY
})(MapWithMarkers);
