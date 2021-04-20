import React, { Component } from 'react';
import SongsService from '../services/songs.service';
import { toastOnError } from "../utils/Utils";
import { toast } from "react-toastify";




export default class EditSong extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeArtist = this.onChangeArtist.bind(this);
      this.onChangeyourRating = this.onChangeyourRating.bind(this);
      this.updateRating = this.updateRating.bind(this);
      this.deleteRating = this.deleteRating.bind(this);
      this.newRating = this.newRating.bind(this);

  
      this.state = {
        song_title: "",
        artist_name: "", 
        yourRating: "",
  
        submitted: false
      };
    }

    newRating() {
        this.setState({
          song_title: "",
          artist_name: "",
          yourRating: "",
  
          submitted:false
        });
      }
  
    onChangeName(e) {
      this.setState({
        song_title: e.target.value
      });
    }
  
    onChangeArtist(e) {
      this.setState({
        artist_name: e.target.value
      });
    }

    onChangeyourRating(e) {
      this.setState({
        yourRating: e.target.value
      });
    }


  updateRating() {
    const user = localStorage.getItem("user");
    var data = {
        username: user,
        song: this.state.song_title,
        rating: this.state.yourRating,
    }

    SongsService.updateRating(data)
      .then(response => {
          toast.success("Updated!");
        this.setState({
          message: "The rating was updated successfully!"
        });
      })
      .catch(e => {
        toastOnError(e);
      });
  }

  deleteRating() {    
    const user = localStorage.getItem("user");
    var userDict = JSON.parse(user);
    var username = userDict.username;
    var usernameSong = username + this.state.song_title;

    SongsService.deleteRating(usernameSong)
      .then(response => {
        toast.success("Deleted!");
        this.setState({
          message: "The rating was deleted successfully!"
        });
      })
      .catch(e => {
        toastOnError('Could not delete rating. Are you sure you have a rating to delete?');
      });
  }
  
  
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newRating}>
                  Edit Another
                </button>
              </div>
            ) : (
              <div>
                <div>

                <h2>Update a Rating</h2>

              <div className="form-group">
                <label htmlFor="title">Song Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.song_title}
                  onChange={this.onChangeName}
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
                  onChange={this.onChangeArtist}
                  name="artist_name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="yourRating">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="yourRating"
                  value={this.state.yourRating}
                  onChange={this.onChangeyourRating}
                />
              </div>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRating}>
              Delete
            </button>

            <button
              className="badge badge-success"
              onClick={this.updateRating}>
              Update
            </button>


                </div>

              </div>
            )}
          </div>
        );
      }
    
  }