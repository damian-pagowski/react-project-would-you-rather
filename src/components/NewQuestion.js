import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  //  DELETE ME LATER
  componentDidUpdate() {
    console.log("new question", this.props);
  }

  handleChangePartOne = e => {
    e.preventDefault();

    const text = e.target.value;
    this.setState(() => ({
      optionOneText: text,
    }));
  };

  handleChangePartTwo = e => {
    e.preventDefault();
    const text = e.target.value;
    this.setState(() => ({
      optionTwoText: text,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const author = this.props.author;
    const { dispatch } = this.props;
    const question = {
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
      author,
    };

    dispatch(handleAddQuestion(question));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    }));
  };

  render() {
    const { toHome } = this.state;
    const author = this.props.author;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    if (author === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h2 className="text-center mt-4">Create New Question</h2>
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
              name="part1"
              required
              onChange={this.handleChangePartOne}
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
              name="part2"
              required
              onChange={this.handleChangePartTwo}
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
