import React from 'react';
import './Profile.css'
import MovieImage from '../MovieImage/MovieImage';
class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            wishlist: []
        }
    }


    componentDidMount () {
            fetch('http://localhost:8080/profile', {
                method: 'get',
                headers: { 
                  'Content-type': 'application/json',
                  'Authorization': this.props.token
                }
            })
            .then(response => response.json())
            .then(result => {
                this.setState({movies:result.movies,wishlist:result.wishlist});
            })
            .catch(err => {
                console.log(err);
            })
    }

    addToWish = (movie) => {
        const token = window.sessionStorage.getItem('token')
        fetch('http://localhost:8080/profile', {
            method: 'POST',
            headers: { 
              'Content-type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({title:movie.title})
        })
        .then(response => response.json())
        .then(userdata => {
            if(userdata === "succeed"){
                const joined = this.state.wishlist.concat(movie);
                this.setState({wishlist:joined})                
            }

        })
        .catch(err => {
            console.log(err);
        })         
        
    }

    deleteFromWish = (movie) => {
        const token = window.sessionStorage.getItem('token')
        fetch('http://localhost:8080/profile', {
            method: 'DELETE',
            headers: { 
              'Content-type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({title:movie.title})
        })
        .then(response => response.json())
        .then(userdata => {
            if(userdata === "succeed"){
                const list = this.state.wishlist.filter(item => item._id !== movie._id);
                this.setState({wishlist:list})                
            }

        })
        .catch(err => {
            console.log(err);
        })         
        
    }

    render() {
        
        const {movies,wishlist} = this.state;
        return (
            <div className="container">
            <div className="movie-cont">
                <h2>Recommended Movies</h2>
            {
                movies.map( (movie) => {
                    return(
                        <div className="movie" key={movie._id}>
                            <p className="movie-name">{movie.title}</p>
                            <MovieImage urls={movie.imagesUrl} />

                                <button onClick={()=>this.addToWish(movie)}
                                className="add-button">
                                    Add
                                </button>
                        </div>                  
                    )
                })
            }
            </div> 
            <div className="movie-cont">
                <h2>Wishlist</h2>
            {
                wishlist.map( (movie) => {
                    return(
                        <div className="movie" key={movie._id}>
                            <p className="movie-name">{movie.title}</p>
                            <MovieImage urls={movie.imagesUrl} />

                                <button onClick={()=>this.deleteFromWish(movie)}
                                className="add-button">
                                    Remove
                                </button>
                        </div>                  
                    )
                })
            }
            </div>           
            </div>
        )
    }

}

export default Profile;