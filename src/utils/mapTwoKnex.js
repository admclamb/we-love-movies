function mapTwoKnex(theaters, movies) {
  for (const movie of movies) {
    const { theater_id } = movie;
    for (const theater of theaters) {
      theater["movies"] = [];
      if (theater[theater_id]) {
        theaters["movies"].push(movie);
      }
    }
  }
  return theaters;
}



module.exports = mapTwoKnex;