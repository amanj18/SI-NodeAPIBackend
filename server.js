import express from 'express';
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';
import usersRouter from './routes/userRouter.js';

const app = express();
const port=5000;

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>');
//     });

//     app.get('/about', (req, res) => {
//         res.send('About us');
//         });

app.use('/',homeRouter)
app.use('/products/', productsRouter);
app.use('/users/', usersRouter);
app.use('*',getErrorStatus)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});