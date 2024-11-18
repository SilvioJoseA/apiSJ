import express from "express";
import userRouter from "./router/users.routes.js";
import preinscriptosRouter from "./router/preinscripto.routes.js";
import amdRouter from "./router/amd.routes.js";
import cors from "cors";
import alumnoRouter from "./router/alumnos.routes.js";
import notaRouter from "./router/notas.routes.js";

const app = express();

    app.use(express.json());
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, OPTIONS, PUT, DELETE'
        );
        // Request headers you wish to allow
        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-Requested-With, Authorization, content-type, Content-Type, accept, Accept'
        );
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
      }); 
    app.use(userRouter);
    app.use(preinscriptosRouter);
    app.use(amdRouter);
    app.use(alumnoRouter);
    app.use(notaRouter);
    app.listen(4008, ()=>{
        console.log("Listening on port 4008");
    });
