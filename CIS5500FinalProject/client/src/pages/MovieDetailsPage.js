import React from 'react';
import MovieDetailsCard from '../components/MovieDetailsCard';
import "./MovieDetailsPage.css";
import { getMovie } from '../fetcher'
import MenuBar from '../components/MenuBar';


class MovieDetailsPage extends React.Component {
  
  constructor(props) {
      super(props)
      this.state = {
          titleQuery: '',
          yearQuery: '',
          movieDetailResults: [],
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
          this.setState({ movieDetailResults: res.results })
      })

  }

  render() {
    return (
        <div>
            <MenuBar />
                {this.state.movieDetailResults?.length > 0 ? (
                                <div className="container">
                                    {this.state.movieDetailResults.map((title) => (
                                        <MovieDetailsCard title={title} />
                                ))}
                            </div>
                            ) : (
                            <div className="empty">
                                <h2>{this.state.movieDetails?.length}</h2>
                                <h2>No movie found</h2>
                            </div>
                            )}
          
  </div>

    )
  }
}

    export default MovieDetailsPage