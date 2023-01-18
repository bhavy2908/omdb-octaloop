import React, { useState, useEffect } from "react";
import axios from "axios";

const SortedList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [year, setYear] = useState("");

    const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/movies?year=${year}`);
          setMovies(res.data);
          setError("");
        } catch (error) {
          setError("An error occured while fetching movies");
        }
      };
  
    const handleYearChange = (event) => {
      setYear(event.target.value);
    };
  
    return (
      <div>
        <label>
          Year:
          <input type="text" value={year} onChange={handleYearChange} />
        </label>
        <button onClick={fetchData}>Search</button>
        {error && <p>{error}</p>}
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <p>Title: {movie.title}</p>
              <p>Year: {movie.year}</p>
              <p>Rating: {movie.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SortedList;
