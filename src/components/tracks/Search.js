import React, { Component } from 'react'
import axios from 'axios';
import { Consumer } from '../../context';

export default class Search extends Component {
    state = {
        trackTitle: ''
    }

    onChangeHandler = (event) => {
        this.setState({
            trackTitle: event.target.value
        })
    }

    onSubmitHandler = (dispatch, event) => {
        event.preventDefault()
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
            )
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i>Search For A Song
                            </h1>
                            <p className="lead text-center">Get Lyric For Any Song</p>
                            <form onSubmit={this.onSubmitHandler.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Song title..." name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChangeHandler}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5"
                                    type="submit">
                                    Get Track Lyrics
                                </button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
