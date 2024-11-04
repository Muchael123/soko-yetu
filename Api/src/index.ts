import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index.js'
import authRoutes from './routes/auth/index.js'
  import serverless from "serverless-http";

const app = express();
const port = 3000;
app.use(json())
app.use(urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes)
  
if (process.env.NODE_ENV === "dev") {
    app.listen(port, () => {
        console.log('App Running on port', port)
    });
}
  export const handler = serverless(app);