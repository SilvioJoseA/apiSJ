import express from "express";
import userRouter from "./router/users.routes.js";
import preinscriptosRouter from "./router/preinscripto.routes.js";
import amdRouter from "./router/amd.routes.js";
import cors from "cors";
import alumnoRouter from "./router/alumnos.routes.js";
import notaRouter from "./router/notas.routes.js";

const app = express();

    app.use(express.json());
    app.use(cors());   
    app.use(userRouter);
    app.use(preinscriptosRouter);
    app.use(amdRouter);
    app.use(alumnoRouter);
    app.use(notaRouter);
    app.listen(4008, ()=>{
        console.log("Listening on port 4008");
    });
