import express from 'express'

import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import authController from './routes/auth'
import loginController from './routes/login'
import logger, { token } from 'morgan'
import cors from 'cors';
import helmet from 'helmet'
import session from 'express-session'
const app: express.Express = express()

const allowedOrigins = ['http://127.0.0.1:3000']
// const allowedOrigins = ['https://www.sisoto.cloud']
const corOptions: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins
};
app.use(cors(corOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static("public"))
app.use(helmet())
app.use(session({
  secret: 'zxcassdasd',
  resave: false,
  saveUninitialized: true,
  cookie:{
  domain:'127.0.0.1',
  // domain:'www.sisoto.cloud',
  httpOnly: false,
  secure: false,
  maxAge: 1000 * 60 * 30
  }}))

//. 全てのリクエストに対して前処理
app.use( '/*', function( req, res, next ){
  console.log( '前処理呼ばれたよー')
  // ログインのリクエストはそのまま
  // ログイン以外かつget以外の場合は認証
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie')
  next();
});

//swagger
const options = {
    swaggerDefinition: {
      info: {
        title: "sisoto-api",
        version: "1.0.0"
      }
    },
    apis: ["./src/routes/*"]
};


app.use("/spec", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))

app.use("/login", loginController)
app.use("/auth", authController)

// 全てのリクエストに対して後処理
app.use( '/*', function( req, res, next ){
  console.log( '後処理呼ばれたよー')
  //ログインできてたら_scrf突っ込む
  if (req.session.userId) {
    req.session._csrf = '23423424'
  }
  next();
});

// 起動
app.listen(8080, () => {
    console.log('start api')
})
