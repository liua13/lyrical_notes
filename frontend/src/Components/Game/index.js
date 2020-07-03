import React from "react";
import TrackInfo from "./TrackInfo";
import "./index.css";

class Game extends React.Component {
  state = {
    giveup: false, // did user give up on guessing current song?
  };

  changeCurrentTrack = () => {
    // updates current track when user gets the song title correct
    this.setState({
      giveup: false,
    });
    this.props.updateUserGuess(null);
    this.props.increaseGameCount();
    this.props.updateCurrentTrack();
  };

  guessTrack = (event) => {
    // when user submits a guess
    event.preventDefault();
    let realTitle = this.props.currentTrack.name; // real title of song track
    let correctTitle = this.props.currentTrack.guessName; // edited title of song track
    let userTitle = this.refs.trackTitle.value; // user's guess
    userTitle = userTitle.replace(",", "");

    this.props.updateUserGuess(
      correctTitle == userTitle || realTitle == userTitle
    );
  };

  setGiveupTrue = () => {
    this.props.increaseGiveupCount();
    this.setState({
      giveup: true,
    });
  };

  render() {
    console.log(this.props.currentTrack.guessName);
    let display = "";
    if (this.props.correct == true) {
      // if user's guess is correct
      display = (
        <div>
          <h5>CORRECT!</h5>
          <TrackInfo
            currentTrack={this.props.currentTrack}
            changeCurrentTrack={this.changeCurrentTrack}
          />
        </div>
      );
    } else if (this.state.giveup) {
      display = (
        <TrackInfo
          currentTrack={this.props.currentTrack}
          changeCurrentTrack={this.changeCurrentTrack}
        />
      );
    } else if (this.props.correct == false) {
      display = <h5>INCORRECT! Try again!</h5>;
    }

    return (
      <div className="container" style={this.props.backgroundColor}>
        <h1>{this.props.genre}</h1>
        <p>
          {this.props.gameCount + 1} / {this.props.totalGameCount}
        </p>
        <audio controls>
          <source src={this.props.currentTrack.preview_url} type="audio/mpeg" />
        </audio>

        {!this.props.correct && !this.state.giveup && (
          <div>
            <button className="giveup-button" onClick={this.setGiveupTrue}>
              GIVE UP
            </button>
            <form onSubmit={this.guessTrack}>
              <input
                id="userGuess"
                ref="trackTitle"
                placeholder="song title"
                type="text"
              />
              <button type="action">guess</button>
            </form>
          </div>
        )}
        <div className="guessDisplay">{display}</div>
      </div>
    );
  }
}

export default Game;
