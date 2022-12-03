import React from 'react';


const MovieDetailsCard = ({ title: {Title, Year, Language, Overview, Popularity, Runtime, Type, Genres, Companies, Countries, SpokenLanguages, PosterLink, URL, RatingValue, RatingCount }}) => {
  return (<>
 
    <h1 className="app__header-h1">{Title}</h1>
    <div className="app__header app__wrapper section__padding" id="home">
              <div className="app__wrapper_img">
              {/* <img src={movieDetail1.PosterLink !== "N/A" ? movieDetail1.PosterLink : "https://via.placeholder.com/400"} alt={movieDetail1.Title} /> */}
              <img src ={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title}/>
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

                {/* <h1 className="app__header-h1">{Title}</h1> */}
                <p className="p__opensans">Type: {Type} </p>
                <p className="p__opensans">Overview: {Overview} </p>
                <p className="p__opensansBig">More Movie Details: </p>
                <p className="p__opensans">Year: {Year} </p>
                <p className="p__opensans">Country: {Countries} </p>
                <p className="p__opensans">Language: {Language}</p>
                <p className="p__opensans">Genre: {Genres}</p>
                <p className="p__opensans">Popularity: {Popularity}</p>
                <p className="p__opensans">Runtime: {Runtime}</p>
               
              </div>

    </div>
    </>
  );
}
  


export default MovieDetailsCard;