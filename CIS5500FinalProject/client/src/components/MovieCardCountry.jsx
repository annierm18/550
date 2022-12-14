import React from 'react';
// import { TouchableOpacity } from 'react-native';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


const MovieCardCountry = ({ movie: { Title, PosterLink, Year}, num }) => {
  //var num = index;
  console.log(num);
  return (
    <div className="movie" style={{ width: '13vw', height: '16vw'  }}>
      <div>
        <p>{Title}</p>
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

      <div >
        <span>{num + 1}</span>
  
        {/* <span> Test */}
        {/* <Redirect to={{ pathname: '/players', movie: { Title, PosterLink, Year} }} /> */}
        {/* </span> */}
      </div>
     
    </div>
  );
}


export default MovieCardCountry;