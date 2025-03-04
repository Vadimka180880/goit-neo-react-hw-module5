import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
    });
    console.log(`✅ Data received from ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching data from ${endpoint}:`, error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  const data = await fetchData('/trending/movie/day');
  return data?.results || [];
};

export const fetchMovieDetails = async (movieId) => {
  return await fetchData(`/movie/${movieId}`);
};

export const fetchMovieCast = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/credits`);
  return data?.cast || [];
};

export const fetchMovieReviews = async (movieId) => {
  const data = await fetchData(`/movie/${movieId}/reviews`);
  return data?.results || [];
};

export const fetchMoviesByQuery = async (query) => {
  console.log(`📡 Fetching movies for query: "${query}"`);
  const data = await fetchData('/search/movie', { query });
  return data?.results || [];
};
