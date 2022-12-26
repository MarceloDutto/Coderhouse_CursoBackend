class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct = ({title, description, price, thumbnail, code, stock}) => {
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Producto no agregado: todos los campos son obligatorios');
            
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

        return console.log('El producto fue agregado exitosamente');
    }

    getProducts = () => this.products.length > 0 ? console.log(this.products) : console.log('La base de datos no contiene productos');
      
    getProductById = (idRef) => this.products.find(prod => prod.id === idRef) ?? console.log('No se encontró el producto');

}



// Pruebas

const instancia = new ProductManager();

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


instancia.getProducts();
console.log(instancia.getProductById(2));