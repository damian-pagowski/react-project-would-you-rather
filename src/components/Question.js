import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Question extends Component {
  state = {
    redirect: false,
  };

  viewResults = () => {
    this.setState({ redirect: true });
  };

  render() {
    // const { handle } = this.props.match.params
    const question = this.props.question;
    if (!this.props.authedUser) {
      return <Redirect to="/login" />;
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/results/${question.id}`,
          }}
        />
      );
    }
    const user = this.props.user;
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3">
              <img
                className="img-fluid"
                src={user.avatarURL}
                alt="User Avatar"
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <h6 className="card-title">
                {user.name} asked question:
              </h6>
              <p className="card-text">Would you rather:</p>
              <p className="card-text bg-light">
                {question.optionOne.text}
              </p>
              <p className="card-text">OR</p>
              <p className="card-text bg-light">
                {question.optionTwo.text}
              </p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3">
              <button className="btn btn-primary" onClick={this.viewResults}>
                Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    question,
    user,
    authedUser,
  };
}

export default connect(mapStateToProps)(Question);
