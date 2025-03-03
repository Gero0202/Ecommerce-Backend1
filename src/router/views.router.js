import { Router } from "express";
import { 
    indexView, 
    productView, 
    registerProductView, 
    contactView, 
    usView, 
    getCartView, 
    removeProductFromCartView, 
    updateCartStateView, 
    addProductToCartView,
    clearCartView
} from "../controllers/views.controllers.js"

const viewsRouter = Router()

viewsRouter.get("/", indexView )
viewsRouter.get("/product/:pid", productView )
viewsRouter.get("/register-product", registerProductView)
viewsRouter.get("/contact", contactView)
viewsRouter.get("/us", usView)

viewsRouter.get("/cart", getCartView); // Ver carrito
viewsRouter.post("/cart/add/:pid", addProductToCartView); // Agregar producto al carrito
viewsRouter.post("/cart/remove/:cart_id", removeProductFromCartView); // Eliminar producto del carrito
viewsRouter.post("/cart/checkout", updateCartStateView); // Finalizar compra
viewsRouter.post("/cart/clear", clearCartView); // Vaciar carrito

export default viewsRouter