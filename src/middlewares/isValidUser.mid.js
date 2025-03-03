const isValidUser = (req, res, next) =>{
    try {
        const { name, email, password, date } = req.body
        if (!name) {
            const error = new Error("empty type name")
            error.statusCode = 404
            throw error
        }
        if (!email) {
            const error = new Error("empty type email")
            error.statusCode = 404
            throw error
        }
        if (!password) {
            const error = new Error("empty type password")
            error.statusCode = 404
            throw error
        }
        if (!date) {
            const error = new Error("empty type age")
            error.statusCode = 404
            throw error
        }
        if (date < 18) {
            const error = new Error("you must have 18")
            error.statusCode = 404
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default isValidUser