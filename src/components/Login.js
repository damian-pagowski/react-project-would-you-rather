import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    redirect: false,
    selectedUser: null,
  };

  //  DELETE ME LATER
  componentDidUpdate() {
    console.log("Users", this.props);
  }

  handleChange = e => {
    const selectedUser = e.target.value;
    console.log("About login as...", selectedUser); // Delete later
    this.setState(() => ({
      selectedUser: selectedUser,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const selectedUser = this.state.selectedUser;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(selectedUser)); // login
    this.setState({
      redirect: true,
    });
  };

  render() {
    const loginData = this.props.loginData;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="sel1" />
                    <select
                      class="form-control"
                      id="user"
                      name="user"
                      onChange={this.handleChange}
                    >
                      <option disabled selected>
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
  const usernames = Object.keys(users);
  const loginData = usernames.map(uname => ({
    name: uname,
    display: users[uname].name,
  }));
  return {
    loginData: loginData,
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);
