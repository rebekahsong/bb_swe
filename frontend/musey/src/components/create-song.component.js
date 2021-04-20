import React, { Component } from 'react';
import SongsService from '../services/songs.service';
import { toastOnError } from "../utils/Utils";



export default class AddSong extends Component {
    constructor(props) {
      super(props);
      this.onChangeSongName = this.onChangeSongName.bind(this);
      this.onChangeSongArtist = this.onChangeSongArtist.bind(this);
      this.onChangeSongyourRating = this.onChangeSongyourRating.bind(this);
      this.saveSong = this.saveSong.bind(this);
      this.saveRating = this.saveRating.bind(this);
      this.newSong = this.newSong.bind(this);
  
      this.state = {
        song_title: "",
        artist_name: "", 
        yourRating: "",
  
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

    onChangeSongyourRating(e) {
      this.setState({
        yourRating: e.target.value
      });
    }
  
    saveSong() {
        console.log('button clicked')
        var data = {
            song_title: this.state.song_title,
            artist_name: this.state.artist_name
        };

        SongsService.create(data)
            .then(response => {
            this.setState({
                song_title: response.data.song_title,
                artist_name: response.data.artist_name,

                submitted: true
            });
            console.log(response.data);
            })
            .catch(e => {
              toastOnError(e);
            });
    }

    saveRating() {
      const user = localStorage.getItem("user");
      var data = {
          username: user,
          song: this.state.song_title,
          rating: this.state.yourRating,
      };

      SongsService.createRating(data)
          .then(response => {
          this.setState({
              song_title: response.data.song_title,
              artist_name: response.data.artist_name,

              submitted: true
          });
          console.log(response.data);
          })
          .catch(e => {
            if (e.response){
              console.log(e.response);
              if (e.response.status=="400"){
                toastOnError("Looks like you already have a rating for this song. Why don't you update your rating instead?")
              }
              if (e.response.status == "500"){
                toastOnError("Looks like that song isn't in our database. Feel free to add it in below!");
              }
              else {
                toastOnError(e);
              }
            }
          });
  }
  
    newSong() {
      this.setState({
        song_title: "",
        artist_name: "",

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
                <div>

                <h2>Add a new Rating</h2>

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
                  <label htmlFor="yourRating">Rating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="yourRating"
                    required
                    value={this.state.yourRating}
                    onChange={this.onChangeSongyourRating}
                    name="yourRating"
                  />
                </div>
    
                
                <button onClick={this.saveRating} className="badge badge-success">
                  Submit Your Rating
                </button>

                </div>

                <div>

                <h2>Add a new Song</h2>


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
                    id="artist_name2"
                    required
                    value={this.state.artist_name}
                    onChange={this.onChangeSongArtist}
                    name="artist_name"
                  />
                </div>

                <button onClick={this.saveSong} className="badge badge-success">
                  Add New Song
                </button>

                </div>
              </div>
            )}
          </div>
        );
      }
    
  }