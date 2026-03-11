import { useCallback } from "react";

import './Playlist.css';

import TrackList from '../TrackList/TrackList';

function PlayList({ onNameChange, playlistTracks, onRemove, onSave }) {
  const handleNameChange = useCallback(
    (event) => {
      onNameChange(event.target.value);
    },
    [onNameChange]
  );

  return (
    <div className="Playlist">
      <input className="Playlist-name" onChange={handleNameChange} defaultValue={"New Playlist"} />
      <TrackList 
        tracks={playlistTracks}
        isRemoval={true}
        onRemove={onRemove}
      />
      <button className="Playlist-save" onClick={onSave}>
        Save to Spotify
      </button>
    </div>
  );
}

export default PlayList;