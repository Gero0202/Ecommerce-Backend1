import { faker } from "@faker-js/faker";

class UsersManager {
    #all = [];
    createFakersUser = () => {
        try {
            const fullName = faker.person.fullName().toLocaleLowerCase().split(" ")
            const user = {
                _id: faker.database.mongodbObjectId(),
                name: fullName[0],
                lastName: fullName[1],
                email: fullName.join("__") + "@coder.com",
                password: "hola1234",
                age: faker.number.int({ min: 18, max: 70 }),
                avatar: faker.image.avatar(),
                role: faker.helpers.arrayElement(["admin", "user", "premium"])
            }
            this.#all.push(user);
            return user

        } catch (error) {
            throw error;
        }
    }

    readAll = () =>{
      
           return this.#all
    }
       
}


const usersManager = new UsersManager();
export default usersManager