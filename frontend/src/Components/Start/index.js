import React from "react";
import axios from "axios";
import genres from "../../data/genres.json";
import "./index.css";

class Start extends React.Component {
  getTracks = (e) => {
    e.preventDefault();
    let self = this;
    let genre = e.target.value;

    // gets track by genre
    axios
      .post("/api/getTrackByGenre", {
        genre,
      })
      .then(function (response) {
        self.props.updateGenreAndTracks(genre, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>select a genre</h1>
        <p>and guess the song from listening to a 30 second preview</p>
        <div className="genre-container">
          {genres.genres.map((genre, i) => (
            <button
              className="genre-buttons"
              key={i}
              value={genre}
              onClick={this.getTracks}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Start;
