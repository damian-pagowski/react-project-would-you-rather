import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class QuestionListItem extends Component {
  state = {
    redirect: false,
  };

  handleButtonClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const question = this.props.question;
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/questions/${question.id}`,
          }}
        />
      );
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
                {question.authorName} asked question:
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
              <button
                className="btn btn-primary"
                onClick={this.handleButtonClick}
              >
                {question.isAnswered === true ? "Results" : "Vote"}
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
  const currentUser = users[authedUser];
  const isAnswered = currentUser && Object.keys(currentUser.answers).includes(id);
  return {
    question: {
      ...question,
      isAnswered,
      authorAvatar: user.avatarURL,
      authorName: user.name,
    },
    authedUser,
  };
}

export default connect(mapStateToProps)(QuestionListItem);
