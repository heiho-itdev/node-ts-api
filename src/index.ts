import express from 'express'

import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import helloController from './routes/hello'
import logger from 'morgan'

const app: express.Express = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));
app.set("views", "views");
app.use(cookieParser());
app.use(express.static("public"));

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


// 起動
app.listen(3000, () => {
    console.log('start api');
})
