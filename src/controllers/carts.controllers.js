import cartsManager from "../data/fs/carts.fs.js";

const addToCart = async (req, res, next) => {
    const { uid, pid } = req.params
    const { quantity } = req.body

    try {
        const updatedCart = await cartsManager.addProductToCart(uid, pid, quantity)
        res.status(200).json(updatedCart)
    } catch (error) {
        next(error)
    }
}

const readCartsId = async (req, res, next) => {
    const { cid } = req.params

    try {
        const cart = await cartsManager.readCartById(cid)
        if (!cart) {
            const error = new Error("No cart found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
}
const readCarts = async (req, res, next) => {
    try {
        const carts = await cartsManager.readAllCarts()
        res.status(200).json(carts)
    } catch (error) {
        next(error)
    }
};

const destroyCart = async (req, res, next) => {

    const { cid } = req.params
    try {

        const result = await cartsManager.deleteCartById(cid)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
export { addToCart, readCartsId, readCarts, destroyCart }

