import express from "express";
import { engine } from "express-handlebars";
import { dirname } from "./utils.js";
import * as path from "path";
import { Server } from "socket.io";
import ProductManager from "./components/ProductManager.js";
import { createServer } from "http";

const app = express()
const PORT = 3000;

const httpServer = app.listen(PORT, () =>{
    console.log(`Server run Express port: ${PORT}`);
});

const socketServer = new Server(httpServer);  

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.engine("handlebars", engine ());
app.set("view engine", "handlebars");
app.set('views', path.resolve(dirname + "/views"));
app.use("/", express.static(dirname + "/public"));

let productos = new ProductManager ();

socketServer.on('connection', socket => {
  console.log('Un cliente se ha conectado');
 /* socket.on('productoAgregado', (producto) => {
     console.log("Producto agregado")
    let allProducts = readProducts;
    // return res.json(allProducts)
     res.render("realTimeProducts",{allProducts});
  });*/

   socket.on('agregarProducto',async (producto) => {
    let {title,description,price,status,image,code,stock,category} = producto;
    let nuevosProductos=productos.addProduct(title,description,price,status,image,code,stock,category);
     /*let listaProducto = await productos.readProduct();*/
       /* socket.emit('productoAgregado',nuevosProductos)
        console.log(nuevosProductos)*/
      nuevosProductos.then( (datos)=>{
        socket.emit('productoAgregado',datos)
        console.log(datos)
      })
     
  });
});

function agregarProducto(producto) {
  return new Promise((resolve, reject) => {
    let {title,description,price,status,image,code,stock,category} = producto;
    productos.addProduct(title,description,price,status,image,code,stock,category);

    // Luego de agregar el producto, resolvemos la promesa con la lista actualizada
    resolve(productos);
  });
}

app.get("/", async (req, res) => {
 let allProducts = await productos.readProduct();
    // return res.json(allProducts)
     res.render("partials/index",{allProducts});
});

app.get("/realTimeProducts", async (req, res) => {
    let allProducts = await productos.readProduct();
    // return res.json(allProducts)
     res.render("realTimeProducts",{allProducts});
});




