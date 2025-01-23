import { faker } from "@faker-js/faker";
import fs from "fs/promises"

const path = "./src/data/fs/files/users.json"

class UsersManager {
    constructor() {
        this.path = path
        this.init()
    }
    async init() {
        try {
            await fs.access(this.path)
        } catch (error) {
            await fs.writeFile(path, JSON.stringify([]))
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

    
    async create(data) {
        try {

            const user = {
                _id: faker.database.mongodbObjectId(),
                ...data
            }
            const dataOfFile = await this.readFile()
            dataOfFile.push(user)
            await this.writeFile(dataOfFile)
            return user
        } catch (error) {
            throw error
        }
    }
    async readAll(role) {
        try {
            let all = await this.readFile()
            if(role){
                all = all.filter(each => each.role === role)
            }
            return all
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            const allUsers = await this.readFile()
            const user = allUsers.find((each) => each._id === id)

            if (!user) {
                const error = new Error(`User with id ${id} not found`)
                error.statusCode = 404
                throw error
            }

            return user
        } catch (error) {
            throw error
        }
    }
    async updateOne(id, newData) {
        try {
            const allUsers = await this.readFile()
            const index = allUsers.findIndex((user) => user._id === id)

            if (index === -1) {
                const error = new Error(`User with id ${id} not found`)
                error.statusCode = 404
                throw error
            }

            allUsers[index] = { ...allUsers[index], ...newData }
            await this.writeFile(allUsers)

            return allUsers[index]
        } catch (error) {
            throw error
        }
    }
    async destroyOne(id) {
        try {
            const allUsers = await this.readFile()
            const index = allUsers.findIndex((user) => user._id === id)

            if (index === -1) {
                const error = new Error(`User with id ${id} not found`)
                error.statusCode = 404
                throw error
            }

            const [removedUser] = allUsers.splice(index, 1)
            await this.writeFile(allUsers)
            return removedUser
        } catch (error) {
            throw error
        }
    }

}

const usersManager = new UsersManager()
export default usersManager