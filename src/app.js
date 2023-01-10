import express from 'express';
import { ProductManager } from './productManager.js';

const pm = new ProductManager('../files/products.json')

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/products/', async (req, res) => {
    const { limit } = req.query;
    let products = await pm.getProducts();
    if(!limit) return res.send({products});
    const slicedProducts =  products.slice(0, limit);
    res.send({slicedProducts});   
})

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    let productById = await pm.getProductById(parseInt(pid));
    if(Object.keys(productById).length === 0) return res.send({error: "producto no encontrado"});
    res.send({productById});
})

app.listen(8080, () => {
    console.log('Server at port 8080');
})

