import React, { Component } from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }

    onChange = ( e) => {
        // this.setState({ trackTitle: e.target.value})
        this.setState({ [e.target.name]: e.target.value})
    }

    findTrack = (dispatch,e) => {
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
            })
               
                this.setState({ trackTitle: '' });
            })
            .catch(err => console.log(err))
    }

  render() {
    return (
      <Consumer>
          {value => {
              const {dispatch} = value;
              return (
                  <div className="card card-body mb-4 p4">
                    <h1 className="text-center display-4">
                        <i className="fas fa-music"></i> Search For A Song
                    </h1>
                    <p className="lead text-center"> Get the lyrics for any song</p>
                    <form className="form-group" onSubmit={this.findTrack.bind(this, dispatch)}>
                          <input onChange={this.onChange} value={this.state.trackTitle} name="trackTitle" type="text" className="form-control form-control-lg" placeholder="Song Title..."/>
                          <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">Get Track Lyrics</button>
                    </form>
                  </div>
              )
          }}
      </Consumer>
    )
  }
}

export default Search;