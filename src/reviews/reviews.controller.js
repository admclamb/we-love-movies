const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries");

async function reviewExist(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found" });
}

async function update(req, res, next) {
  const { review } = res.locals;
  const { data } = req.body;
  const updatedReview = { ...review, ...data };
  await service.update(updatedReview);
  const critic = await service.getCriticFromReview(updatedReview.critic_id);
  updatedReview["critic"] = critic;
  return res.status(201).json({ data: updatedReview });
}

async function destroy(req, res, next) {
  const { review: { review_id } } = res.locals;
  await service.destroy(review_id);
  return res.status(204).json({ data: "204 No content" });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(destroy)],
};
