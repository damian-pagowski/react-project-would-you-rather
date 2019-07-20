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
              this.props.unansweredQuestions.length > 0 ?
              this.props.unansweredQuestions.map(id =>
                <li key={id}>
                  <div>
                    <QuestionUnanswered id={id} />
                  </div>
                </li>
              ) : <h3>No Questions. You can add new one</h3>}
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
  const currentUser = users[authedUser];
  const answeredQuestions = currentUser
    ? Object.keys(currentUser.answers)
    : [];
  const unansweredQuestions =
    answeredQuestions && questions
      ? Object.keys(questions).filter(id => !answeredQuestions.includes(id))
      : [];
  return {
    questionIds: Object.keys(questions),
    authedUser,
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(QuestionsDashboard);
