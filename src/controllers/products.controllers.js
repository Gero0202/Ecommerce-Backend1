//import productsManager from "../data/fs/products.fs.js";
import productsManager from "../data/mongo/products.mongo.js"

const readOneProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await productsManager.readById(pid)
        if (one) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: one
            })
        }
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }

}

const readProducts = async (req, res, next) => {
    try {
        const filter = req.query
        const all = await productsManager.readAll(filter)
        if (all.length > 0) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: all
            })
        }
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }

}

const createProduct = async (req, res, next) => {
    try {
        const data = req.body
        const one = await productsManager.create(data)
        return res.status(201).json({
            method: req.method,
            url: req.url,
            response: one
        })
    } catch (error) {
        next(error)
    }

}

const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const data = req.body
        const one = await productsManager.updateById(pid, data)
        if (one) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: one
            })
        }
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }
}

const destroyProduct = async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await productsManager.destroyById(pid)
        if (one) {
            return res.status(200).json({
                method: req.method,
                url: req.url,
                response: one
            })
        }
        const error = new Error("Not found")
        error.statusCode = 404
        throw error

    } catch (error) {
        next(error)
    }
}

export { readOneProduct, readProducts, createProduct, updateProduct, destroyProduct }