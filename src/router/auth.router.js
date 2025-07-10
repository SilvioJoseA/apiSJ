import { Router } from "express";
import controller from "../controller/auth.controller.js";
import alumnoController from "../controller/alumnos.controller.js"
import cuotasController from "../controller/cuotas.controller.js";


const router = Router();

    router.get("/token", controller.getToken);
    router.get("/status/check/:id_pagos_tic", controller.toCheckPay);
    router.get("/status/all", cuotasController.toCheckAllPayCuotas);
    router.get("/status/all/abril", cuotasController.toCheckAllPayCuotasAbril);
    router.get("/status/2025/:month", cuotasController.toCheckAllPayCuotasByMonth);
    router.get("/cuotas/cancelar/:id_pagos_tic", controller.cancelarPago);
    router.post("/cuotas/alumno-dni", alumnoController.getAlumnoByDni);

export default router;