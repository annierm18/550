import React from 'react';
import MoviesShowsMap from '../components/MoviesShowsMap';
import MenuBar from '../components/MenuBar';


class HomePage extends React.Component {

  render() {

    return (
      <>
        <MenuBar />
        <MoviesShowsMap />
      </>

    )
  }

}

export default HomePage

