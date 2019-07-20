import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Redirect } from "react-router-dom";
import QuestionUnanswered from "./QuestionUnanswered";

class QuestionsDashboard extends Component {
  state = {
    displayUnanswered: true,
  };
  componentDidUpdate() {
    console.log("DASHBOARD:", this.props);
  }

  displayAnswered = () => {
    this.setState({ displayUnanswered: false });
  };

  displayUnanswered = () => {
    this.setState({ displayUnanswered: true });
  };

  render() {
    if (! this.props.authedUser) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="mt-4">
        <div className="container">
          <div className="row m-4">
            <div className="col-md-2" />
            <div className="btn-group btn-group-lg col-md-8">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.displayAnswered}
              >
                Answered
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.displayUnanswered}
              >
                Unanswered
              </button>
            </div>
            <div className="col-md-2" />
          </div>

          <ul className="dashboard-list">
            { this.state.displayUnanswered
              ? this.props.unansweredQuestions.length > 0 ? this.props.unansweredQuestions.map(id =>
                  <li key={id}>
                    <div>
                      <QuestionUnanswered id={id} />
                    </div>
                  </li>
                ) : <h3 className="text-center">All questions answered...</h3>
              : this.props.answeredQuestions.map(id =>
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
    : null;
  const unansweredQuestions =
    answeredQuestions && questions
      ? Object.keys(questions).filter(id => !answeredQuestions.includes(id))
      : null;
  return {
    questionIds: Object.keys(questions),
    authedUser,
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(QuestionsDashboard);
