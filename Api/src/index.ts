import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index'


const app = express();
const port = 3000;
app.use(json())
app.use(urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/products', productsRoutes);
    
app.listen(port, () => {
    console.log('App running on ports', port)
});