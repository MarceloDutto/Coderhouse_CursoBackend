class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if(title && description && price && thumbnail && code && stock !== undefined) {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if(this.products.find(prod => prod.code === code)) {
                console.log('El producto ya está incluido en la base de datos, no se puede agregar nuevamente')
            } else {
                this.products.push(product);
                console.log('El producto fue agregado exitosamente');
                this.id++
                product.id = this.id;
            }
           
        } else {
            console.log('Producto no agregado: todos los campos son obligatorios');
        }
    }

    getProducts = () => {
        this.products.length > 0 ? console.log(this.products) : console.log('La base de datos no contiene productos');
    }

    getProductById = (idRef) => {
        this.products.find(prod => prod.id === idRef) ? console.log(this.products.filter(prod => prod.id === idRef)) : console.log('El producto no se encontró');                    
    }
}



// Pruebas

const instancia = new ProductManager();


instancia.addProduct("Casa 4 ambientes", "Con patio", 250000, "sin imagen", "123abc", 1);
instancia.addProduct("Departamento 3 ambientes", "Luminoso", 178000, "sin imagen", "456abc", 2);
instancia.addProduct("Monoambiente", "Espacioso", 90000, "sin imagen", "679abc", 4);
instancia.getProducts();
instancia.getProductById(2);
