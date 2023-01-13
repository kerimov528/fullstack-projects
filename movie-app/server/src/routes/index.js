import express from 'express'
import userRoute from './user_route.js'
import reviewRoute from './review_route.js'
import personRoute from './person_route.js'
import mediaRoute from './media_route.js'


const router = express.Router()

router.use('/user', userRoute)
router.use('/review', reviewRoute)
router.use('/person', personRoute)
router.use('/:mediaType', mediaRoute)


export default router