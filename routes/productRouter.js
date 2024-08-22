import express from 'express';
import { getProductById, getProducts, getProductsByCategory } from "../controllers/productController.js"

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/category', getProductsByCategory)
productsRouter.get('/:id', getProductById)
productsRouter

export { productsRouter }