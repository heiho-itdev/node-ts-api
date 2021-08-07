import { exception } from "console";
import { Router } from "express";

export const router = Router();


/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.post('/login', function(req, res) {
    console.log(req)
    if(!(req.body.loginid && req.body.password)) {
        throw new Error('Invalid value')
    }
    if(req.body.loginid == "user" && req.body.password == "password") {
        res.json({access_token:"hello",token:"hello",user:{id:'aaa'}})
    } else {
        throw new Error('Invalid value')
    }

});

/**
 * @swagger
 * paths:
 *  /auth/logout:
 *   post:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.post('/logout', function(req, res) {
    //session消す
    console.log(req)
    res.json({});
});

/**
 * @swagger
 * paths:
 *  /auth/me:
 *   get:
 *     description: return 「hello」
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:
 */
router.get('/me', function(req, res) {
    //ヘッダーのトークン確認
    console.log(req.headers.authorization)
    if(!req.headers.authorization) {
        throw new Error('Invalid value')
    }
    res.json({access_token:"hello",token:"hello",user:{id:'aaa'}});
});
export default router;