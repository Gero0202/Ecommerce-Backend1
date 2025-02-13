import productsManager from "../data/fs/products.fs.js"

const indexView = async (req, res, next) => {
    try {
        const all = await productsManager.readAll()

        const data = {
            title: "Home",
            products: all
        }
        return res.status(200).render("index", data)
    } catch (error) {
        next(error)
    }
}

const productView = async (req, res, next) => {
    try {
        const { pid } = req.params
        const one = await productsManager.readOne(pid)
        const data = {
            title: "Producto",
            product: one
        }
        return res.status(200).render("product", data)
    } catch (error) {
        next(error)
    }
}

const registerProductView = (req, res, next) => {
    try {
        const data = {
            title: "Register Product"
        };
        return res.status(200).render("registerProduct", data);
    } catch (error) {
        next(error);
    }
};


export { indexView, productView, registerProductView }