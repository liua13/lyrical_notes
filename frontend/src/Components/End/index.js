import React from "react";
import "./index.css";

class End extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>game stats</h1>
        <div className="gamestats-container">
          <p>
            <span>correct guesses</span>:{" "}
            <span>{this.props.correctGuesses}</span>
          </p>
          <p>
            <span>incorrect guesses</span>:{" "}
            <span>{this.props.incorrectGuesses}</span>
          </p>
          <p>
            <span>gave up</span>: <span>{this.props.giveupCount} times</span>
          </p>
          <p>
            <span>total time</span>:{" "}
            <span>{this.props.convertToTimeDisplay(this.props.totalTime)}</span>
          </p>
          <p>
            <span>average time</span>:{" "}
            <span>
              {this.props.convertToTimeDisplay(
                this.props.totalTime / this.props.gameCount
              )}
            </span>
          </p>
        </div>
        <button onClick={this.props.resetStates}>Play again</button>
      </div>
    );
  }
}

export default End;
