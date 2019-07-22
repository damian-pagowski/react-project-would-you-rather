import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import QuestionListItem from "./QuestionListItem";

const ANSWERED = "ANSWERED";
const UNANSWERED = "UNANSWERED";
class QuestionsDashboard extends Component {
  state = {
    category: UNANSWERED,
  };

  handleChange = e => {
    this.setState({ category: e.target.value });
  };

  render() {
    const listElements =
      this.state.category === UNANSWERED
        ? this.props.unansweredQuestions
        : this.props.answeredQuestions;

    if (!this.props.authedUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="mt-4">
        <div className="container">
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.handleChange}
              defaultValue={UNANSWERED}
            >
              <option value={ANSWERED}>Answered Questions</option>
              <option value={UNANSWERED}>Unanswered Questions</option>
            </select>
          </div>
          <ul className="dashboard-list">
            {listElements.map(id =>
              <li key={id}>
                <div>
                  <QuestionListItem id={id} />
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const sortedQuestionIDs = Object.values(questions)
    .sort((q1, q2) => q2.timestamp - q1.timestamp)
    .map(q => q.id);
  const currentUser = users[authedUser];
  const userAnswers = currentUser ? Object.keys(currentUser.answers) : [];
  const answeredQuestions =
    sortedQuestionIDs && sortedQuestionIDs.filter(q => userAnswers.includes(q));
  const unansweredQuestions =
    sortedQuestionIDs &&
    sortedQuestionIDs.filter(q => !userAnswers.includes(q));

  return {
    authedUser,
    answeredQuestions: answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(QuestionsDashboard);
