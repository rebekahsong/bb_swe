import React, { Component } from 'react';
import SongsService from '../services/songs.service';

export default class AddSong extends Component {
    constructor(props) {
      super(props);
      this.onChangeSongName = this.onChangeSongName.bind(this);
      this.onChangeSongArtist = this.onChangeSongArtist.bind(this);
      this.onChangeSongavgRating = this.onChangeSongavgRating.bind(this);
      this.saveSong = this.saveSong.bind(this);
      this.newSong = this.newSong.bind(this);
  
      this.state = {
        song_title: "",
        artist_name: "", 
        avgRating: "",
  
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

    onChangeSongavgRating(e) {
      this.setState({
        avgRating: e.target.value
      });
    }
  
    saveSong() {
        console.log('button clicked')
        var data = {
            song_title: this.state.song_title,
            artist_name: this.state.artist_name,
            avgRating: this.state.avgRating
        };

        SongsService.create(data)
            .then(response => {
            this.setState({
                song_title: response.data.song_title,
                artist_name: response.data.artist_name,
                avgRating: response.data.avgRating,

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
        avgRating: "",

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
                  <label htmlFor="avgRating">avgRating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="avgRating"
                    required
                    value={this.state.avgRating}
                    onChange={this.onChangeSongavgRating}
                    name="avgRating"
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