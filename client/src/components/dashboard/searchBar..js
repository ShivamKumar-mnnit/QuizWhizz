import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.get(`/api/exams?search=${searchQuery}`);
        setSuggestions(data); // Assuming the API returns an array of exam suggestions
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    // Debounce the input changes (optional)
    const debounceTimeout = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.textbox}
        placeholder="Search exams..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Display suggestions below the input */}
      <ul>
        {suggestions.map((exam) => (
          <li key={exam.id}>{exam.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;