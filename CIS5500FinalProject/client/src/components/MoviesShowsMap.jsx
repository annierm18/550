import React, { useState, useEffect } from 'react';
import Legend from './Legend';
import CountriesMap from './CountriesMap';
import LoadCountriesTask from '../tasks/LoadCountriesTask.js';
import { ProgressBar } from 'react-loader-spinner'
import LegendItems from '../entities/LegendItems';

export const MoviesShowsMap = () => {

    const [ countries, setCountries ] = useState([]);
    const LegendItemsInReverse = [...LegendItems].reverse();

    const load = () => {     
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    };

    useEffect(load,[]);

    return ( 
        <div>
            {countries.length === 0 ? (
                <ProgressBar/>
            ) : (
                <div>
                <CountriesMap countries={countries} />
                <Legend legendItems={LegendItemsInReverse} />
        </div>
      )}
        </div>
     );
}

export default MoviesShowsMap;