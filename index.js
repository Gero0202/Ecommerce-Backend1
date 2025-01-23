import express from "express"
import router from "./src/router/index.router.js";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import { engine } from "express-handlebars";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express()
const PORT = 8080
const ready = () => console.log("server is ready " + PORT);
server.listen(PORT, ready)


server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", __dirname + "/src/views")


server.use(morgan("dev"))
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())


server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)

