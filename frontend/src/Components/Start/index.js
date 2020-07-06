import React from "react";
import genres from "../../data/genres.json";
import "./index.css";

class Start extends React.Component {
  getGenre = (e) => {
    e.preventDefault();
    let self = this;
    let genre = e.target.value;
    this.props.updateGenre(genre);
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
              onClick={this.getGenre}
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
