import React from 'react';
// import { TouchableOpacity } from 'react-native';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


const MovieCard = ({ movie: { Title, PosterLink } }) => {
  return (
    <div className="movie">
      <div>
        <p>Year</p>
      </div>

      <div>
      <Link to="/players">
      {/* <Redirect to={{ pathname: 'players', movie: { Title, PosterLink} }} /> */}
        <img src={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
       
        </Link>
      </div>

      <div>
        <span>Movie</span>
        <h3>{Title}</h3>
      </div>
     
    </div>
  );
}

export default MovieCard;