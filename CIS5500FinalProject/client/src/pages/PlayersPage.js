import React from 'react';
import MovieDetailsCard from '../components/MovieDetailsCard';
import "./MovieDetailsPage.css";

import { getMovie } from '../fetcher'
import MenuBar from '../components/MenuBar';

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

class PlayersPage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          titleQuery: '',
          yearQuery: '',
          selectedMovieDetailsId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
          selectedMovieDetails: null,
          movieDetailResults: []

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


  updateSearchResults() {

      getMovie(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
          this.setState({ playersResults: res.results })
      })
  }

  componentDidMount() {
      getMovie(this.state.titleQuery, this.state.YearQuery).then(res => {
          this.setState({ movieDetailResults: res.results })
      })

  }

  render() {
    return (
        <div>
            <MenuBar />

            <div className="app__header app__wrapper section__padding" id="home">
              <div className="app__wrapper_img">
              {/* <img src={movieDetail1.PosterLink !== "N/A" ? movieDetail1.PosterLink : "https://via.placeholder.com/400"} alt={movieDetail1.Title} /> */}
              <img src ={"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"}/>
              </div>
              <div className="app__wrapper_info">
                {/* <MovieDetailsCard title="Chase the new flavour" /> */}

                {/* {this.state.movieDetailResults?.length > 0 ? (
                                <div className="container">
                                    {this.state.movieDetailResults.map((title) => (
                                        <MovieDetailsCard movie={title} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                                {console.log("PRINTING!!!: " + this.state.movieDetails)}
                                <h2>{this.state.movieDetails?.length}</h2>
                                <h2>No movies found</h2>
                            </div>
                            )} */}

                <h1 className="app__header-h1">Inception</h1>
                <p className="p__opensans">Type: </p>
                <p className="p__opensans">Overview: Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious. </p>
                <p className="p__opensansBig">More Movie Details: </p>
                <p className="p__opensans">Year: {this.state.yearQuery} </p>
                <p className="p__opensans">Country: </p>
                <p className="p__opensans">Language:  </p>
                <p className="p__opensans">Genre: </p>
                <p className="p__opensans">Popularity: </p>
                <p className="p__opensans">Runtime: </p>
               
              </div>

    </div>
  </div>
    )}
}

    export default PlayersPage