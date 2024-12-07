import  dotenv  from 'dotenv';
dotenv.config();

import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from '../routes/routes.js';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Configura de sistema de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '..' ,'views'));


// Middleware para servir archivos estáticos
app.use(express.static(join(__dirname, '..', 'public')));
// Middleware para convertir en json las request
app.use(express.json()); 
// Middleware para las cookies
app.use(cookieParser())
//Middleware de session
app.use((req, res, next)=>{
    const token = req.cookies.access_token;
    if(token){
      req.session = { user: null };

      try{
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.session.user = data;
      }catch(err){
        console.error(err);
      }
    }

    next()
  });

// Rutas
app.use('/', routes);

export default app;
