import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index'
import authRoutes from './routes/auth'

const app = express();
const port = 3000;
app.use(json())
app.use(urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes)
    
app.listen(port, () => {
    console.log('App Running on port', port)
});