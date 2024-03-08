import {useState, useCallback} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';

function App() {
  const sampleTracks = [
    { 
      name: "Livin' on a Prayer",
      artist: "Bon Jovi",
      album: "Livin' on a Prayer - Single",
      id: "1"
    },
    { 
      name: "Don't Stop Believin'",
      artist: "Journey",
      album: "Journey Greatest Hits",
      id: "2"
    }
  ]

  const [searchResults, setSearchResults] = useState(sampleTracks);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  return (
    <div>
      <h1>Jammming!</h1>
      <div className='App'>
        <SearchBar />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <PlayList 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
