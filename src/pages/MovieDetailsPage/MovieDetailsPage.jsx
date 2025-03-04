import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  console.log('Movie ID from useParams in MovieDetailsPage:', movieId);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
        <Link to={location.state?.from ?? '/movies'} state={location.state}>
        🔙 Go Back
      </Link>

      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <h2>Additional Information</h2>
      <ul>
        <li>
          <Link to="cast" state={location.state}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={location.state}>Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
