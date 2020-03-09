import React from 'react';
// import { Form } from 'react-bootstrap';
import MapWithMarkers from './MapWithMarkers'

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Foodie</h1>
                {/* <Form.Control size="lg" type="text" placeholder="Satisfy your cravings" /> */}
                <MapWithMarkers />               
            </div>);
    }
}

export default App;