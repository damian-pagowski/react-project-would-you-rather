import React, { Component } from "react";
import { connect } from "react-redux";

class AnsweringQuestion extends Component {
  state = {
    redirect: false,
    answer: null,
  };

  selectOptionOne() {
    this.setState({ answer: "optionOne" });
  }
  selectOptionTwo() {
    this.setState({ answer: "optionTwo" });
  }
  handleSubmit(e) {
    e.preventDefault();
    const selectedUser = this.state.selectedUser;
    const { dispatch } = this.props;

    // dispatch(setAuthedUser(selectedUser)); // login
    // this.setState({
    //   redirect: true,
    // });
  }
  componentDidUpdate() {
    console.log(
      "Answering question props.location:",
      this.props.location.state.question
    );
    console.log("Answering question props:", this.props, "END!");
  }

  render() {
    const question = this.props.location.state.question;
    console.log(
      "Answering question props.location:",
      this.props.location.state.question
    );

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3">
              <img
                className="img-fluid"
                src={question.authorAvatar}
                alt="blah"
              />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <h6 className="card-title">
                {question.authorFullName} asked question:
              </h6>
              <p className="card-text">Would you rather:</p>

              <div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.selectOptionOne}
                >
                  {question.optionOne.text}
                </button>
                <p className="card-text mb-1 mt-1 text-center" >OR</p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.selectOptionTwo}
                >
                  {question.optionTwo.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  //   const question = questions[id];
  //   const user = users[question.author];
  return {
    users,
    questions,
    authedUser,
  };
}

export default connect(mapStateToProps)(AnsweringQuestion);
