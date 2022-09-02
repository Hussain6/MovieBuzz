import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
import { API_URL } from '../context';
const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data)
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 800);
    return () => clearTimeout(timeOut);
  }, [id]);

  return (
    isLoading ? <div className='movie-section'>
      <div className='loading'>Loading ...</div>
    </div> : <section className='movie-section'>
      <div className='movie-card'>
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className='card-content'>
          <p className='title'>{movie.Title}</p>
          <p className=''></p>
          <p className='card-text'>{movie.Released}</p>
          <p className='card-text'>{movie.Genre}</p>
          <p className='card-text'>{movie.imdbRating}</p>
          <p className='card-text'>{movie.Country}</p>
          <NavLink to="/" className='back-btn'>Go Back</NavLink>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie