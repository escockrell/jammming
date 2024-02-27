import {useCallback, useState} from 'react';

import './SearchBar.css';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  }, []);

  return (
    <div className='SearchBar'>
      <input placeholder='Enter a song title' onChange={handleSearchTermChange}/>
      <button className='SearchButton'>
        Search
      </button>
    </div>
  );
}

export default SearchBar;