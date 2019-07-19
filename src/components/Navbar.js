import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Navbar extends Component {
  state = {
    shouldRedirectToLogin: false,
  };
  componentDidUpdate() {
    const loggedUserData = this.props.loginData;
    console.log("Navbar", loggedUserData);
  }

  handleLogout = e => {
    const { dispatch } = this.props;

    e.preventDefault();
    dispatch(signOut()); // login
    this.setState({ shouldRedirectToLogin: true });
  };
  render() {
    const loggedUserData = this.props.loginData;
    const { shouldRedirectToLogin } = this.state;

    if (shouldRedirectToLogin === true) {
      this.setState({ shouldRedirectToLogin: false });
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
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/new"
                exact
                activeClassName="active"
              >
                New Question
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/leaderboard"
                exact
                activeClassName="active"
              >
                Leader Board
              </NavLink>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
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
                activeClassName="active"
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
