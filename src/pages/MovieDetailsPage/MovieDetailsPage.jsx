import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../services/api';
import './MovieDetailsPage.module.css'; 

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  console.log('Movie ID from useParams in MovieDetailsPage:', movieId);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        if (!movieData || movieData.success === false) {
          throw new Error('Movie not found');
        }
        setMovie(movieData);
      } catch (error) {
        console.error(`Error fetching data from /movie/${movieId}`, error);
        setError(true);
      }
    };
    getMovie();
  }, [movieId]);

  if (error) {
    return (
      <div>
        <h1>404 - Movie Not Found</h1>
        <p>Sorry, the movie you are looking for does not exist.</p>
        <Link to="/" className="goHomeButton">Go Home</Link>
      </div>
    );
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movieDetailsContainer">
      {/* Кнопка Go Back */}
      <Link to={location.state?.from ?? '/movies'} className="goBackButton">
        ← Go back
      </Link>

      <div className="movieDetails">
        <img
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
          className="moviePoster"
        />
        <div className="movieInfo">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>

      <h2>Additional Information</h2>
      <ul className="additionalInfo">
        <li>
          <Link to={`/movies/${movieId}/cast`} state={{ from: location.state?.from }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to={`/movies/${movieId}/reviews`} state={{ from: location.state?.from }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
