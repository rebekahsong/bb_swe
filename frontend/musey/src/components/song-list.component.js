import React, { Component } from "react";
import { Link } from "react-router-dom";
import SongsService from "../services/songs.service";

export default class SongsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchSong = this.onChangeSearchSong.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSongs = this.setActiveSongs.bind(this);
    this.removeAllSongs = this.removeAllSongs.bind(this);
    this.searchSong = this.searchSong.bind(this);

    this.state = {
      songs: [],
      currentSong: null,
      currentIndex: -1,
      searchSong: ""
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  onChangeSearchSong(e) {
    const searchSong = e.target.value;

    this.setState({
      searchSong: searchSong
    });
  }

  getSongs() {
    SongsService.getAll()
      .then(response => {
        this.setState({
          songs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.getSongs();
    this.setState({
      currentSong: null,
      currentIndex: -1
    });
  }

  setActiveSongs(song, index) {
    this.setState({
      currentSong: song,
      currentIndex: index
    });
  }

  removeAllSongs() {
    SongsService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchSong() {
    if (this.state.searchSong === "") {
      SongsService.getAll()
      .then(response => {
        this.setState({
          songs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      SongsService.get(this.state.searchSong)
        .then(response => {
          this.setState({
            songs: [response.data]
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  render() {
    const { searchSong, songs, currentSong, currentIndex } = this.state;
    const songArray = Array.from(songs)

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchSong}
              onChange={this.onChangeSearchSong}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchSong}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Songs List</h4>

          <ul className="list-group">
            {songArray &&
              songArray.map((song, index) => (
                <li className={"list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => this.setActiveSongs(song, index)}
                  key={index}
                >
                  {song.song_title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentSong ? (
            <div>
              <h4>Song</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentSong.song_title}
              </div>
              <div>
                <label>
                  <strong>Artist:</strong>
                </label>{" "}
                {currentSong.artist_name}
              </div>
              <div>
                <label>
                  <strong>Average Rating:</strong>
                </label>{" "}
                {currentSong.avgRating}
              </div>

              <Link
                to={"/songs/" + currentSong.song_title}
                className="badge badge-warning"
              >
                Edit Song
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Song...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}