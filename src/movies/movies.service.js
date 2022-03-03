const knex = require("../db/connection");



function list() {
  return knex("movies").select("*");
}

function listShowing(is_showing) {
// turn text to boolean value
  const value = is_showing === "true" ? true : false;
  return knex("movies as m")
    .leftJoin("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where( "mt.is_showing", value )
    .groupBy("m.movie_id")
    
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

function getTheatersWithMovie(movie_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movie_id })
}

async function getReviewsWithMovie(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ movie_id })
}

module.exports = {
  list,
  listShowing,
  read,
  getTheatersWithMovie,
  getReviewsWithMovie,
};
