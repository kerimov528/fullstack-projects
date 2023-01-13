import responseHandler from '../handlers/response_handler.js'
import reviewModel from '../models/review_model.js'

const create = async (req, res) => {
    try {
        const { movieId } = req.params

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        })

        await review.save()

        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        })
    } catch {
        responseHandler.errors(res)
    }
}

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params

        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id
        })

        if (!review) return responseHandler.notfound(res, review)

        await review.remove()
        responseHandler.ok(res)
    } catch {
        responseHandler.errors(res)
    }
}

const getReviewsOfUser = async (req, res) => {
    try {
        const reviews = await reviewModel.findOne({
            user: req.user.id
        }).sort('-createdAt')

        responseHandler.ok(res, reviews)
    } catch {
        responseHandler.errors(res)
    }
}

export default { create, remove, getReviewsOfUser }