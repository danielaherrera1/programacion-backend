import express from "express";
import ProductManager from "./components/ProductManager.js";
import { parse } from "path";
import CartManager from "./components/CartManager.js";

const app = express ();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const productos = new ProductManager ();
const readProducts = productos.readProduct();

const carts = new CartManager();

//RUTAS DE PRODUCTOS
//LISTAR
app.get("/products", async (req,res)=> {
  let limit = parseInt(req.query.limit);
  if(!limit)return res.send(await readProducts);
  //LIMITANDO PRODUCTOS
  let allProducts = await readProducts;
  let productLimit = allProducts.slice(0,limit);
  return res.send(productLimit);
});

app.get("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id)
    return res.send(productById);
});

app.post("/products", async (req,res) => {
  //AGREGAR PRODUCTO A products.json
  let {title,description,price,status,image,code,stock,category} = req.body;
  await productos.addProduct(title,description,price,status,image,code,stock,category);
  return res.send("Producto agregado");
});

app.delete("/products/:id", async (req,res) => {
  //ELIMINAR PRODUCTO
  let id = parseInt(req.params.id);
  await productos.deleteProductsById(id);
  return res.send("Producto eliminado");
});

app.put("/products/:id", async (req,res) => {
  //ACTUALIZAR PRODUCTO
  let id = parseInt(req.params.id);
  let producto = req.body;
  await productos.updateProducts(id,producto);
  return res.send("Producto editado");
});

//RUTAS DE CARRITO
//OBTENER UN CARRITO
app.get("/carts/:cid", async (req,res) => {
  let cid = parseInt(req.params.cid);
  let cart = await carts.listar(cid);
  return res.send(cart);
});

//AGREGAR PRODUCTO A CARRITO
app.post("/carts/:cid/product/:pid", async (req,res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);
  await carts.agregar(cid,pid);
  return res.send("Producto agregado");
});

//CREA UN CARRITO
app.post("/carts", async (req,res) => {
  //AGREGAR PRODUCTO A products.json
  let productos = req.body.productos || [];
  await carts.crear(productos);
  return res.send("Carrito creado");
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

server.on("Error", (error) => console.log(`Error del servidor ${error}`))
