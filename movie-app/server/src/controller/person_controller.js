import responseHandler from '../handlers/response_handler.js'
import tmdbApi from '../tmdb/tmdb_api.js'

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params
        const person = await tmdbApi.personDetail({ personId })

        responseHandler.ok(res, person)

    } catch {
        responseHandler.errors(res)
    }
}

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params

        const medias = await tmdbApi.personMedias({ personId })

        responseHandler.ok(res, medias)
    } catch {
        responseHandler.errors(res)
    }
}

export default { personDetail, personMedias }