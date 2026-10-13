import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

/* function App() {

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  return <div className="App"></div>
} */

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (query === "") {
      setBooks([]);
      return;
    }

    axios
      .get(`https://openlibrary.org/search.json?q=${query}`)
      .then((response) => {
        setBooks(response.data.docs);
      });
  }, [query]);

  return (
    <div className="App">
      <h1>Book Search</h1>

      <input
        type="text"
        placeholder="ค้นหาหนังสือ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {books.map((book, index) => (
          <li key={book.key || index}>
            <h3>{book.title}</h3>
            <p>
              Author: {book.author_name?.join(", ") || "Unknown"}
            </p>
            <p>
              First Published: {book.first_publish_year || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
