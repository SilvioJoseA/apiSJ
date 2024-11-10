import express from "express";
import userRouter from "./router/users.routes.js";
import preinscriptosRouter from "./router/preinscripto.routes.js";
import amdRouter from "./router/amd.routes.js";
import cors from "cors";

const app = express();

    app.use(express.json());
    app.use(cors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));   
    app.options('/users/login', cors()); // Preflight request 
    app.use(userRouter);
    app.use(preinscriptosRouter);
    app.use(amdRouter);
    app.listen(4008, ()=>{
        console.log("Listening on port 4008");
    });
