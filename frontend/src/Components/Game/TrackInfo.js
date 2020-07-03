import React from "react";

const TrackInfo = (props) => {
  return (
    <div>
      <a href={props.currentTrack.external_urls.spotify} target="_blank">
        {props.currentTrack.name}
      </a>{" "}
      by{" "}
      {props.currentTrack.artists.map((artist) => (
        <span key={artist.id}>
          <a href={artist.external_urls.spotify} target="_blank">
            {artist.name}
          </a>{" "}
          &{" "}
        </span>
      ))}
      {/* album of song track */}
      <p>
        album:{" "}
        <a
          href={props.currentTrack.album.external_urls.spotify}
          target="_blank"
        >
          {props.currentTrack.album.name}
        </a>
      </p>
      <button onClick={props.changeCurrentTrack}>NEXT</button>
    </div>
  );
};

export default TrackInfo;
