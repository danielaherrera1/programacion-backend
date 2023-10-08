import {promises as fs, read} from "fs"

export default class ProductManager{
    constructor(){
        this.patch = "./productos.json"
        this.products = []
    }

    static id = 0

    addProduct = async (title,description,price,status,image,code,stock,category) => {

        let productsFetch = await fs.readFile(this.patch, "utf-8");
        productsFetch = JSON.parse(productsFetch);
        let totalProds = productsFetch.length;

        let newProduct = {
            id: ++totalProds,
            title,
            description,
            price,
            status,
            image,
            code,
            stock,
            category,
        };
        productsFetch.push(newProduct);
        await fs.writeFile(this.patch,JSON.stringify(productsFetch));
        return productsFetch
    };

    readProduct = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProduct()
        return console.log(respuesta2)
    }

    getProductsById = async (id) =>{
        let respuesta3 = await this.readProduct()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(filter)
        }
    };
 
    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProduct();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch,JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

   updateProducts = async (id,producto) => {
        let prodsModif = await fs.readFile(this.patch, "utf-8");
        let productosJson = JSON.parse(prodsModif);
        let productoIndex = productosJson.findIndex((p) => p.id === id);
        if (productoIndex === -1) {
            return callback(new Error('Producto no encontrado'));
        }
        productosJson[productoIndex] = {
            ...productosJson[productoIndex],
            ...producto,
        };
        await fs.writeFile(this.patch,JSON.stringify(productosJson));
   };
}

// const productos = new ProductManager ();

//  productos.addProduct("Titulo1","Descripcion1",1700,"Imagen1","abc123",25)
//  productos.addProduct("Titulo2","Descripcion2",1000,"Imagen2","abc124",40)
//  productos.addProduct("Titulo3","Descripcion3",800,"Imagen3","abc125",90)
//  productos.addProduct("Titulo4","Descripcion4",700,"Imagen4","abc126",10)
//  productos.addProduct("Titulo5","Descripcion5",500,"Imagen5","abc127",9)
//  productos.addProduct("Titulo6","Descripcion6",1100,"Imagen6","abc128",7)
//  productos.addProduct("Titulo7","Descripcion7",900,"Imagen7","abc129",9)
//  productos.addProduct("Titulo8","Descripcion8",400,"Imagen8","abc130",5)
 

// productos.getProducts();

// productos.getProductsById(3)

// productos.deleteProductsById(2)

// productos.updateProducts({

    // title: 'Manzana',
    // description: 'Verde',
    // price: 1000,
    // price: 1200,
    // imagen: 'Imagen3',
    // code: 'abc125',
    // stock: 10,
    // id: 3
  
// })
