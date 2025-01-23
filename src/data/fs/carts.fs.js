import { faker } from "@faker-js/faker";
import fs from "fs/promises";

const path = "./src/data/fs/files/carts.json";

class CartsManager {
    constructor() {
        this.path = path
        this.init()
    }

    async init() {
        try {
            await fs.access(this.path)
        } catch (error) {
            await fs.writeFile(this.path, JSON.stringify([]))
        }
    }

    async readFile() {
        try {
            let data = await fs.readFile(this.path)
            data = JSON.parse(data)
            return data
        } catch (error) {
            throw error
        }
    }

    async writeFile(data) {
        try {
            data = JSON.stringify(data, null, 2)
            await fs.writeFile(this.path, data)
        } catch (error) {
            throw error
        }
    }

    async createCart(userId) {
        try {
            const carts = await this.readFile()
            const newCart = {
                _id: faker.database.mongodbObjectId(),
                products: [],
                user_id: userId,
            };
            carts.push(newCart)
            await this.writeFile(carts)
            return newCart
        } catch (error) {
            throw error
        }
    }

    async readAllCarts() {
        try {
            return await this.readFile()
        } catch (error) {
            throw error
        }
    }

    async readCartById(id) {
        try {
            const carts = await this.readFile()
            return carts.find(cart => cart._id === id)
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(uid, productId, quantity) {
        try {
            const carts = await this.readFile()
            let cart = carts.find(cart => cart.user_id === uid)

            if (!cart) {
                cart = {
                    _id: faker.database.mongodbObjectId(),
                    products: [],
                    user_id: uid,
                }
                carts.push(cart)
            }

            const productIndex = cart.products.findIndex(p => p.product_id === productId)
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({ product_id: productId, quantity })
            }

            await this.writeFile(carts)
            return cart
        } catch (error) {
            throw error
        }
    }

    async deleteCartById(id) {
        try {
            let carts = await this.readFile()
            const cartIndex = carts.findIndex(cart => cart._id === id)
            if (cartIndex === -1) {
                throw new Error("Cart not found")
            }
            carts.splice(cartIndex, 1)
            await this.writeFile(carts)
            return { message: "Cart deleted successfully" }
        } catch (error) {
            throw error
        }
    }
}

const cartsManager = new CartsManager()
export default cartsManager