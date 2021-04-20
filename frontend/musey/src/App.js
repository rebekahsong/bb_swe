
import './App.css';
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Switch, Route, withRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SongsList from './components/song-list.component';
import AddSong from './components/create-song.component';
import EditSong from './components/edit-song.component';
import SongDetail from './components/song-detail.component';
import Signup from './components/signup/signup.component';
import Login from './components/login/login.component';
import { logout } from "./components/login/login-actions";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Root from './Root';
import requireAuth from "./utils/RequireAuth";

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000";


class App extends Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div>
        <div className="App">
            <div className="container mt-3">
              <Root>
              <ToastContainer hideProgressBar={true} newestOnTop={true} />
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/songs" className="navbar-brand">
                  Musey
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
                  <li className="nav-item">
                    <Link to={"/edit"} className="nav-link">
                      Update
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Nav.Link onClick={this.onLogout}>Logout</Nav.Link>
                  </li>
                </div>
              </nav>
                <Switch>
                  <Route exact path={["/", "/songs"]} component={requireAuth(SongsList)} />
                  <Route exact path="/add" component={requireAuth(AddSong)} />
                  <Route exact path="/edit" component={requireAuth(EditSong)} />
                  <Route path="/songs/:song_title" component={requireAuth(SongDetail)} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path = "/login" component={Login}/>
                </Switch>
              </Root>
            </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(App));
