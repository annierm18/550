import React from 'react';
import { GeoJSON, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CountriesMap.css';

export const CountriesMap = ({countries}) => {
    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1
    }

    const onEachCountry = (country, layer) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const numText = country.properties.numText;
        layer.bindPopup(`${name} ${numText}`);
    }
    
    return ( 
        <MapContainer style={{height: "80vh"} } zoom={2} center={[20, 100]}>
            <GeoJSON 
                style={mapStyle} 
                data={countries}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
     );
}

export default CountriesMap;