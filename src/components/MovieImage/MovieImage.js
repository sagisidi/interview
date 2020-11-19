import React from 'react';


const MovieImage = ({urls}) => {
  return (
            <div className="image-cont">
            {
                urls.map( (url,index) => {

                    return(
						<img src={url} alt="movie" key={`${url}-${index}`}/>                 
                    )
                })
            }
            </div>
  );
}

export default MovieImage;
