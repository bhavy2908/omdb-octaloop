import React, { useState } from "react";
import axios from "axios";

const SearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`http://www.omdbapi.com/?t=${searchTerm}&apikey=c40a8a49`);
      if (res.data.Response === "True") {
        setMovie(res.data);
        setError("");
      } else {
        setError("Movie not found");
      }
    } catch (error) {
      setError("An error occured while searching the movie");
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/movies", {
        title: movie.Title,
        year: movie.Year,
        rating: movie.imdbRating
      });
      setSuccess("Movie added successfully");
    } catch (error) {
      setError("An error occured while adding the movie");
    }
  };

  //UPDATE (WILL)
  const [newName, setNewName] = useState("");

const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/movies/${movie._id}`, {
        title: newName,
        year: movie.Year,
        rating: movie.imdbRating
      });
      setSuccess("Movie updated successfully");
    } catch (error) {
      setError("An error occured while updating the movie");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {movie.Title && (
        <div>
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <p>{movie.imdbRating}</p>
          <button onClick={handleAdd}>Add to DB</button>
          
        </div>
        
      )}
      {success && <p>{success}</p>}
    </div>
  );
};

export default SearchMovie;
