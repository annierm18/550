import React from 'react';
import "./CountryPage.css";
import MovieCardCountry from '../components/MovieCardCountry';
import DropDown from '../components/DropDown';
import { getCountry } from '../fetcher';
import { getPopularGenreByCountry } from '../fetcher';
import MenuBar from '../components/MenuBar';

import {
    Divider,
} from 'antd'


class CountryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: "",
            genreQuery: "",
            languageQuery: "",
            releaseYearQuery: "",
            popGenre: "Unknown",
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
    }

    handleReleaseYearQueryChange(event) {
        this.setState({ releaseYearQuery: event.target.value })
    }

    updateDropdown() {
          setTimeout(() => {
            getCountry(this.state.country).then(res => {
            
                this.setState({ movieDetails: res.results})
            })}, 200)        
        this.updateGenre();
    }

    updateGenre() {
        setTimeout(() => {
            getPopularGenreByCountry(this.state.country).then(res => {  
                if  (res.results !== null && res.results.length > 0){        
                    this.setState({ popGenre: res.results[0].MostPopularGenre});
                } else {
                    this.setState({ popGenre: "unknown"});
                }
            })
        }, 50)
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
        
        this.updateDropdown();
        this.updateGenre();
    }

    //will set wahtever item the user selects in the dropdown
    handleChange(value) {

        this.setState({ country: value.ADMIN});
        this.setState({ numProduced: value.num});
        this.updateDropdown();
        this.updateGenre();
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
                    fontSize: "20px",
                    fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"  
                }}><b style={{fontSize: "20px" }}>Did you know?</b> There are <b style={{color: "#68BBE3" }}>{this.state.numProduced}</b> movies and tv shows from {this.state.country} and  
                <b style={{color: "#68BBE3" }}> {this.state.popGenre}</b> is the most popular genre!<br/></p>
                <p style={{ 
                    paddingLeft: '20px', 
                    color: "#D4F1F4", 
                    fontWeight: "400", 
                    marginTop: "2px",
                    fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"  
                }}> Check below for more movie trivia and use the dropdown to select a different country.</p>
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
                <div style={{width: "100%"}}>
                    <p style={{color: "#68BBE3", fontSize: "25px", textAlign: "center"}}> Movie Trivia Continued!</p>
                    {/** 
                    <div style={{width: "100%", textAlign: "center"}}>
                        <button className="genre" onClick={this.displayGenre} style={{ float: "center", backgroundColor: "rgba(0, 0, 0, 0)", fontSize: "17px", textAlign: "center", fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"}}>
                            Click here to find out the most popular genre from this country... 
                        </button>
                        <p style={{ color: this.state.color, textAlign: "center", float: "center"}}>{this.state.popGenre}!</p>
                    </div>
                */}
                </div>
                            <p style={{ fontSize: "20px", fontWeight: "400", width: "100%", textAlign: "center", color: "#D4F1F4", fontFamily: "Poppins,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"}}>
                                What are the <b style={{color: "#68BBE3" }}>most popular</b> movies and tv shows from this country?<br/>
                                <b style={{color: "#68BBE3" }}>Hover</b> over each to see if you guessed correctly or <b style={{color: "#68BBE3" }}>click</b> each to learn more!</p>
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