import React from 'react';
import { Form, FormInput, FormGroup, Button } from "shards-react";
import "./RecommendationsPage.css";
import MovieCard from '../components/MovieCard';
import "antd/dist/antd.css";


import {
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import { getFilteredMovieResults, getTenMostPopular } from '../fetcher'


import MenuBar from '../components/MenuBar';

const pageSize = 15;

class RecommendationsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genreQuery: "",
            languageQuery: "",
            releaseYearQuery: "",
            movieResults: [],
            movieDetails: [],
            totalPage:0,
            current:1,
            minIndex: 0,
            maxIndex: 0
        }

        this.handleGenreQueryChange = this.handleGenreQueryChange.bind(this)
        this.handleLanguageQueryChange = this.handleLanguageQueryChange.bind(this)
        this.handleReleaseYearQueryChange = this.handleReleaseYearQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
    }

    handleGenreQueryChange(event) {
        this.setState({ genreQuery: event.target.value })
    }

    handleLanguageQueryChange(event) {
        this.setState({ languageQuery: event.target.value })
        console.log("LANGUAGE1: " + this.state.languageQuery)
    }

    handleReleaseYearQueryChange(event) {
        this.setState({ releaseYearQuery: event.target.value })

    }

    updateSearchResults() {
        
        getFilteredMovieResults(this.state.languageQuery, this.state.genreQuery, this.state.releaseYearQuery).then(res => {
            this.setState({ movieDetails: res.results})
            localStorage.setItem('movieDetailsState', JSON.stringify(this.state))
        })
    }

    componentDidMount() {

        if(this.props.history.action === "POP") {
            if (localStorage.getItem('movieDetailsState')) {
                this.setState(JSON.parse(localStorage.getItem('movieDetailsState')))
            }
    } else {
        getTenMostPopular().then(res => {
            this.setState({ 
                movieDetails: res.results, 
                totalPage: res.results.length / pageSize, 
                minIndex: 0, 
                maxIndex: pageSize})
                localStorage.setItem('movieDetailsState', JSON.stringify(this.state))
        })
    }
    }


    handleChange = (page) => {
        this.setState({
          current: page,
          minIndex: (page - 1) * pageSize,
          maxIndex: page * pageSize
        });
        localStorage.setItem('movieDetailsState', JSON.stringify(this.state))
      };

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h1>Explore New Movies!</h1>
                    <h3>Find popular movies in your favorite genre, language, and release year</h3>
                    </div>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Genre</b></label>
                            <FormInput placeholder="Comedy" defaultValue={this.state.genreQuery} onChange={this.handleGenreQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Language</b></label>
                            <FormInput placeholder="en" defaultValue={this.state.languageQuery} onChange={this.handleLanguageQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Release Year</b></label>
                            <FormInput placeholder="2001" defaultValue={this.state.releaseYearQuery} onChange={this.handleReleaseYearQueryChange} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto'}}>
                            <Button theme="light" style={{ marginTop: '1.8rem' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                            {this.state.movieDetails?.length > 0 ? (
                                <div>
                                <div className="container">
                                    {this.state.movieDetails.map((movie, index) => index >= this.state.minIndex && index < this.state.maxIndex &&  (
                                        <MovieCard movie={movie} />
                                        
                                ))}
                                
                            </div>
                            <div className='pagination'>
                            <Pagination
                                    pageSize = {pageSize}
                                    current = {this.state.current}
                                    total = {this.state.movieDetails.length}
                                    onChange={this.handleChange}
                                    showSizeChanger= {false}

                                />
                            </div>
                            </div>
                            ) : (
                            <div className="empty">
                                <h2>No movies found.   Try another filter!</h2>
                            </div>
                            )}

            </div>
        )
    }
}

export default RecommendationsPage

