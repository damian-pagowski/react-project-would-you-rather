import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveAnswer } from "../actions/questions";
import { Redirect } from "react-router-dom";

class AnsweringQuestion extends Component {
  state = {
    redirect: false,
    answer: "",
  };

  selectOptionOne = () => {
    this.setState({ answer: "optionOne" });
  };

  selectOptionTwo = () => {
    this.setState({ answer: "optionTwo" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, authedUser, dispatch } = this.props;
    const answer = this.state.answer;
    const params = { authedUser, qid: id, answer };
    dispatch(handleSaveAnswer(params));
    this.setState({ redirect: true });
  };

  render() {
    const { id, question, user } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/questions/${id}`,
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
                src={user.avatarURL}
                alt="User Avatar"
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <h6 className="card-title">
                {user.name} asked question:
              </h6>
              <p className="card-text">Would you rather:</p>

              <form onSubmit={this.handleSubmit}>
                <div className="form-check">
                  <input
                    onClick={this.selectOptionOne}
                    className="form-check-input"
                    type="radio"
                    name="answer"
                    id="answerOne"
                    value="optionOne"
                    required
                  />
                  <label className="form-check-label" htmlFor="answerOne">
                    {question.optionOne.text}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onClick={this.selectOptionTwo}
                    className="form-check-input"
                    type="radio"
                    name="answer"
                    id="answerTwo"
                    value="optionTwo"
                    required
                  />
                  <label className="form-check-label" htmlFor="answerTwo">
                    {question.optionTwo.text}
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-block text-uppercase mt-3"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users, questions }, props) {
  const id = props.id;
  const question = questions[props.id];
  const user = users[question.author];

  return {
    authedUser,
    users,
    question,
    user,
    id,
  };
}

export default connect(mapStateToProps)(AnsweringQuestion);
