import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, Dropdown } from "shards-react";
import "./CountryPage.css";
import MovieCard from '../components/MovieCard';
import DropDown from '../components/DropDown';
import CountriesMap from '../components/CountriesMap';




import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,

} from 'antd'

import { getCountry } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;

//const { country } = countriesMap.country;

class CountryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: "",
            genreQuery: "",
            languageQuery: "",
            releaseYearQuery: "",
            loading: true,
            country: "",
            numProduced: 0,
            movieResults: [],
            selectedMovieId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMovieDetails: null,
            movieDetails: []

        }

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this)
        this.updateDropdown = this.updateDropdown.bind(this)

    }



    handleReleaseYearQueryChange(event) {
        // TASK 10: update state variables appropriately. See handleAwayQueryChange(event) for reference
        this.setState({ releaseYearQuery: event.target.value })

    }

    updateDropdown() {

          setTimeout(() => {

            getCountry(this.state.country).then(res => {
            
                this.setState({ movieDetails: res.results})
            })}, 200)
         

    }

    componentDidMount() {
        try {
            this.setState({ country : this.props.location.state.country.toString() })
        }
        catch(error) {
            this.setState({ country : "United States of America" })
        } 

        try {
            this.setState({ numProduced : this.props.location.state.numProduced })
        }
        catch(error) {
            this.setState({ numProduced : 15902 })
        } 
        
        this.setState({ loading: false });
        this.updateDropdown();
       
    }

    //will set wahtever item the user selects in the dropdown
    handleChange(value) {

        this.setState({ country: value.ADMIN});
        this.setState({ numProduced: value.num});
        this.updateDropdown();
    }


    render() {
        return (
            <div>
                <MenuBar />
                <h1>{this.state.country}</h1>
                <p>Did you know? {this.state.country} has produced {this.state.numProduced} movies and tv shows! </p>
                <DropDown
                    trigger={<button>{this.state.country}</button>}
                    onClick={this.handleChange}
                />
                <Divider />

                            {this.state.movieDetails?.length > 0 ? (
                                <div className="container">
                                    {this.state.movieDetails.map((movie) => (
                                        <MovieCard movie={movie} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                            </div>
                            )}

            </div>
        )
    }
}

export default CountryPage