import responseHandler from '../handlers/response_handler.js'
import tmdbApi from '../tmdb/tmdb_api.js'
import userModel from '../models/user_model.js'
import favouriteModel from '../models/favourite_model.js'
import reviewModel from '../models/review_mode.js'
import tokenMiddleware from '../middleware/token_middleware.js'

const getList = async (req, res) => {
    try {
        const { page } = req.query
        const { mediaType, mediaCategory } = req.params

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page })
        return responseHandler.ok(res, response)
    } catch {
        responseHandler.errors(res)
    }
}

const getGenres = async (req, res) => {
    try {
        const { mediaType } = req.params

        const response = await tmdbApi.mediaGenres({ mediaType })
        return responseHandler.ok(res, response)

    } catch {
        responseHandler.errors(res)
    }
}

const search = async (req, res) => {
    try {
        const { mediaType } = req.params
        const { query, page } = req.query

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === 'people' ? 'person' : mediaType
        })
        responseHandler.ok(res, response)
    } catch {
        responseHandler.errors(res)
    }
}

const getDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params

        const params = { mediaType, mediaId }

        const media = await tmdbApi.mediaDetail(params)

        media.credits = await tmdbApi.mediaCredits(params)

        const videos = await tmdbApi.mediaVideos(params)

        media.videos = videos

        media.images = await tmdbApi.mediaImages(params)

        const recommend = await tmdbApi.mediaRecommend(params)

        media.recommend = recommend.results

        const tokenDecoded = tokenMiddleware.tokenDecode(req)

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data)

            if (user) {
                const isFavorite = await favouriteModel.findOne({ user: user.id, mediaId })
                media.isFavorite = isFavorite !== null
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate('user').sort('-createdAt')

        responseHandler.ok(res, media)
    } catch {
        responseHandler.errors(res)
    }
}

export default { getDetail, getList, getGenres, search }