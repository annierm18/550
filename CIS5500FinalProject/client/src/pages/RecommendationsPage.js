import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import "./RecommendationsPage.css";
import MovieCard from '../components/MovieCard';
// import Pagination from '../components/Pagination';
import "antd/dist/antd.css";


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
const pageSize = 15;

class RecommendationsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            genreQuery: "",
            languageQuery: "",
            releaseYearQuery: "",
            movieResults: [],
            selectedMovieId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedMovieDetails: null,
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
        
        getFilteredMovieResults(this.state.languageQuery, this.state.genreQuery, this.state.releaseYearQuery).then(res => {
            console.log("PRINTING: " +  " langauge:" + this.state.languageQuery + " genre" + this.state.genreQuery + " releaseYear" + this.state.releaseYearQuery)
            this.setState({ movieDetails: res.results})
            //localStorage.setItem('movieDetails', JSON.stringify(res.results))
            localStorage.setItem('movieDetailsState', JSON.stringify(this.state))
        })
    }

    componentDidMount() {

        if(this.props.history.action == "POP") {
            console.log("HEREEEEE")
            if (localStorage.getItem('movieDetailsState')) {
                //this.state = JSON.parse(localStorage.getItem('movieDetailsState'))
                this.setState(JSON.parse(localStorage.getItem('movieDetailsState')))
                console.log("LOCAL STORAGE MOVIES:: " + localStorage.getItem('movieDetailsState'))
                // this.setState({
                //     movieDetails: JSON.parse(localStorage.getItem('movieDetails')),
                //     totalPage: JSON.parse(localStorage.getItem('movieDetails')) / pageSize, 
                //     minIndex: 0, 
                //     maxIndex: pageSize
                // })
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
        //.finally(localStorage.setItem('movieDetails', JSON.stringify(this.state.movieDetails)))
        // .then(localStorage.setItem('movieDetailsState', JSON.stringify(this.state)))

    }

        {console.log("RESULTS PRINT2!!!: " + JSON.stringify(this.props))}

        {console.log("Final State at end of Mount:: "+ JSON.stringify(this.state))}
    }


    handleChange = (page) => {
        this.setState({
          current: page,
          minIndex: (page - 1) * pageSize,
          maxIndex: page * pageSize
        });
        localStorage.setItem('movieDetailsState', JSON.stringify(this.state))
        {console.log("PAGE????: " + page)}
      };

    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <h1>Movie Browser</h1>
                    </div>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Genre</b></label>
                            <FormInput placeholder="Genre" defaultValue={this.state.genreQuery} onChange={this.handleGenreQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Language</b></label>
                            <FormInput placeholder="en" defaultValue={this.state.languageQuery} onChange={this.handleLanguageQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label><b>Release Year</b></label>
                            <FormInput placeholder="1999" defaultValue={this.state.releaseYearQuery} onChange={this.handleReleaseYearQueryChange} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto'}}>
                            <Button theme="light" style={{ marginTop: '1.8rem' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {console.log("IS IT HERE?")}
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
                                    // pageSizeOptions= {[]}
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

