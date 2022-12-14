import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, Dropdown } from "shards-react";
import "./CountryPage.css";
import MovieCardCountry from '../components/MovieCardCountry';
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

import { getCountry } from '../fetcher';
import { getPopularGenreByCountry } from '../fetcher';


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
            popGenre: "Unknown",
            loading: true,
            color: "rgba(0, 0, 0, 0)",
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
        this.updateGenre = this.updateGenre.bind(this)
        this.displayGenre = this.displayGenre.bind(this)
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
         
        this.updateGenre();
        this.setState({ color:  "rgba(0, 0, 0, 0)"});
    }

    updateGenre() {
        console.log("TEST");
        setTimeout(() => {
            getPopularGenreByCountry(this.state.country).then(res => {
            
                this.setState({ popGenre: res.results[0].MostPopularGenre}
                //console.log(res.results[0].MostPopularGenre
                    );
                console.log(res.results[0].Country);
            })
        }, 200)
    }

    displayGenre() {
       // this.updateGenre();
        this.setState({ color:  "#D4F1F4"});
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
        this.setState({ color:  "rgba(0, 0, 0, 0)"})
        this.updateGenre();
    }

    //will set wahtever item the user selects in the dropdown
    handleChange(value) {

        this.setState({ country: value.ADMIN});
        this.setState({ numProduced: value.num});
        this.updateDropdown();
        this.updateGenre();
        this.setState({ color:  "rgba(0, 0, 0, 0)"});
    }


    render() {
        return (
            <div>
                <MenuBar />
                <h1 style={{ paddingLeft: '20px', color: "#68BBE3" }}>{this.state.country}</h1>
                <p style={{ 
                    paddingLeft: '20px', 
                    color: "#D4F1F4", 
                    fontWeight: "400", 
                    fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"  
                }}>Did you know? There are {this.state.numProduced} movies and tv shows from {this.state.country}! <br/> Use the dropdown to select a different country.</p>
                <DropDown
                    trigger={
                        <div style={{ marginTop: "20px", marginBotton: "10px", }}>
                            <p style={{ 
                                borderRadius: '0.375', 
                                width: "15vw", 
                                textAlign: "center", 
                                float:"left", 
                                backgroundColor: "white", 
                                paddingBottom: "2px", 
                                marginRight: "5px", 
                                fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"}}> 
                                {this.state.country}
                            </p>
                            <button style={{ float:"left", fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif" }} >
                                Click Here
                            </button>
                        </div>
                    }
                    onClick={this.handleChange}
                />
                <Divider />
                <h2 style={{color: "#68BBE3", marginLeft: "20%" }}> Movie Trivia</h2>
                <h3 style={{color: "#D4F1F4", marginLeft: "20%" }}>Let's see how well you know this country's cinema!</h3>
                <div>
                    <button className="genre" onClick={this.displayGenre} style={{ backgroundColor: "rgba(0, 0, 0, 0)", marginLeft: "20%", fontSize: "17px", textAlign: "left", fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"}}>
                        Click here to find out the most popular genre from this country! 
                    </button>
                </div>
                <p style={{ color: this.state.color, marginLeft: "30%"}}>{this.state.popGenre}</p>
               
                            <p style={{ marginLeft: "20%", fontSize: "17px", textAlign: "left", color: "#D4F1F4", fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"}}>Can you guess what are the most popular movies and tv shows from this country?
                             Hover over each card<br/> to see if you guessed correctly!  Click on each card to learn more about that movie or show!</p>
                            {this.state.movieDetails?.length > 0 ? (
                                <div className="container" style={{ width: '70vw' }}>
                                    {this.state.movieDetails.map((movie, index) => (
                                        <MovieCardCountry  movie={movie} num={index} />
                                    
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