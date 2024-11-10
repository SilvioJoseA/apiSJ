import { Router } from "express";
import userController from "../controller/users.controller.js";

const router = Router();

    router.get('/users/api', async ( req , res ) =>  res.json({message:'Api user is functioning'}))
    router.get('/users/create', userController.createTableUsers);
    router.post('/users', userController.addUser);
    router.get('/users', userController.getAllUsers);
    router.post('/users/login', userController.getUserByUsernameAndPassword);
    router.delete('/users/:id', userController.deleteUser);

export default router;