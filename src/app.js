if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const movieRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());
app.use("/movies", movieRouter);
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);
app.use(notFound);

app.use(errorHandler);
module.exports = app;
