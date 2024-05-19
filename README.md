
# Debounce with React.js search example with Github repo 
__Debouncing__ is a strategy used to improve the performance of a feature by controlling the time at which a function should be executed.

__Simple words__:- It delays the execution of your code until the user stops performing a certain action for a specified amount of time. It is a practice used to improve browser performance.


Debouncing is a technique used to limit the rate at which a function is invoked. In the context of search functionality, debounce can be incredibly useful. When a user types into a search bar, it triggers a function to update the search results. However, if this function is invoked every time a keystroke occurs, it can lead to performance issues, especially if the search involves fetching data from a server.

Debouncing is a technique used to limit the rate at which a function is invoked. In the context of search functionality, debounce can be incredibly useful. When a user types into a search bar, it triggers a function to update the search results. However, if this function is invoked every time a keystroke occurs, it can lead to performance issues, especially if the search involves fetching data from a server.

Debounce works by introducing a delay before invoking the function. When the user types, the function is not immediately executed. Instead, debounce waits for a specified amount of time (the debounce period) to pass after the last keystroke before executing the function. If another keystroke occurs within this period, the timer resets. This ensures that the function is only called once the user has stopped typing, reducing unnecessary calls and improving performance.

## Why Use Debounce:

- __Performance Optimization__: By reducing the number of function calls, debounce helps improve the performance of search functionality, especially in cases where there's network latency involved.

- __User Experience__: Debounce creates a smoother user experience by preventing rapid updates to the search results while the user is still typing. It allows the user to finish typing before displaying the results.

- __Reduced Server Load__: Debounce helps reduce the load on the server by batching requests. Instead of sending a request for every keystroke, it waits until the user pauses typing, then sends a single request with the final search query.


## Debounce with JavaScript example 
```js
// debouncing
// js file
const inputElement = document.getElementById("fruits");

function printInputText(text) {
  console.log(text);
}

function debounce(fx, delay) {
  let timeoutId = null;
  return function (text) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fx(text);
    }, delay);
  };
}

const debounceFn = debounce(printInputText, 2000);

inputElement.addEventListener("input", (event) => {
  debounceFn(event.target.value);
}); 

```

```html
<html>
  <head>
  </head>

  <body>
    <label for="fruits">Enter your favourate fruits</label>
    <input type="text" id="fruits" name="fruits">
    <script src="./app.js"></script>
  </body>

</html> 
```

## Debounce with React.js example
### App.js 
```js
import "./App.css";
import SearchComponent from "./components/SearchComponent";

function App() {
  return (
    <div className="App">
      <SearchComponent></SearchComponent>
    </div>
  );
}

export default App;

```

### components/SearchComponent.jsx
```js
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

```


### components/SearchComponent.jsx
```js
// Simple Custom Debounce hooks
import { useEffect, useState } from "react";

// Custom debounce hook
const useDebounce = (callback, delay) => {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    // Cleanup function to clear the timeout
    return () => clearTimeout(handler);
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;

```


👉 The link for the full source code is here.

[![Download Source code](https://gist.github.com/assets/6800568/2dbceee5-661b-40ef-881d-054bcd2cbe25)](https://github.com/aungthuoo/react-debounce-app)
