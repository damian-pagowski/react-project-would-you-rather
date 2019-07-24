import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogin } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    redirectToReferrer: false,
    selectedUser: null,
  };

  handleChange = e => {
    const selectedUser = e.target.value;
    this.setState(() => ({
      selectedUser: selectedUser,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const selectedUser = this.state.selectedUser;
    const { dispatch } = this.props;

    dispatch(handleLogin(selectedUser)); 
    this.setState({
      redirectToReferrer: true
    });
  };

  render() {
    const loginData = this.props.loginData;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="sel1" />
                    <select
                      className="form-control"
                      id="user"
                      name="user"
                      onChange={this.handleChange}
                      defaultValue="none"
                    >
                      <option disabled value="none">
                        Select User
                      </option>

                      {loginData.map((user, idx) =>
                        <option value={user.name} key={idx}>
                          {user.display}
                        </option>
                      )}
                    </select>
                  </div>
                  <button
                    className="btn btn-primary btn-block text-uppercase mt-3"
                    type="submit"
                    disabled={!this.state.selectedUser}
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const loginData = Object.keys(users).map(uname => ({
    name: uname,
    display: users[uname].name,
  }));
  return {
    loginData: loginData,
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);
