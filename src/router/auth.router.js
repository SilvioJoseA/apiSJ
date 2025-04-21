import { Router } from "express";
import controller from "../controller/auth.controller.js";
import cuotasController from "../controller/cuotas.controller.js";


const router = Router();

    router.get("/token", controller.getToken);
    router.get("/status/check/:id_pagos_tic", controller.toCheckPay);
    router.get("/status/all", cuotasController.toCheckAllPayCuotas);
    router.get("/status/all/abril", cuotasController.toCheckAllPayCuotas);

export default router;