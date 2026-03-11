import {useCallback, useState} from 'react';

import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    onSearch(searchTerm);
  }, [onSearch, searchTerm]);

  return (
    <div className='SearchBar'>
      <input placeholder='Enter a song title' onChange={handleSearchTermChange}/>
      <button className='SearchButton' onClick={search}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;