import React, { useState, useEffect } from 'react';
import { GeoJSON, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './CountriesMap.css';

export const CountriesMap = ({ countries, onClick, country  }) => {
    const mapStyle = {
      //  fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
        fontSize: "20px", 
    }

    const onEachCountry = (countryVal, layer) => {
        layer.options.fillColor = countryVal.properties.color;
        const name = countryVal.properties.ADMIN
        const numText = countryVal.properties.numText;
        layer.bindPopup(
            `In ${name}, there have been ${numText} movies or shows produced. Click on the top banner to learn more about this country's cinema`)

        layer.on("click", (e) => {
            handleChange(countryVal.properties)})
    }

    const handleChange = (e) => {
        onClick(e);
    }
    
    return ( 
        <MapContainer 
            style={{height: "75vh"} } 
            zoom={2} 
            center={[20, 20]}>
            <GeoJSON 
                style={mapStyle} 
                data={countries}
                onEachFeature={onEachCountry}
            />
    
        </MapContainer>
     );
}

export default CountriesMap;