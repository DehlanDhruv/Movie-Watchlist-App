import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoviesResults } from '../../utils/movieSlice';

const useMoviesResults = () => {
  const dispatch = useDispatch();
  const apiCall = useSelector((state) => state.search.list);

  const getMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_OMDB_KEY}`);
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  const getMovies = async () => {
    try {
      const encodedMovieName = encodeURIComponent(apiCall);
      const response = await fetch(`https://www.omdbapi.com/?s=${encodedMovieName}&apikey=${process.env.REACT_APP_OMDB_KEY}`);
      const data = await response.json();

      console.log(encodedMovieName)

      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map((movie) => getMovieDetails(movie.imdbID))
        );

        const filteredMovies = detailedMovies.filter(movie => movie !== null);
        dispatch(addMoviesResults(filteredMovies));
      } else {
        dispatch(addMoviesResults([])); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (apiCall) {
      getMovies();
    }
  }, [apiCall]);
};

export default useMoviesResults;


