import express from 'express'

import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import helloController from './routes/hello'
import authController from './routes/auth'
import logger from 'morgan'
import cors from 'cors';
import helmet from 'helmet'
import session from 'express-session'

const app: express.Express = express()


const allowedOrigins = ['http://localhost:3000'];

const corOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(corOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));
app.set("views", "views");
app.use(cookieParser());
app.use(express.static("public"));
app.use(helmet())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: true,
  secure: false,
  maxAge: 1000 * 60 * 30
  }}))

//swagger
const options = {
    swaggerDefinition: {
      info: {
        title: "node-ts-api",
        version: "1.0.0"
      }
    },
    apis: ["./src/routes/*"]
};

app.use("/spec", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.use("/hello", helloController)

app.use("/auth", authController)

// 起動
app.listen(8080, () => {
    console.log('start api');
})
