import React, { useState, useEffect } from 'react';
//import "@esri/calcite-components/dist/calcite/calcite.css";
//import "@esri/calcite-components/dist/components/calcite-select";
//import "@esri/calcite-components/dist/components/calcite-option";
//import { CalciteSelect, CalciteOption } from "@esri/calcite-components-react";
import LoadCountriesTask from '../tasks/LoadCountriesTask.js';
import './DropDown.css';

const DropDown = ({ trigger, onClick }) => {

    const [ countries, setCountries ] = useState([]);

   // const [ countryValue, setCountryValue] = useState("United States of America");

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const load = () => {     
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };

    useEffect(load,[]);

    const handleChange = (e) => {
        onClick(e);
        setOpen(!open);
    }

   
    return (
        <div className="dropdown">
            {React.cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
              <ul className="menu">
                {countries.map((menuItem, index) => (
                <li 
                    key={index} 
                    onClick={e => {
                        handleChange(menuItem.properties);
                    }}
                    className="menu-item">
                        {menuItem.properties.ADMIN}
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
        );
};


export default DropDown;