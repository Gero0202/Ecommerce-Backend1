import { Router } from "express";
import { addToCart, readCartsId ,readCarts, destroyCart } from "../../controllers/carts.controllers.js"


const cartsRouter = Router()

cartsRouter.post("/:uid/products/:pid", addToCart)
cartsRouter.get("/:cid", readCartsId)
cartsRouter.get("/", readCarts)
cartsRouter.delete("/:cid", destroyCart)

export default cartsRouter