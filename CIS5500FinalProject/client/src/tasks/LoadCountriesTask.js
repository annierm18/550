import countries from "../data/countries.json"
import LegendItems from "../entities/LegendItems";
import { getNumMoviesByCountry } from '../fetcher.js';


class LoadCountriesTask {

    setState = null;

    load = (setState) => {
        this.setState = setState;

        var numPerCountry = this.#processCountryNum();

        const getCountryData = () => {
            numPerCountry.then((a) => {
                if (a !== null && a !== undefined) {
                    this.#processCountryData(a);
                }            
            });
          };        
        getCountryData();         
    };

    #processCountryNum = async () => {
        var results = null;

        await getNumMoviesByCountry().then(res => {
            results = res.results;
        })
        return results;
    }

    #processCountryData = (moviesProducedPerCountry) => {
        for (let i = 0; i < countries.features.length; i++) {
            const mapCountry = countries.features[i];
            const numPerCountry = moviesProducedPerCountry.find(
                (numPerCountry) => mapCountry.properties.ADMIN === numPerCountry.Country
            );

            mapCountry.properties.num = 0;
            mapCountry.properties.numText = 0;

            if (numPerCountry != null) {
                const numProduced = Number(numPerCountry.NumMovies)
                    mapCountry.properties.num = numProduced;
                    mapCountry.properties.numText = numProduced;
            }
            this.#setCountryColor(mapCountry);
        }
        this.setState(countries.features);
    };

    #setCountryColor = (mapCountry) => {
        const legendItem = LegendItems.find((legendItem) => 
            legendItem.isFor(mapCountry.properties.num)
        );

        if (legendItem != null) {
            mapCountry.properties.color = legendItem.color;
        }
    }

}

export default LoadCountriesTask;