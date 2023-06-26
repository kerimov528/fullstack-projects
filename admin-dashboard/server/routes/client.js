import express from 'express'
import { getProducts, getCustomers, getTransaction, getGeography } from '../controllers/client.js'

const router = express.Router()

router.get('/products', getProducts)
router.get('/customers', getCustomers)
router.get('/transaction', getTransaction)
router.get('/geography', getGeography)

export default router