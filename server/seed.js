const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

const cors = require('cors')
app.use(cors())

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number
});
const Movie = mongoose.model("Movie", movieSchema);


router.get("/", (req, res) => {
  Movie.find({}, (error, movies) => {
    if (error) return res.status(500).send(error);
    res.json(movies);
  });
});

router.post("/", (req, res) => {
  const movie = new Movie(req.body);
  console.log({movie, body: req.body});
  movie.save((error) => {
    if (error) return res.status(500).send(error);
    res.json(movie);
    console.log(movie)
  });
});

router.put("/:id", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, (error, movie) => {
    if (error) return res.status(500).send(error);
    res.json(movie);
    });
});
    
    router.delete("/:id", (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (error, movie) => {
    if (error) return res.status(500).send(error);
    res.json(movie);
    });
    });
    app.use(express.json());

    app.use("/movies", router);
    
    
    app.listen(5000, () => {
    console.log("Server running on port 5000");
    });
