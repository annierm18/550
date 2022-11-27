import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import "./RecommendationsPage.css";
import MovieCard from '../components/MovieCard';


import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,

} from 'antd'

import { getFilteredMovieResults, getTenMostPopular } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
const movie1 = [{"Title":"...All the Marbles","PosterLink":"https://m.media-amazon.com/images/M/MV5BNWVmNTc5NGMtMDIzMC00NTczLWFhOWQtNDYzOTAwMjU1ODc0XkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_.jpg"},
    {"Title":"Zombies of the Stratosphere","PosterLink":"https://m.media-amazon.com/images/M/MV5BMTc5NjA5MTQ4M15BMl5BanBnXkFtZTcwMzU3MjE5Mw@@._V1_.jpg"},
    {"Title":"Zone Troopers","PosterLink":"https://m.media-amazon.com/images/M/MV5BNGM4ZmQwMDItZmYxYS00YTBhLTg5NjktYTlhZGI1NThmZGY1XkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_.jpg"},
    {"Title":"Zoolander 2","PosterLink":"https://m.media-amazon.com/images/M/MV5BMjI2MjQxNTQzOV5BMl5BanBnXkFtZTgwMDE2MTY2NzE@._V1_.jpg"},
    {"Title":"Zoom","PosterLink":"https://m.media-amazon.com/images/M/MV5BMTM0NjczMzUyM15BMl5BanBnXkFtZTcwMDEwMjQzMQ@@._V1_.jpg"},
    {"Title":"Zoombies","PosterLink":"https://m.media-amazon.com/images/M/MV5BMDZiMTU0ZmUtY2U1Ni00MzY3LWI4NjMtNzY4ZDFkYmQ5OGM3XkEyXkFqcGdeQXVyNjUyNjMzMzU@._V1_.jpg"},
    {"Title":"Zulu","PosterLink":"https://m.media-amazon.com/images/M/MV5BYzdlYmQ3MWMtMDY3My00MzVmLTg0YmMtYjRlZDUzNjBlMmE0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg"},
    {"Title":"Zulu","PosterLink":"https://m.media-amazon.com/images/M/MV5BMjA0NjE1OTI0M15BMl5BanBnXkFtZTgwMDkyNTM3MDE@._V1_.jpg"}];


class MatchesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genreQuery: "",
            languageQuery: "",
            releaseYearQuery: "",
            movieResults: [],
            selectedMovieId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMovieDetails: null,
            movieDetails: []

        }

        this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this)
        this.handleLanguageQueryChange = this.handleLanguageQueryChange.bind(this)
        this.handleReleaseYearQueryChange = this.handleReleaseYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToMatch = this.goToMatch.bind(this)
    }



    handleGenreQueryChange(event) {
        this.setState({ genreQuery: event.target.value })
    }

    handleLanguageQueryChange(event) {
        this.setState({ languageQuery: event.target.value })
        console.log("LANGUAGE1: " + this.state.languageQuery)
    }

    handleReleaseYearQueryChange(event) {
        // TASK 10: update state variables appropriately. See handleAwayQueryChange(event) for reference
        this.setState({ releaseYearQuery: event.target.value })

    }
    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }

    updateSearchResults() {
        //TASK 11: call getMatchSearch and update matchesResults in state. See componentDidMount() for a hint
        getFilteredMovieResults(this.state.languageQuery, this.state.genreQuery, this.state.releaseYearQuery).then(res => {
            console.log("PRINTING: " +  " langauge:" + this.state.languageQuery + " genre" + this.state.genreQuery + " releaseYear" + this.state.releaseYearQuery)
            this.setState({ movieDetails: res.results })
            console.log("RESULTS " + this.state.movieDetails)
        })
    }

    componentDidMount() {
        getTenMostPopular().then(res => {
            this.setState({ movieDetails: res.results})
        })

        // getFilteredMovieResults(this.state.genreQuery, this.state.languageQuery, this.state.releaseYearQuery).then(res => {
        //     console.log("PRINTING: " + this.state.movieDetails)
        //     this.setState({movieDetails: res.results})
        // })
        
        
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h1>Find Your Favorite Movie!</h1>
                    </div>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Genre</label>
                            <FormInput placeholder="Genre" defaultValue={this.state.genreQuery} onChange={this.handleGenreQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Language</label>
                            <FormInput placeholder="en" defaultValue={this.state.languageQuery} onChange={this.handleLanguageQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Release Year</label>
                            <FormInput placeholder="1999" defaultValue={this.state.releaseYearQuery} onChange={this.handleReleaseYearQueryChange} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '2.4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* {movie1?.length > 0 ? (
                                <div className="container">
                                    {movie1.map((movie) => (
                                        <MovieCard movie={movie} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                                <h2>No movies found</h2>
                            </div>
                            )} */}


                            {this.state.movieDetails?.length > 0 ? (
                                <div className="container">
                                    {this.state.movieDetails.map((movie) => (
                                        <MovieCard movie={movie} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                                {console.log("PRINTING!!!: " + this.state.movieDetails)}
                                <h2>{this.state.movieDetails?.length}</h2>
                                <h2>No movies found</h2>
                            </div>
                            )}

 

            </div>
        )
    }
}

export default MatchesPage

