import { Router } from "express";
import { indexView, productView } from "../controllers/views.controllers.js"

const viewsRouter = Router()

viewsRouter.get("/", indexView )
viewsRouter.get("/product/:pid", productView )



export default viewsRouter