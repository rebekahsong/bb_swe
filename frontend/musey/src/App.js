
import './App.css';
import React, { Component } from "react";
import { Link, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SongsList from './components/song-list.component';
import AddSong from './components/create-song.component';
import SongDetail from './components/song-detail.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/songs" className="navbar-brand">
            Ben
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/songs"} className="nav-link">
                Songs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="App">
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/songs"]} component={SongsList} />
                <Route exact path="/add" component={AddSong} />
                <Route path="/songs/:song_title" component={SongDetail} />
              </Switch>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
