import express from 'express';
import productsRoutes from './routes/products/index'


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/products', productsRoutes);
    
app.listen(port, () => {
    console.log('App running on ports', port)
});