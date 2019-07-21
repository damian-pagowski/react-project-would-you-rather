import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class QuestionUnanswered extends Component {
  state = {
    redirect: false,
  };

  handleAnswerQuestion = e => {
    e.preventDefault();
    this.setState({ redirect: true });
  };
  render() {
    if (!this.props.authedUser) {
      return <Redirect to='/login' />
    }
    const question = this.props.question;
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/answering/${question.id}`
          }}
        />
      );
    }
    if (this.props.authedUser === null) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3">
              <img
                className="img-fluid"
                src={question.authorAvatar}
                alt="User Avatar"
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <h6 className="card-title">
                {question.authorFullName} asked: Would you rather...
              </h6>
              <p className="card-text bg-light">
                {question.optionOne.text}
              </p>
              <p className="card-text">OR</p>
              <p className="card-text bg-light">
                {question.optionTwo.text}
              </p>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3">
              <button
                className="btn btn-primary"
                onClick={this.handleAnswerQuestion}
              >
                Answer
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
    authedUser,
    question:
      Object.assign(
        {},
        question,
        { authorFullName: user ? user.name : "no name" },
        { authorAvatar: user ? user.avatarURL : "none" }
      ) || null,
  };
}

export default connect(mapStateToProps)(QuestionUnanswered);
