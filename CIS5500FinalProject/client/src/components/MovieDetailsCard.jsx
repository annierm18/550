import React from 'react';


const MovieDetailsCard = ({ title: {Title, Year, Language, Overview, Popularity, Runtime, Type, Genres, Countries, PosterLink, URL }}) => {
  return (<>
 
    <h1 className="md__header-h1">{Title}</h1>
    <div className="md__header app__wrapper section__padding" id="home">
              <div className="app__wrapper_img">
              <img src ={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
              </div>
              <div className="app__wrapper_info">
                <p className="movieDetailLabel"> Type: <span className="movieDetailText">{Type} </span></p>
                <p className="movieDetailLabel"> Overview: <span className="movieDetailText">{Overview} </span></p>
                <p className="mdBig">More Details: </p>
                <p className="movieDetailLabel"> Year: <span className="movieDetailText">{Year} </span></p>
                <p className="movieDetailLabel"> Country: <span className="movieDetailText">{Countries} </span></p>
                <p className="movieDetailLabel"> Language: <span className="movieDetailText">{Language} </span></p>
                <p className="movieDetailLabel"> Genre: <span className="movieDetailText">{Genres} </span></p>
                <p className="movieDetailLabel"> Popularity: <span className="movieDetailText">{Popularity} (million) </span></p>
                <p className="movieDetailLabel"> Runtime: <span className="movieDetailText">{Runtime} minutes </span></p>
                <p className="movieDetailLabel">IMDB: <span className="movieDetailText"><a href = {URL} target ="_blank">{URL}</a> </span></p>
              </div>

    </div>
    </>
  );
}
  


export default MovieDetailsCard;