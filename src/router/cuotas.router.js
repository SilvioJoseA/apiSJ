import { Router } from "express";
import controller from "../controller/cuotas.controller.js";

const router = Router();

    router.get('/create-table-cuotas', controller.createTableCuotas);
    router.post('/cuotas', controller.addCuota);
    router.post('/to-see-mail-options', controller.toMakeArrayMailOptions);
    router.get('/to-see-cuotas', controller.getAllCuotasByAllAlumnos);

export default router;