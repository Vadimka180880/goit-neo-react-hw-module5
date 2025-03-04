import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <ul className={styles.castGrid}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={actor.profile_path 
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : placeholderImage
            }
            alt={actor.name}
          />
          <p><strong>{actor.name}</strong></p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
