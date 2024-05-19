import React, { useState } from "react";
import useDebounce from "./CustomDebounce"; // Import the custom debounce hook

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch search results from dummy API
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await response.json();
      setSearchResults(data?.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Custom debounce hook to debounce the fetchSearchResults function
  const debouncedSearch = useDebounce(fetchSearchResults, 500); // Debounce period of 500 milliseconds

  // Function to handle input change
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedSearch(value); // Call the debounced search function
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
        {searchResults?.map((result, index) => (
          <li key={index}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
