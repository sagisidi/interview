import React from 'react';
import MovieImage from '../MovieImage/MovieImage';


const MovieList = ({list,title,onClickFn,buttonText}) => {
  return (
            <div className="movie-cont">
                <h2>{title}</h2>
            {
                list.map( (movie) => {
                    return(
                        <div className="movie" key={movie._id}>
                            <p className="movie-name">{movie.title}</p>
                            <p>Rating: {movie.rating} / 5 </p>
                            <MovieImage urls={movie.imagesUrl} />

                                <button onClick={()=>onClickFn(movie)}
                                className="add-button">
                                    {buttonText}
                                </button>
                        </div>                  
                    )
                })
            }
            </div>
  );
}

export default MovieList;
