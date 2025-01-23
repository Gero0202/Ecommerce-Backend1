import usersManager from "../data/fs/users.fs.js";


const getAllUsers = async (req, res, next) => {
    try {
        const { role } = req.query
        const all = await usersManager.readAll(role);
        if (all.length > 0) {

            return res.status(200).json({ response: all })
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
        return res.status(201).json({ response: one })
    } catch (error) {
        next(error)
    }
}

const readOneUser = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const user = await usersManager.readOne(uid)
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
        return res.status(200).json({ response: user })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const newData = req.body
        const updatedUser = await usersManager.updateOne(uid, newData)
        if (!updatedUser) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
        return res.status(200).json({ response: updatedUser })
    } catch (error) {
        next(error)
    }
};

const destroyUser = async (req, res, next) => {
    try {
        const { uid } = req.params
        const one = await usersManager.destroyOne(uid)
        return res.status(200).json({ response: one })
    } catch (error) {
        next(error)
    }
}

export { getAllUsers, createUser, destroyUser, readOneUser, updateUser }