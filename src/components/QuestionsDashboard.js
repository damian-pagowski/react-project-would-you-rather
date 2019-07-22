import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Redirect } from "react-router-dom";
import QuestionUnanswered from "./QuestionUnanswered";

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
            {this.state.category === UNANSWERED &&
              this.props.unansweredQuestions &&
              this.props.unansweredQuestions.length > 0 &&
              this.props.unansweredQuestions.map(id =>
                <li key={id}>
                  <div>
                    <QuestionUnanswered id={id} />
                  </div>
                </li>
              )}
            {this.state.category === ANSWERED &&
              this.props.answeredQuestions &&
              this.props.answeredQuestions.length > 0 &&
              this.props.answeredQuestions.map(id =>
                <li key={id}>
                  <div>
                    <Question id={id} />
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
  const sortedQuestionIDs = Object.values(questions).sort((q1, q2) => q2.timestamp - q1.timestamp).map(q => q.id);
  const currentUser = users[authedUser];
  const userAnswers = currentUser
    ? Object.keys(currentUser.answers)
    : [];
  const answeredQuestions = sortedQuestionIDs && sortedQuestionIDs.filter(q => userAnswers.includes(q));
  const unansweredQuestions = sortedQuestionIDs && sortedQuestionIDs.filter(q => ! userAnswers.includes(q));

  return {
    authedUser,
    questionIds: sortedQuestionIDs,
    answeredQuestions: answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(QuestionsDashboard);
