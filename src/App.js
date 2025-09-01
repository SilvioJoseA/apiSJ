import express from "express";
import userRouter from "./router/users.routes.js";
import preinscriptosRouter from "./router/preinscripto.routes.js";
import amdRouter from "./router/amd.routes.js";
import cors from "cors";
import cron from "node-cron";
import alumnoRouter from "./router/alumnos.routes.js";
import notaRouter from "./router/notas.routes.js";
import cursoRouter from "./router/cursos.routes.js";
import profesoresRouter from "./router/profesores.routes.js";
import authRouter from "./router/auth.router.js";
import pagosRouter from "./router/pagos.router.js";
import inscripcionesRouter from "./router/inscripciones.router.js";
import controller from "./controller/cuotas.controller.js";
import cuotasRouter from "./router/cuotas.router.js";
import { PORT } from "./config.js";

const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(userRouter);
    app.use(preinscriptosRouter);
    app.use(amdRouter);
    app.use(alumnoRouter);
    app.use(notaRouter);
    app.use(cursoRouter);
    app.use(profesoresRouter);
    app.use(authRouter);
    app.use(pagosRouter);
    app.use(inscripcionesRouter);
    app.use(cuotasRouter);
    cron.schedule("0 9 1,10 3-11 *", () => {
        console.log("Ejecutando la función programada...");
        //controller.App();
    });
    ///make-array-options
    app.listen(PORT, ()=>{
        console.log("Listening on port ",PORT);
    });
