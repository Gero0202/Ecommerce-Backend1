import { socketServer } from "../../index.js";
import productsManager from "../data/fs/products.fs.js";

async function socketHelper(socket) {
    console.log("socket ID: ", socket.id);
    try {
        const products = await productsManager.readAll();
        socket.emit("products", products);
        socket.on("new-product", async data => {
            await productsManager.create(data);
            const products = await productsManager.readAll();
            socketServer.emit("products", products)
        })
    } catch (error) {
        console.error("Error reading products:", error);
    }
    
}

export default socketHelper;