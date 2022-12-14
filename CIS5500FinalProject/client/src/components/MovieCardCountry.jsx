import React from 'react';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


const MovieCardCountry = ({ movie: { Title, PosterLink, Year}, num }) => {
  return (
    <div className="movieCountry" style={{ width: '13vw', height: '16vw'  }}>
      <div>
        <p>{Title}</p>
      </div>
      <div>
      <Link to={{ 
        pathname: "/movieDetails", 
        state: {movie: { Title, Year} }
        }}>
          <img src={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
        </Link>
      </div>
      <div >
        <span>{num + 1}</span>
      </div>     
    </div>
  );
}


export default MovieCardCountry;