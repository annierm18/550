import React from 'react';
import MovieDetailsCard from '../components/MovieDetailsCard';
import "./MovieDetailsPage.css";

import { getMovie } from '../fetcher'
import MenuBar from '../components/MenuBar';
import MovieCard from '../components/MovieCard';
// import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
// import { useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';



// const location = useLocation();
// const { from } = location.state
// const navigate = useNavigate();


const movieDetail1 = [{"Title":"Inception",
"Year":2010,
"Language":"en",
"Overview":"Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
"Popularity":29.1081,
"Runtime":148,
"Type":"movie",
"Genres":"Action, Adventure, Mystery, Sci-Fi, ScienceFiction, Thriller",
"Companies":"Legendary Pictures, Syncopy, Warner Bros.",
"Countries":"United Kingdom, United States of America","SpokenLanguages":"English",
"PosterLink":"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
"URL":"https://www.imdb.com/title/tt1375666/",
"RatingValue":8.8,
"RatingCount":2050656}]

class MovieDetailsPage extends React.Component {
  
  constructor(props) {
      super(props)
      this.state = {
          titleQuery: '',
          yearQuery: '',
          selectedMovieDetailsId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
          selectedMovieDetails: null,
          movieDetailResults: [],
          // movie: null

      }

      this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleTitleQueryChange = this.handleTitleQueryChange.bind(this)
        this.handleYearQueryChange = this.handleYearQueryChange.bind(this)
        
    }


    handleTitleQueryChange(event) {
      this.setState({ titleQuery: event.target.value })
  }

  handleYearQueryChange(event) {
      this.setState({ yearQuery: event.target.value })
  }


  updateSearchResults(props) {

      getMovie(this.state.titleQuery, this.state.YearQuery).then(res => {
          this.setState({ movieDetailResults: res.results })
      })
  }

  componentDidMount(props) {
    
      getMovie(this.props.location.state.movie.Title, this.props.location.state.movie.Year).then(res => {
        // {console.log("TITLEPRINT:: " + this.props.location.state.movie.Title)}
      // getMovie(this.state.titleQuery, this.state.YearQuery).then(res => {
          this.setState({ movieDetailResults: res.results })
        //   {console.log("resresults: " + res.results)}
        //   {console.log("RESULTS PRINT!!!: " + JSON.stringify(this.props))}
        //   {console.log("movieDETAILSPRINT: " + this.state.movieDetailResults)}
          
      })

  }

  render() {
    console.log(JSON.stringify(this.props.location))
    return (
        <div>
            <MenuBar />
            {/* <Button style={{ marginTop: '2.4vh' }} onClick={this.updateSearchResults}>Search</Button> */}
            {/* <button
              className="button icon-left"
              onClick={this.context.router.history.goBack}>
                Back
            </button> */}

                {this.state.movieDetailResults?.length > 0 ? (
                                <div className="container">
                                    {this.state.movieDetailResults.map((title) => (
                                        <MovieDetailsCard title={title} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                                {/* {console.log("PRINTING!!!: " + this.state.movieDetails)} */}
                                <h2>{this.state.movieDetails?.length}</h2>
                                <h2>No movies found</h2>
                            </div>
                            )}
          
  </div>

  
    )

  
  }
}

    export default MovieDetailsPage