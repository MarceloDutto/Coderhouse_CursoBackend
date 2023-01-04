const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.products = [];
        this.id = 1;
        this.path = path;
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Producto no agregado: todos los campos son obligatorios');

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            }
                   
        if(this.products.find(prod => prod.code === code)) return console.log('El producto ya está incluido en la base de datos, no se puede agregar nuevamente');

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.id
        }
        this.id++
        this.products.push(product);

        const productStr = JSON.stringify(this.products);
        fs.writeFile(this.path, productStr, error => {
            if(error) throw error;
        });

        return console.log('El producto fue agregado exitosamente');
    }

    getProducts = async () => {
            if(!fs.existsSync(this.path)) return [];

            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products.length > 0 ? console.log(this.products) : console.log('La base de datos no contiene productos');
    }

    getProductById = async (idRef) => {
        if(!fs.existsSync(this.path)) return console.log('No se encontró la base de datos');

        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const prodById = this.products.find(prod => prod.id === idRef)
        return prodById ? console.log(prodById) : console.log('No se encontró el producto');
    }

    updateProduct = async (idRef, {title, description, price, thumbnail, code, stock}) => {
        if(!fs.existsSync(this.path)) return console.log('No se encontró la base de datos');

        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Producto no actualizado: todos los campos son obligatorios');

        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const selectedProduct = this.products.find(prod => prod.id === idRef);
                
        const { id } = selectedProduct;
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: id
        }
        
        const indexById = this.products.findIndex(prod => prod.id === idRef);
        this.products.splice(indexById, 1);
        this.products.push(product);

        const productStr = JSON.stringify(this.products);
        fs.writeFile(this.path, productStr, error => {
            if(error) throw error;
        });
        
    }
    
    deleteProduct = async (idRef) => {
        if(!fs.existsSync(this.path)) return console.log('No se encontró la base de datos');

        const data = await fs.promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const indexById = this.products.findIndex(prod => prod.id === idRef);
        this.products.splice(indexById, 1);

        const productStr = JSON.stringify(this.products);
        fs.writeFile(this.path, productStr, error => {
            if(error) throw error;
        });

        console.log('El producto fue eliminado exitosamente')
    }
}




/*--------------------------------------------------------------------------------------------------------------------------------------*/

// PRUEBAS

//Se crea la instancia
const instancia = new ProductManager('./products.json');

//Se agregan productos

instancia.addProduct({
    title: "Casa 4 ambientes", 
    description: "Con patio", 
    price: 250000, 
    thumbnail: "sin imagen", 
    code: "123abc", 
    stock: 1
});

instancia.addProduct({
    title: "Departamento 3 ambientes", 
    description: "Luminoso", 
    price: 178000, 
    thumbnail: "sin imagen", 
    code: "456abc", 
    stock: 2
}); 

 instancia.addProduct({
    title: "Monoambiente", 
    description: "Espacioso", 
    price: 90000, 
    thumbnail: "sin imagen", 
    code: "679abc", 
    stock: 4
});


// Se obtienen los productos en un array
instancia.getProducts();


// Se devuelve un producto segun el Id en forma de objeto
instancia.getProductById(2);


// Se elimina un producto y luego de un delay se obtiene la lista de los restantes (el delay es para dar tiempo a las funciones asincronas)
instancia.deleteProduct(3);
setTimeout(() => {
    instancia.getProducts();
}, 2000);


// Se actualiza un producto y luego de un delay se obtiene la lista con las actualizaciones (el delay es para dar tiempo a las funciones asincronas)
setTimeout(() => {
    instancia.updateProduct(1, {
        title: "Departamento 3 ambientes", 
        description: "Luminoso", 
        price: 178000, 
        thumbnail: "sin imagen", 
        code: "456abc", 
        stock: 2
    } )
}, 3000);

setTimeout(() => {
    instancia.getProducts();
}, 4000);
