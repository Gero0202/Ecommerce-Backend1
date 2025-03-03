//import productsManager from "../data/fs/products.fs.js"
import productsManager from "../data/mongo/products.mongo.js"
import cartsManager from "../data/mongo/carts.mongo.js"




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
        const one = await productsManager.readById(pid)
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

const contactView = (req, res, next) => {
    try {
        const data = {
            title: "Contacto"
        };
        return res.status(200).render("contact", data);
    } catch (error) {
        next(error);
    }
}

const usView = (req, res, next) => {
    try {
        const data = {
            title: "Nosotros"
        };
        return res.status(200).render("us", data);
    } catch (error) {
        next(error);
    }
}


const getCartView = async (req, res) => {
    try {
        const uid = "67c0b69f1c5d8b94a2b37fdf";
        const cartData = await cartsManager.totalToPay(uid);

        const data = {
            title: "Carrito",
            cart: cartData[0]
        }

        return res.status(200).render("cart", data);
    } catch (error) {
        next(error);
    }
};



const removeProductFromCartView = async (req, res, next) => {
    try {
        const { cart_id } = req.params;
        await cartsManager.removeProductFromCart(cart_id);
        const uid = "67c0b69f1c5d8b94a2b37fdf";
        const cartData = await cartsManager.totalToPay(uid);
        const data = {
            title: "Carrito",
            cart: cartData[0],
            message: "Producto eliminado del carrito"
        };
        return res.status(200).render("cart", data);
    } catch (error) {
        next(error);
    }
};





const updateCartStateView = async (req, res, next) => {
    try {
        const uid = "67c0b69f1c5d8b94a2b37fdf";


        await cartsManager.updateState(uid, "paid");
        const cartData = await cartsManager.totalToPay(uid);
        const data = {
            title: "Carrito",
            cart: cartData.length > 0 ? cartData[0] : null,
            message: "Compra realizada con éxito"
        };
        return res.status(200).render("cart", data);
    } catch (error) {
        next(error);
    }
};



const addProductToCartView = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const uid = "67c0b69f1c5d8b94a2b37fdf";
        const quantity = 1;

        await cartsManager.addProductToCart(pid, uid, quantity);

        const updatedCartData = await cartsManager.totalToPay(uid);

        const data = {
            title: "Carrito",
            cart: updatedCartData[0],
            message: "Producto agregado al carrito"
        }

        return res.status(200).render("cart", data);
    } catch (error) {
        next(error);
    }


};

const clearCartView = async (req, res, next) => {
    try {
        const uid = "67c0b69f1c5d8b94a2b37fdf"; 

        await cartsManager.clearCart(uid);

        const cartData = await cartsManager.totalToPay(uid);

        const data = {
            title: "Carrito",
            cart: cartData[0],
            message: "El carrito ha sido vaciado exitosamente"
        };

        return res.status(200).render("cart", data);
    } catch (error) {
        next(error);
    }
};










export { indexView, productView, registerProductView, contactView, usView, getCartView, removeProductFromCartView, updateCartStateView, addProductToCartView, clearCartView }