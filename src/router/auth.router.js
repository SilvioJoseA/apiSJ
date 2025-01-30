import { Router } from "express";
import controller from "../controller/auth.controller.js";


const router = Router();

    router.get("/token", controller.getToken);

export default router;