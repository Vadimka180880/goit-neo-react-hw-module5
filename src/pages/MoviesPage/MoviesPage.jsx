import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.searchQuery) {
      setQuery(location.state.searchQuery);
      fetchMoviesByQuery(location.state.searchQuery).then(setMovies);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    fetchMoviesByQuery(query).then(setMovies);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ searchQuery: query }} 
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
