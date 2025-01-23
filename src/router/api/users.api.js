import { Router } from "express";
import { createUser, getAllUsers, destroyUser, readOneUser, updateUser } from "../../controllers/users.controllers.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";

const usersRouter = Router()

usersRouter.get("/", getAllUsers);
usersRouter.get("/:uid", readOneUser)
usersRouter.post("/", isValidUser ,createUser)
usersRouter.put("/:uid", updateUser)
usersRouter.delete("/:uid", destroyUser)


export default usersRouter