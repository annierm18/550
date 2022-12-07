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
   // const [ onClick, setOnClick] = useState("");
    const LegendItemsInReverse = [...LegendItems].reverse();

    const load = () => {     
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };

    useEffect(load,[]);

    useEffect(() => {
        document.title = `You clicked ${country} times`;
      }, [country]); 

    function handleChange (country) {
       setCountry( country);
    }

    return ( 
        <div>
            {countries.length === 0 ? (
                <ProgressBar/>
            ) : (
                <div>
                     {country.length === 0 ? (
                    <span style={{height: "5vh", display: "block", fontSize: "20px", size: "50em", backgroundColor: "white", textAlign: "center"}}>
                        <p>Click on each country to see how many movies and tv shows were produced there!</p>
                    </span>
                ) : (
                    <span style={{height: "5vh", display: "block", fontSize: "20px", backgroundColor: "white", textAlign:"center"}}>
                        <Link 
                            style={{width: "100%", color: "black",  size: "50em", backgroundColor: "white", alignContent: "center"}}
                            to={{ 
                            pathname: "/country", 
                            state: {country: country }
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
                
                <Legend legendItems={LegendItemsInReverse} />
        </div>
      )}
        </div>
     );
}

export default MoviesShowsMap;