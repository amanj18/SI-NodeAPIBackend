import express from 'express';
import { getProductById, getProducts, getProductsByCategory ,getProductByPrice ,createNewProduct, updateProductStarRating } from "../controllers/productController.js"

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/category', getProductsByCategory)
productsRouter.get('/price', getProductByPrice)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', createNewProduct)
productsRouter.put('/:id', updateProductStarRating)

export { productsRouter }