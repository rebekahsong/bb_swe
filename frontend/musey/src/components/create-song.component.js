import React, { Component } from 'react';
import SongsService from '../services/songs.service';

export default class AddSong extends Component {
    constructor(props) {
      super(props);
      this.onChangeSongName = this.onChangeSongName.bind(this);
      this.onChangeSongArtist = this.onChangeSongArtist.bind(this);
      this.onChangeSongRating = this.onChangeSongRating.bind(this);
      this.saveSong = this.saveSong.bind(this);
      this.newSong = this.newSong.bind(this);
  
      this.state = {
        song_title: "",
        artist_name: "", 
        rating: "",
  
        submitted: false
      };
    }
  
    onChangeSongName(e) {
      this.setState({
        song_title: e.target.value
      });
    }
  
    onChangeSongArtist(e) {
      this.setState({
        artist_name: e.target.value
      });
    }

    onChangeSongRating(e) {
      this.setState({
        rating: e.target.value
      });
    }
  
    saveSong() {
        console.log('button clicked')
        var data = {
            song_title: this.state.song_title,
            artist_name: this.state.artist_name,
            rating: this.state.rating
        };

        SongsService.create(data)
            .then(response => {
            this.setState({
                song_title: response.data.song_title,
                artist_name: response.data.artist_name,
                rating: response.data.rating,

                submitted: true
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
            });
    }
  
    newSong() {
      this.setState({
        song_title: "",
        artist_name: "",
        rating: "",

        submitted:false
      });
    }
  
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newSong}>
                  Add Another
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="song_title">Song Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="song_title"
                    required
                    value={this.state.song_title}
                    onChange={this.onChangeSongName}
                    name="song_title"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="artist_name">Artist</label>
                  <input
                    type="text"
                    className="form-control"
                    id="artist_name"
                    required
                    value={this.state.artist_name}
                    onChange={this.onChangeSongArtist}
                    name="artist_name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rating"
                    required
                    value={this.state.rating}
                    onChange={this.onChangeSongRating}
                    name="rating"
                  />
                </div>
    
                <button onClick={this.saveSong} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
    
  }