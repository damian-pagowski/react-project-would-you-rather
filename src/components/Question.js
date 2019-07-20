import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Question extends Component {
  state = {
    redirect: false,
  };

  viewResults = () => {
      this.setState({redirect : true})
  };

  render() {
    const question = this.props.question;
    if (! this.props.authedUser) {
      return <Redirect to="/login" />;
    }
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/results/${question.id}`,
            state: { question: question, authedUser: this.props.authedUser },
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
                {question.authorFullName} asked question:
              </h6>
              <p className="card-text">Would you rather:</p>
              <p className="card-text bg-info">
                {question.optionOne.text}
              </p>
              <p className="card-text">OR</p>
              <p className="card-text bg-info">
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
function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const user = users[question.author];
  return {
    // authedUser,
    question:
      Object.assign(
        {},
        question,
        { authorFullName: user.name },
        { authorAvatar: user.avatarURL }
      ) || null,
  };
}

export default connect(mapStateToProps)(Question);
