import React, { useState, useEffect } from 'react';
import Legend from './Legend';
import CountriesMap from './CountriesMap';
import LoadCountriesTask from '../tasks/LoadCountriesTask.js';
import { ProgressBar } from 'react-loader-spinner'
import LegendItems from '../entities/LegendItems';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


export const MoviesShowsMap = () => {

    const [ countries, setCountries ] = useState([]);
    const [ country, setCountry ] = useState("");
    const [ numProduced, setNumProduced ] = useState(0);

    const load = () => {     
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };

    useEffect(load,[]);

    function handleChange (country) {
       setCountry(country.ADMIN);
       setNumProduced(country.numText);
    }

    return ( 
        <div>
            {countries.length === 0 ? (
                <ProgressBar/>
            ) : (
                <div>
                     {country.length === 0 ? (
                    <span style={{height: "8vh",  boxShadow: "10px 0 10px #000", color: "white", display: "block", fontSize: "30px", size: "50em", textAlign: "center"}}>
                        <p>Click on each country to see how many movies and tv shows were produced there!</p>
                    </span>
                ) : (
                    <span style={{height: "8vh", boxShadow: "10px 0 10px #000", color: "grey", display: "block", fontSize: "30px", textAlign:"center"}}>
                        <Link 
                            style={{width: "100%", color: "white",  alignContent: "center"}}
                            to={{ 
                            pathname: "/country", 
                            state: {country: country, numProduced: numProduced}
                            }}> 
                            Click HERE to learn more about cinema in {country}!
                        </Link>     
                    </span>          
                )}  
                <CountriesMap 
                    countries={countries} 
                    onClick={handleChange}
                    country={country}
                />
            </div>
      )}
        </div>
     );
}

export default MoviesShowsMap;