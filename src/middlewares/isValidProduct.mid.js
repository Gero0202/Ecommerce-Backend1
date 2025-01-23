const isValidProduct = (req, res, next) =>{
    try {
        const { title, price, stock, category, thumbnail } = req.body
        if(!title){
            const error = new Error("Type title")
            error.statusCode = 400
            throw error
        }
        if(!price){
            const error = new Error("Type price")
            error.statusCode = 400
            throw error
        }
        if(!stock){
            const error = new Error("Type price")
            error.statusCode = 400
            throw error
        }
        if(!category){
            const error = new Error("Type price")
            error.statusCode = 400
            throw error
        }
        if (!thumbnail) {
            const error = new Error("Type thumbnail");
            error.statusCode = 400;
            throw error;
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default isValidProduct