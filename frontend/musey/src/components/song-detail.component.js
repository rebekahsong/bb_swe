import React, { Component } from "react";
import SongsService from "../services/songs.service";

export default class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangeSongTitle = this.onChangeSongTitle.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.getSong = this.getSong.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);

    this.state = {
      oldSongTitle: "",
      currentSong: {
        song_title: "",
        artist_name: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSong(this.props.match.params.song_title);
    console.log(this.oldSongTitle)
  }

  onChangeSongTitle(e) {
    const song_title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSong: {
          ...prevState.currentSong,
          song_title: song_title
        }
      };
    });
  }

  onChangeArtist(e) {
    const artist_name = e.target.value;
    
    this.setState(prevState => ({
      currentSong: {
        ...prevState.currentSong,
        artist_name: artist_name
      }
    }));
  }

  getSong(song_title) {
    SongsService.get(song_title)
      .then(response => {
        this.setState({
          currentSong: response.data,
          oldSongTitle: response.data.song_title
        });
        // console.log("old song title")
        // console.log(this.state.oldSongTitle)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSong() {
    SongsService.update(
      this.state.oldSongTitle,
      this.state.currentSong
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The song was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteSong() {    
    SongsService.delete(this.state.currentSong.song_title)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/songs')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSong } = this.state;

    return (
      <div>
        {currentSong ? (
          <div className="edit-form">
            <h4>Song</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSong.song_title}
                  onChange={this.onChangeSongTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="artist_name">Artist Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="artist_name"
                  value={currentSong.artist_name}
                  onChange={this.onChangeArtist}
                />
              </div>

              {/* <div className="form-group">
                <label>
                  <strong>Rating:</strong>
                </label>
                {currentSong.published ? "Published" : "Pending"}
              </div> */}
            </form>

            {/* {currentSong.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSong}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSong}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Song...</p>
          </div>
        )}
      </div>
    );
  }
}