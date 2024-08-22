import express from 'express'
import { loginUser, registerUser ,getUsers , getUserById ,updateUser , deleteUser } from '../controllers/usersController.js'

const usersRouter = express.Router()
usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser)
usersRouter.put('/:id', updateUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter;

