import express from 'express'
import { body } from 'express-validator'
import favouriteController from '../controller/favourite_controller.js'
import userController from '../controller/user_controller.js'
import requestHandler from '../handlers/request_handler.js'
import userModel from '../models/user_model.js'
import tokenMiddleware from '../middleware/token_middleware.js'

const router = express.Router()

router.post('/signup',
    body('username').exists().withMessage('Username is required').isLength({ min: 8 }).withMessage('Username minumum 8 characters').custom(async value => {
        const user = await userModel.findOne({ username: value })
        if (user) return Promise.reject('username already used')
    }),
    body('password').exists().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password minumum 8 characters'),
    body('confirmPassword').exists().withMessage('Confirm password is required').isLength({ min: 8 }).withMessage('Confirmpassword minumum 8 characters').custom((value, { req }) => {
        if (value !== req.password) throw new Error('Confirm password doesn\'t match')
    }),
    body('displayName').exists().withMessage('Display Name is required').isLength({ min: 8 }).withMessage('Display Name minumum 8 characters'),
    requestHandler.validate,
    userController.signup
)

router.post('/sigin',
    body('username').exists().withMessage('Username is required').isLength({ min: 8 }).withMessage('User Name minumum 8 characters'),
    body('password').exists().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password minumum 8 characters'),
    requestHandler.validate,
    userController.signin
)

router.put('/update-password',
    tokenMiddleware.auth,
    body('password').exists().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password minumum 8 characters'),
    body('newPassword').exists().withMessage('New Password is required').isLength({ min: 8 }).withMessage('New Password minumum 8 characters'),
    body('confirmPassword').exists().withMessage('Confirm Password is required').isLength({ min: 8 }).withMessage('Confirm Password minumum 8 characters').custom((value, { req }) => {
        if (value !== req.password) throw new Error('Confirm password doesn\'t match')
    }),
    requestHandler.validate,
    userController.updatePassword
)

router.get('/info', tokenMiddleware.auth, userController.getInfo)

router.get('/favourites', tokenMiddleware.auth, favouriteController.getFavouritesOfUser)

router.post('/favourites', tokenMiddleware.auth,
    body('mediaType').exists().withMessage('Media Type is required').custom(type => ['movie', 'tv'].includes(type).withMessage('Media Type invalid')),
    body('mediaId').exists().withMessage('Media Id is required').isLength({ min: 1 }).withMessage('Media Id can not be empty'),
    body('mediaTitle').exists().withMessage('Media Title is required'),
    body('mediaPoster').exists().withMessage('Media Poster is required'),
    body('mediaRate').exists().withMessage('Media Rate is required'),
    requestHandler.validate,
    favouriteController.addFavourite
)

router.delete('/favourites/:favouriteId',
    tokenMiddleware.auth,
    favouriteController.deleteFavourite
)

export default router

