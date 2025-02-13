import { Router } from "express";
import { indexView, productView, registerProductView } from "../controllers/views.controllers.js"

const viewsRouter = Router()

viewsRouter.get("/", indexView )
viewsRouter.get("/product/:pid", productView )
viewsRouter.get("/register-product", registerProductView)


export default viewsRouter