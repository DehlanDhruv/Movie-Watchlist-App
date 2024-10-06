import React from 'react';
import Header from './Header';
import MovieCard from './MovieCard';
import './Browse.css';
import LeftPanel from './LeftPanel';

const Browse = () => {

  return (
    <div>
      <Header />
      <div className='browseContainer'>
        <LeftPanel/>
        <MovieCard />
      </div>       
    </div>
  );
};

export default Browse;


