import { writeFile, existsSync, promises } from "fs";

export class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Producto no agregado: todos los campos son obligatorios');

        await this.getProducts();
                   
        if(this.products.find(prod => prod.code === code)) return console.log('El producto ya está incluido en la base de datos, no se puede agregar nuevamente');

        const IdArray = this.products.map(prod => prod.id);
        const maxId = Math.max(...IdArray);
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: maxId === -Infinity ? 1 : maxId + 1
        }
        
        this.products.push(product);

        const productStr = JSON.stringify(this.products, null, 2);
        writeFile(this.path, productStr, error => {
            if(error) throw error;
        });

        return console.log('El producto fue agregado exitosamente');
    }

    getProducts = async () => {
            if(!existsSync(this.path)) return [];

            const data = await promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
    }

    getProductById = async (idRef) => {
        if(!existsSync(this.path)) return console.log('No se encontró la base de datos');

        const data = await promises.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const prodById = this.products.find(prod => prod.id === idRef)
        return prodById ? prodById : {};
    }

    updateProduct = async (idRef, update) => {
        if(!existsSync(this.path)) return console.log('No se encontró la base de datos');

        const { title, description, price, thumbnail, code, stock } = update;
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        await this.getProducts();

        const selectedProduct = this.products.find(prod => prod.id === idRef);

        if(selectedProduct === undefined) return console.log('No se encontró el producto');
        
        Object.keys(update).forEach(key => {
            if(product[key] && product[key] !== selectedProduct[key]) selectedProduct[key] = product[key];
        })

        const productStr = JSON.stringify(this.products, null, 2);
        writeFile(this.path, productStr, error => {
            if(error) throw error;
        });
    }
    
    deleteProduct = async (idRef) => {
        if(!existsSync(this.path)) return console.log('No se encontró la base de datos');

        await this.getProducts();
        
        const indexById = this.products.findIndex(prod => prod.id === idRef);
        if(indexById === -1) return console.log('No se encontró el producto');
        this.products.splice(indexById, 1);

        const productStr = JSON.stringify(this.products, null, 2);
        writeFile(this.path, productStr, error => {
            if(error) throw error;
        });

        console.log('El producto fue eliminado exitosamente')
    }
}




/*--------------------------------------------------------------------------------------------------------------------------------------*/

// PRUEBAS

//Se crea la instancia
//const instancia = new ProductManager('./products.json');

//Se agregan productos

/* const main = async () => {
    await instancia.addProduct({
        title: "Casa 4 ambientes", 
        description: "Con patio", 
        price: 250000, 
        thumbnail: "sin imagen", 
        code: "123abc", 
        stock: 1
    });
    
    await instancia.addProduct({
        title: "Departamento 3 ambientes", 
        description: "Luminoso", 
        price: 178000, 
        thumbnail: "sin imagen", 
        code: "456abc", 
        stock: 2
    }); 
    
    await instancia.addProduct({
        title: "Monoambiente", 
        description: "Espacioso", 
        price: 90000, 
        thumbnail: "sin imagen", 
        code: "679abc", 
        stock: 4
    });
}

main() */