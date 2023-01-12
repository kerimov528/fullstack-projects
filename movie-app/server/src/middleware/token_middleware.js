import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response_handler'
import userModel from '../models/user_model'

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers['authorization']

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1]

            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            )
        }
        return false
    } catch {
        return false
    }
}

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req)

    if (!tokenDecoded) return responseHandler.unathorized(res)

    const user = await userModel.findById(tokenDecoded.data)

    if (!user) return responseHandler.unathorized(res)

    req.user = user

    next()
}

export default { auth, tokenDecode }
