const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries");
const nestKnex = require("../utils/nestKnex");


function combineMoviesToTheaters(theaters, movies) {
  for (const movie of movies) {
    const { theater_id } = movie;
    for (const theater of theaters) {
      if (!theater["movies"]) {
        theater["movies"] = [];
      }
      if (theater["theater_id"] === theater_id) {
        theater["movies"].push(movie);
      }
    }
  }
  return theaters;
}

async function theaterExists(req, res, next) {
  const { theaterId } = req.params;
  const theater = await service.read(theaterId);
  if (theater) {
    res.locals.theater = theater;
    return next();
  }
  next({ status: 404, message: "Theater cannot be found" });
}

async function list(req, res, next) {
  const theaters = await service.list();
  const movies = await service.listMovies();
  const  formattedTheaters = combineMoviesToTheaters(theaters, movies);
  return res.status(201).json({ data: formattedTheaters});
}



module.exports = {
  list: [asyncErrorBoundary(list)],
};
