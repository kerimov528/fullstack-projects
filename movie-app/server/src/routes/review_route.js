import express from 'express'
import { body } from 'express-validator'
import reviewController from '../controller/review_controller.js'
import token_middleware from '../middleware/token_middleware.js'
import requestHandler from '../handlers/request_handler.js'

const router = express.Router({ mergeParams: true })

router.get('/', token_middleware.auth, reviewController.getReviewsOfUser)

router.post('/', token_middleware.auth,
    body('mediaId').exists().withMessage('Media Id is required').isLength({ min: 1 }).withMessage('Media Id can not be empty'),
    body('content').exists().withMessage('Content is required').isLength({ min: 1 }).withMessage('Content can not be empty'),
    body('mediaType').exists().withMessage('Media Type is required').custom(type => ['movie', 'tv'].includes(type).withMessage('Media Type invalid')),
    body('mediaTitle').exists().withMessage('Media Title is required'),
    body('mediaPoster').exists().withMessage('Media Poster is required'),
    requestHandler.validate,
    reviewController.create
)

router.delete('/:reviewId',
    token_middleware.auth,
    reviewController.remove
)

export default router
