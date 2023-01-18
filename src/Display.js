import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movies");
        setMovies(res.data);
        setError("");
      } catch (error) {
        setError("An error occured while fetching movies");
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/movies/${id}`, {
        title: newName,
      });
      setError("");
      setNewName("");
      setUpdateId("");
    } catch (error) {
      setError("An error occured while updating the movie");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <p>Title: {movie.title}</p>
            {updateId === movie._id ? (
              <div>
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                />
                <button onClick={() => handleUpdate(movie._id)}>Save</button>
              </div>
            ) : (
              <button onClick={() => setUpdateId(movie._id)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
