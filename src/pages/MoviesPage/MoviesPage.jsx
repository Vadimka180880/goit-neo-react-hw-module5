import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetchMoviesByQuery(query).then(setMovies);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.trim();
    if (!newQuery) return;
    setSearchParams({ query: newQuery });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link 
              to={`/movies/${movie.id}`} 
              state={{ from: `/movies?query=${query}` }} 
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
