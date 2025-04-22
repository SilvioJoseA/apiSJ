import { Router } from "express";
import controller from "../controller/cuotas.controller.js";

const router = Router();

    router.get('/create-table-cuotas', controller.createTableCuotas);
    router.post('/cuotas', controller.addCuota);
    router.get('/to-see-mail-options', controller.toMakeArrayMailOptions);
    router.get('/to-see-cuotas', controller.getAllCuotasByAllAlumnos);
    router.get('/cuotas', controller.getAllCuotas);
    router.get('/cuotas/abril', controller.getAllCuotasAbril);
    router.get('/cuotas/marzo', controller.getAllCuotasMarzo);
    router.get('/to-see-mailOptions', controller.toMakeArrayMailOptionsByModel);
    router.get('/cuotas/app', controller.App);
    router.get('/cuotas/month', controller.getAllCuotasByMonth);

    router.get('/alumnos-not-payed', controller.toGetAlumnosNotPayed);
export default router;