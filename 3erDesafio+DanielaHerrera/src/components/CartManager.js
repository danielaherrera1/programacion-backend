import {promises as fs, read} from "fs"

export default class CartManager{
    constructor(){
        this.patch = "./carrito.json"
    }

    crear = async (productos) => {
        let carritos = await fs.readFile(this.patch, "utf-8");
        carritos = JSON.parse(carritos);
        let totalCarritos = Object.keys(carritos).length;
        let cid_max = ++totalCarritos;
        carritos[cid_max] = productos;
        await fs.writeFile(this.patch, JSON.stringify(carritos), "utf-8");
    }

    agregar = async (cid,pid,qty = 1) => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        let cart = JSON.parse(respuesta);
        let carrito = cart[cid] || [];
        //agregar el producto a cart
        //validar que pid exista en carrito
        let existe = carrito.find(producto => producto.id === pid);
        if(existe){
            existe.quantity += qty;
            carrito = carrito.map(producto => producto.id === pid ? existe : producto);
        }else{
            carrito.push({id:pid,quantity:qty});
        }
        cart[cid] = carrito;
        await fs.writeFile(this.patch, JSON.stringify(cart), "utf-8");
    }

    listar = async (cid) => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        let cart = JSON.parse(respuesta);
        return cart[cid];
    }

}
