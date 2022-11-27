import React from 'react';

const MovieDetailsCard = ({ title: {Title, Year, Language, Overview, Popularity, Runtime, Type, Genres, Companies, Countries, SpokenLanguages, PosterLink, URL, RatingValue, RatingCount }}) => (
  <div style={{ marginBottom: '1rem' }}>
    <p className="p__cormorant">{Title}</p>
    <img src={PosterLink !== "N/A" ? PosterLink : "https://via.placeholder.com/400"} alt={Title} />
  </div>

);

export default MovieDetailsCard;