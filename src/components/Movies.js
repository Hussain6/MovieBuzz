import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context'

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  return (
    isLoading ? <div className=''>
      <div className='loading'>Loading ...</div>
    </div> :
      <section className='movie-page'>
        <div className='container grid grid-4-col'>
          {
            movie.map((currentmovie, key) => {
              const { imdbID, Title, Poster } = currentmovie;
              const movieName = Title.substring(0, 15)
              return (<NavLink to={`movie/${imdbID}`} key={imdbID} >

                <div className='card' >
                  <div className='card-info'>
                    <h2>{movieName.length >= 15 ? `${movieName} ...` : movieName}</h2>
                    <img src={Poster} alt={Title} />
                  </div>
                </div>
              </NavLink>);
            })
          }
        </div>
      </section >
  )
}

export default Movies