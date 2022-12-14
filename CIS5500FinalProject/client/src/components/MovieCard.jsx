import React from 'react';
import {Link} from 'react-router-dom';


const MovieCard = ({ movie: { Title, PosterLink, Year} }) => {
  return (
    <div className="movie">
      <div>
        <p>Year: {Year}</p>
      </div>

      <div>
      <Link to={{ 
        pathname: "/movieDetails", 
        state: {movie: { Title, Year} }
        }}>
          <img src={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
        </Link>
      </div>

      <div>
        <h3>{Title}</h3>
      </div>
     
    </div>
  );
}


export default MovieCard;