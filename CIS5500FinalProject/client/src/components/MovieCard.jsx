import React from 'react';
// import { TouchableOpacity } from 'react-native';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


const MovieCard = ({ movie: { Title, PosterLink, Year} }) => {
  return (
    <div className="movie">
      <div>
        <p>Year: {Year}</p>
      </div>

      <div>
      {/* <Link to="/players"> */}
      <Link to={{ 
        pathname: "/movieDetails", 
        state: {movie: { Title, Year} }
        }}>
          <img src={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
        </Link>
        {/* </Link> */}
      </div>

      <div>
        <span>Movie</span>
        <h3>{Title}</h3>
        {/* <span> Test */}
        {/* <Redirect to={{ pathname: '/players', movie: { Title, PosterLink, Year} }} /> */}
        {/* </span> */}
      </div>
     
    </div>
  );
}


export default MovieCard;