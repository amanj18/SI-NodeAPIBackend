import express from 'express';
import { getProductById, getProducts, getProductsByCategory ,getProductByPrice ,createNewProduct, updateProductStarRating, deleteProductById } from "../controllers/productController.js"
import authenticateToken from '../controllers/middlewares/authMiddleware.js';

const productsRouter = express.Router()
productsRouter.get('/', getProducts)
productsRouter.get('/category', getProductsByCategory)
productsRouter.get('/price', getProductByPrice)
productsRouter.get('/:id', getProductById)
productsRouter.post('/', createNewProduct)
productsRouter.put('/:id', updateProductStarRating)
productsRouter.delete('/:id', authenticateToken, deleteProductById);

export { productsRouter }