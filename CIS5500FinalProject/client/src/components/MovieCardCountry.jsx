import React from 'react';
// import { TouchableOpacity } from 'react-native';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


const MovieCardCountry = ({ movie: { Title, PosterLink, Year} }) => {
  return (
    <div className="movie" style={{ width: '13vw', height: '16vw'  }}>
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

      <div style={{ height: '130px'  }}>
        <span>Movie</span>
        <h3>{Title}</h3>
        {/* <span> Test */}
        {/* <Redirect to={{ pathname: '/players', movie: { Title, PosterLink, Year} }} /> */}
        {/* </span> */}
      </div>
     
    </div>
  );
}


export default MovieCardCountry;