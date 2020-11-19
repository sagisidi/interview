import React from 'react';
import './Profile.css'
import MovieImage from '../MovieImage/MovieImage';
import MovieList from './MovieList';
import {fetchApi} from '../../api/api';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.addToWish = this.addToWish.bind(this);
        this.deleteFromWish = this.deleteFromWish.bind(this)
        this.state = {
            movies: [],
            wishlist: []
        }
    }


    componentDidMount () {
        fetchApi('profile','GET',this.props.token,null)
        .then(result => {
                if(result && result.movies)
                this.setState({movies:result.movies,wishlist:result.wishlist});
        })
        .catch(err => {
            console.log(err);
        })
    }

    addToWish(movie){
        const token = this.props.token
        fetchApi('profile','POST',token,{title:movie.title})
        .then(message => {
            if(message === "succeed"){
                const joined = this.state.wishlist.concat(movie);
                this.setState({wishlist:joined})                
            }

        })
        .catch(err => {
            console.log(err);
        })        
        
    }

    deleteFromWish(movie){
        const token = this.props.token
        fetchApi('profile','DELETE',token,{title:movie.title})
        .then(message => {
            if(message === "succeed"){
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
            <MovieList list={movies} title="Recommended Movies"
            onClickFn={this.addToWish} buttonText="Add" />
            <MovieList list={wishlist} title="Wishlist"
            onClickFn={this.deleteFromWish} buttonText="Remove" />                     
            </div>
        )
    }

}

export default Profile;