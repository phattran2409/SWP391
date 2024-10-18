import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import api from '../../config/axios'; // Adjust the path as necessary
import './SearchBar.css';

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  // Function to fetch Koi names
  const fetchKoiNames = async () => {
    try {
      const response = await api.get('/v1/fish');
      return response.data.data; // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching koi names:", error.response?.status, error.response?.data || error.message);
      return [];
    }
  };

  // Function to fetch post titles
  const fetchPostTitles = async () => {
    try {
      const response = await api.get('/v1/post/getAllPost');
      return response.data; // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching post titles:", error.response?.status, error.response?.data || error.message);
      return [];
    }
  };

  // Function to fetch data for search
  const fetchData = async (value) => {
    const [koiNames, postTitles] = await Promise.all([
      fetchKoiNames(),
      fetchPostTitles(),
    ]);

    // Filter results based on input value
    const results = [
      ...koiNames.filter((koi) =>
        koi.koiName.toLowerCase().includes(value.toLowerCase())
      ),
      ...postTitles.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase())
      ),
    ];

    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      fetchData(value);
    } else {
      setResults([]); // Clear results if input is empty
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        type="text"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
