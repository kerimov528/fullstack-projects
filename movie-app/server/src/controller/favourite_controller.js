import responseHandler from '../handlers/response_handler.js'
import favouriteModel from '../models/favourite_model.js'

const addFavourite = async (req, res) => {
    try {
        const isFavourite = await favouriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        })
        if (isFavourite) return responseHandler.ok(res, isFavourite)

        const favourite = new favouriteModel({
            ...req.body,
            user: req.user.id
        })

        await favourite.save()

        responseHandler.created(res, favourite)

    } catch {
        responseHandler.errors(res)
    }
}

const deleteFavourite = async (req, res) => {
    try {
        const { favouriteId } = req.params
        const favourite = await favouriteModel.findOne({
            user: req.user.id,
            _id: favouriteId
        })

        if (!favourite) responseHandler.notfound(res)

        await favourite.remove()
        responseHandler.ok(res)

    } catch {
        responseHandler.errors(res)
    }
}

const getFavouritesOfUser = async (req, res) => {
    try {
        const favourite = await favouriteModel.findOne({ user: req.user.id }).sort("-createdAt")
        responseHandler.ok(res, favourite)
    } catch {
        responseHandler.errors(res)
    }
}

export default { addFavourite, deleteFavourite, getFavouritesOfUser }