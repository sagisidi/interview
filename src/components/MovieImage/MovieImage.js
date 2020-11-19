import React from 'react';


const MovieImage = ({urls}) => {
  return (
            <div className="image-cont">
            {
                urls.map( (url) => {
                    return(
						<img src={url} alt="movie"/>                 
                    )
                })
            }
            </div>
  );
}

export default MovieImage;
