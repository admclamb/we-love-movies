const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries");
const nestKnex = require("../utils/nestKnex");

// List all movies
async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = is_showing ? await service.listShowing(is_showing) : await service.list();
  return res.status(201).json({ data });
}

async function movieExist(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found" });
}

function read(req, res, next) {
  const { movie } = res.locals;
  return res.status(201).json({ data: movie });
}

async function getTheatersWithMovie(req, res, next) {
  const {
    movie: { movie_id },
  } = res.locals;
  const data = await service.getTheatersWithMovie(movie_id);
  return res.status(201).json({ data });
}

async function getReviewsWithMovie(req, res, next) {
  const { movie: { movie_id } } = res.locals;
  const data = await service.getReviewsWithMovie(movie_id);
  const innerKnexProperties = [
    "critic_id", "preferred_name",
    "organization_name", "created_at",
    "updated_at", "surname",
  ];
  const formattedData = nestKnex(data, innerKnexProperties, "critic");
  return res.status(201).json({ data: formattedData });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExist), read],
  getTheatersWithMovie: [
    asyncErrorBoundary(movieExist),
    asyncErrorBoundary(getTheatersWithMovie),
  ],
  getReviewsWithMovie: [
    asyncErrorBoundary(movieExist),
    asyncErrorBoundary(getReviewsWithMovie),
  ],
};
