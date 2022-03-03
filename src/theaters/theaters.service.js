const knex = require("../db/connection");

function read(theater_id) {
  return knex("theaters").select("*").where({ theater_id });
}

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .groupBy("t.theater_id")
}

function listMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
}

function listMoviesFromTheaters() {
  return knex("movies_theaters as mt")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .groupBy("m.movie_id")
}

module.exports = {
  read,
  list,
  listMovies,
  listMoviesFromTheaters,
};
