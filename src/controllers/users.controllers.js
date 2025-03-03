//import usersManager from "../data/fs/users.fs.js";
import usersManager from "../data/mongo/users.mongo.js";

const getAllUsers = async (req, res, next) => {
    try {
        const filter = req.query
        const all = await usersManager.readAll(filter);
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
};

const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const one = await usersManager.create(data)
        return res.status(201).json({
            method: req.method,
            url: req.url, 
            response: one 
        })
    } catch (error) {
        next(error)
    }
}

const readOneUser = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await usersManager.readById(uid)
        if (user) {
            return res.status(200).json({ 
                method: req.method,
                url: req.url,
                response: user 
            })
        }
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const newData = req.body
        const updatedUser = await usersManager.updateById(uid, newData)
        if (updatedUser) {
            return res.status(200).json({ 
                method: req.method,
                url: req.url,
                response: updatedUser 
            })
        }
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }
};

const destroyUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const one = await usersManager.destroyById(uid)
        if (one) {
            return res.status(200).json({ 
                method: req.method,
                url: req.url,
                response: one 
            })
        }
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    } catch (error) {
        next(error)
    }
}

export { getAllUsers, createUser, destroyUser, readOneUser, updateUser }