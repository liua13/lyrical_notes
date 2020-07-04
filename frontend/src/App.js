import React from "react";
import Helmet from "react-helmet";
import Start from "./Components/Start/";
import Game from "./Components/Game/";
import End from "./Components/End/";
import favicon from "./images/favicon.png";
import "./App.css";

class App extends React.Component {
  state = {
    genre: null, // genre user selected
    tracks: {}, // all remaining tracks that can be played
    currentTrack: null, // current track shown to user
    totalGameCount: 5, // how many total songs to play for the whole game
    gameCount: 0, // how many song tracks have been played
    correctGuesses: 0, // how many times user has guessed correctly
    incorrectGuesses: 0, // how many times user has guessed incorrectly
    giveupCount: 0, // how many times the user has given up
    correct: null, // is user's current guess correct
    backgroundColor: { backgroundColor: "#9370DB" }, // background color of page
    totalTime: 0, // total amount of time user spent playing game
  };

  updateGenreAndTracks = (genre, tracks) => {
    this.setState((prevState) => {
      return {
        genre,
        tracks,
      };
    });
    this.updateCurrentTrack();
  };

  updateCurrentTrack = () => {
    this.setState((prevState) => {
      const prevTracks = prevState.tracks;
      let keys = Object.keys(prevTracks);
      if (keys.length == 0 && this.state.gameCount == 1) {
        return;
      } else if (keys.length == 0) {
        this.setState({
          totalGameCount: this.state.gameCount,
        });
      }

      let randomKey = (keys.length * Math.random()) << 0;
      let randomTrack = prevTracks[keys[randomKey]];

      // if no preview_url
      while (!randomTrack.preview_url && keys.length != 0) {
        delete prevTracks[keys[randomKey]];
        keys = Object.keys(prevTracks);
        randomKey = (keys.length * Math.random()) << 0;
        randomTrack = prevTracks[keys[randomKey]];
      }

      // makes sure track titles don't contain extra characters
      let trackTitle = randomTrack.name;
      trackTitle = trackTitle.split("-")[0];
      trackTitle = trackTitle.split("(")[0];
      trackTitle = trackTitle.split(":")[0];
      trackTitle = trackTitle.replace("&", "and");
      trackTitle = trackTitle.replace(",", "");
      trackTitle = trackTitle.trim().toLowerCase();
      randomTrack.guessName = trackTitle;

      // delete track from this.state.currentTrack
      delete prevTracks[keys[randomKey]];

      return {
        currentTrack: randomTrack,
        tracks: prevTracks,
      };
    });
  };

  resetStates = () => {
    // resets all states when game is done
    this.setState((prevState) => {
      return {
        genre: null,
        tracks: [],
        currentTrack: null,
        correct: null,
        gameCount: 0,
        correctGuesses: 0,
        incorrectGuesses: 0,
        giveupCount: 0,
        totalTime: 0,
      };
    });
  };

  increaseGameCount = () => {
    // increases this.state.gameCount by one
    this.setState((prevState) => {
      return {
        gameCount: prevState.gameCount + 1,
      };
    });
  };

  increaseGiveupCount = () => {
    // increases this.state.giveupCount by one
    this.setState((prevState) => {
      return {
        giveupCount: prevState.giveupCount + 1,
      };
    });
  };

  updateUserGuess = (value) => {
    // changes this.state.correct to {null, true, false}
    // and changes style (background color)
    let style = {
      backgroundColor: "#9370DB",
    };
    if (value == true) {
      style.backgroundColor = "#32CD32";
      this.setState((prevState) => {
        return {
          correctGuesses: prevState.correctGuesses + 1,
        };
      });
    } else if (value == false) {
      style.backgroundColor = "#FA8072";
      this.setState((prevState) => {
        return {
          incorrectGuesses: prevState.incorrectGuesses + 1,
        };
      });
    }

    this.setState({
      correct: value,
      backgroundColor: style,
    });
  };

  updateTotalTime = (time) => {
    this.setState((prevState) => {
      return {
        totalTime: prevState.totalTime + time,
      };
    });
  };

  convertToTimeDisplay = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  };

  render() {
    let display;
    if (this.state.gameCount == this.state.totalGameCount) {
      display = (
        <End
          gameCount={this.state.gameCount}
          correctGuesses={this.state.correctGuesses}
          incorrectGuesses={this.state.incorrectGuesses}
          giveupCount={this.state.giveupCount}
          totalTime={this.state.totalTime}
          resetStates={this.resetStates}
          convertToTimeDisplay={this.convertToTimeDisplay}
        />
      );
    } else if (this.state.currentTrack) {
      display = (
        <div>
          <Game
            currentTrack={this.state.currentTrack}
            genre={this.state.genre}
            gameCount={this.state.gameCount}
            totalGameCount={this.state.totalGameCount}
            correct={this.state.correct}
            backgroundColor={this.state.backgroundColor}
            totalTime={this.totalTime}
            updateCurrentTrack={this.updateCurrentTrack}
            resetStates={this.resetStates}
            increaseGameCount={this.increaseGameCount}
            increaseGiveupCount={this.increaseGiveupCount}
            updateUserGuess={this.updateUserGuess}
            updateTotalTime={this.updateTotalTime}
            convertToTimeDisplay={this.convertToTimeDisplay}
          />
        </div>
      );
    } else {
      display = <Start updateGenreAndTracks={this.updateGenreAndTracks} />;
    }
    return (
      <div>
        <Helmet
          title="Lyrical Notes"
          meta={[
            {
              name: "description",
              content: "Guess the song from listening to just 30 seconds!",
            },
            {
              name: "keywords",
              content: "game, Spotify, music",
            },
          ]}
          link={[
            { rel: "shortcut icon", type: "image/png", href: `${favicon}` },
          ]}
        />
        <div className="App" style={this.state.backgroundColor}>
          {display}
          <footer>
            Made with &hearts; by{" "}
            <a href="https://github.com/liua13/lyrical_notes">Annie Liu</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
