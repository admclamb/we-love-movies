const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  const { review_id } = updatedReview;
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*")
}

function getCriticFromReview(critic_id) {
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  update,
  destroy,
  getCriticFromReview,
};
