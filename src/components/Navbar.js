import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Navbar extends Component {
  state = {
    redirect: false,
  };
  componentDidUpdate() {
    const loggedUserData = this.props.loginData;
    console.log("Navbar", loggedUserData);
  }

  handleLogout = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(signOut());
    this.setState({ redirect: true });
  };
  render() {
    const loggedUserData = this.props.loginData;
    const { redirect } = this.state;

    if (redirect) {
      this.setState({ redirect: false });
      return <Redirect to="/login" />;
    }

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <i className="fa fa-gamepad" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink
                className="nav-link"
                to="/"
                exact
                 
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/new"
                exact
                 
              >
                New Question
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/leaderboard"
                exact
                 
              >
                Leader Board
              </NavLink>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <div className="nav-link">
                <i className="fa fa-user" /> {loggedUserData.display}
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                to="/login"
                onClick={this.handleLogout}
                exact
                 
              >
                <i className="fa fa-sign-out" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const currentUser = authedUser !== null ? users[authedUser] : null;
  const loginData = {
    display: currentUser ? currentUser.name : null,
  };

  return {
    loginData: loginData,
  };
}

export default connect(mapStateToProps)(Navbar);
