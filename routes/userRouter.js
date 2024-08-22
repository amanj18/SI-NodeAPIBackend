import express from 'express'
import { loginUser, registerUser } from '../controllers/usersController.js'

const usersRouter = express.Router()
usersRouter.post('/',registerUser)
usersRouter.post('/login',loginUser)

export default usersRouter;

