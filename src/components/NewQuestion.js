import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    redirect: false,
  };

  handleAnswerChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, author } = this.props;
    const question = {
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
      author,
    };

    dispatch(handleAddQuestion(question));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      redirect: true,
    }));
  };

  render() {
    const { redirect } = this.state;
    const author = this.props.author;

    if (redirect) {
      return <Redirect to="/" />;
    }
    if (author === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h2 className="text-center mt-4">Add Question</h2>
        <p className="text-center">
          <b>Would you rather...</b>
        </p>
        <form className="needs-validation" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="part1"
              placeholder="Enter question one"
              name="optionOneText"
              required
              onChange={this.handleAnswerChange}
              value={this.state.optionOneText}
            />
          </div>
          <p className="text-center">
            <b>- OR -</b>
          </p>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="part2"
              placeholder="Enter question one"
              name="optionTwoText"
              required
              onChange={this.handleAnswerChange}
              value={this.state.optionTwoText}
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    author: authedUser,
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
